import * as remixBuild from "@remix-run/dev/server-build";
import {
	cartGetIdDefault,
	cartSetIdDefault,
	createCartHandler,
	createStorefrontClient,
	storefrontRedirect,
} from "@shopify/hydrogen";
import { createRequestHandler, getStorefrontHeaders, type AppLoadContext } from "@shopify/remix-oxygen";

/**
 * Export a fetch handler in module format.
 */
export default {
	async fetch(request: Request, env: Env, executionContext: ExecutionContext): Promise<Response> {
		try {
			/**
			 * Open a cache instance in the worker and a custom session instance.
			 */
			if (!env?.SESSION_SECRET) {
				throw new Error("SESSION_SECRET environment variable is not set");
			}

			const waitUntil = executionContext.waitUntil.bind(executionContext);
			const cache = await caches.open("hydrogen");

			/**
			 * Create Hydrogen's Storefront client.
			 */
			const { storefront } = createStorefrontClient({
				cache,
				waitUntil,
				i18n: { language: "EN", country: "US" },
				publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
				privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
				storeDomain: env.PUBLIC_STORE_DOMAIN,
				storefrontId: env.PUBLIC_STOREFRONT_ID,
				storefrontHeaders: getStorefrontHeaders(request),
			});
			/*
			 * Create a cart handler that will be used to
			 * create and update the cart in the session.
			 */
			const cart = createCartHandler({
				storefront,
				getCartId: cartGetIdDefault(request.headers),
				setCartId: cartSetIdDefault(),
			});

			/**
			 * Create a Remix request handler and pass
			 * Hydrogen's Storefront client to the loader context.
			 */
			const handleRequest = createRequestHandler({
				build: remixBuild,
				mode: process.env.NODE_ENV,
				getLoadContext: (): AppLoadContext => ({
					storefront,
					cart,
					env,
					waitUntil,
				}),
			});

			const response = await handleRequest(request);

			if (response.status === 404) {
				/**
				 * Check for redirects only when there's a 404 from the app.
				 * If the redirect doesn't exist, then `storefrontRedirect`
				 * will pass through the 404 response.
				 */
				return storefrontRedirect({ request, response, storefront });
			}

			return response;
		} catch (error) {
			console.error(error);
			return new Response("An unexpected error occurred", { status: 500 });
		}
	},
};