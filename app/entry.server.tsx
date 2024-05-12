import type { AppLoadContext, EntryContext } from "@shopify/remix-oxygen";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContentSecurityPolicy } from "@shopify/hydrogen";

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
	context: AppLoadContext,
) {
	const { nonce, header, NonceProvider } = createContentSecurityPolicy({
		imgSrc: [
			"https://res.cloudinary.com",
			"http://localhost:*",
			"https://milktype.co",
			"https://cdn.shopify.com",
			"https://alb.reddit.com",
		],
		styleSrc: ["https://fonts.googleapis.com"],
		fontSrc: ["https://fonts.gstatic.com"],
		scriptSrc: [
			"http://localhost:*",
			"https://cdn.shopify.com",
			"https://shopify.com",
			"https://www.redditstatic.com",
		],
		connectSrc: ["https://www.redditstatic.com"],
		shop: {
			checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
			storeDomain: context.env.PUBLIC_STORE_DOMAIN,
		},
	});

	const body = await renderToReadableStream(
		<NonceProvider>
			<RemixServer context={remixContext} url={request.url} />
		</NonceProvider>,
		{
			nonce,
			signal: request.signal,
			onError(error) {
				console.error(error);
				responseStatusCode = 500;
			},
		},
	);

	if (isbot(request.headers.get("user-agent"))) {
		await body.allReady;
	}

	responseHeaders.set("Content-Type", "text/html");
	responseHeaders.set("Content-Security-Policy", header);

	return new Response(body, {
		headers: responseHeaders,
		status: responseStatusCode,
	});
}
