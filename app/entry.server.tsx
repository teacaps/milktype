import type { AppLoadContext, EntryContext } from "@shopify/remix-oxygen";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContentSecurityPolicy } from "@shopify/hydrogen";

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	reactRouterContext: EntryContext,
	context: AppLoadContext,
) {
	const { nonce, header, NonceProvider } = createContentSecurityPolicy({
		defaultSrc: ["*"],
		prefetchSrc: ["*"],
		imgSrc: ["*", "data:"],
		mediaSrc: ["*", "data:"],
		styleSrc: ["*"],
		fontSrc: ["*"],
		scriptSrc: [
			"*",
			"'sha256-RBZNiG3Ztb26Xi/69+VRecU4BPhrfxcvspLXMRrrCNE='",
			"'sha256-mYq0xgH/camcN9OCLrrkCSWqPvbioa13JIRAP5hZ6JY='",
			"'sha256-5kYkVkl7dJMZfZ0HJv3RHSX0sCOb7QcXRQH35v7TUOI='",
			"'sha256-2DvQuBt7I9QrAGQr++hfy3SdPDJuCjCb+g8tVDGP2Ls='",
		],
		connectSrc: ["*"],
		workerSrc: ["*"],
		frameSrc: ["*"],
		shop: {
			checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
			storeDomain: context.env.PUBLIC_STORE_DOMAIN,
		},
	});

	const body = await renderToReadableStream(
		<NonceProvider>
			<ServerRouter context={reactRouterContext} url={request.url} />
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
