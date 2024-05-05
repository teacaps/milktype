import type { EntryContext } from "@shopify/remix-oxygen";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { createContentSecurityPolicy } from "@shopify/hydrogen";

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	const { nonce, header, NonceProvider } = createContentSecurityPolicy({
		imgSrc: ["https://res.cloudinary.com", "http://localhost:3000"],
		styleSrc: ["https://fonts.googleapis.com"],
		fontSrc: ["https://fonts.gstatic.com"],
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
