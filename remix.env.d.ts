/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type { Storefront, HydrogenCart } from "@shopify/hydrogen";

declare global {
	/**
	 * A global `process` object is only available during build to access NODE_ENV.
	 */
	const process: { env: { NODE_ENV: "production" | "development" } };

	/**
	 * Declare expected Env parameter in fetch handler.
	 */
	interface Env {
		API_VERSION: string;
		SESSION_SECRET: string;
		PUBLIC_STORE_DOMAIN: string;
		PUBLIC_STOREFRONT_ID: string;
		PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
		PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
		PUBLIC_CHECKOUT_DOMAIN: string;
		PUBLIC_STOREFRONT_API_TOKEN: string;
		PRIVATE_STOREFRONT_API_TOKEN: string;
		PRIVATE_ADMIN_API_TOKEN: string;
		REDDIT_AD_ID: string;
	}
}

declare module "@shopify/remix-oxygen" {
	/**
	 * Declare local additions to the Remix loader context.
	 */
	export interface AppLoadContext {
		env: Env;
		cart: HydrogenCart;
		storefront: Storefront;
		waitUntil: ExecutionContext["waitUntil"];
	}
}
