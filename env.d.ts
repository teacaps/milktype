/// <reference types="vite/client" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type { HydrogenSessionData, HydrogenEnv } from "@shopify/hydrogen";
import type { createAppLoadContext } from "~/lib/context";

declare global {
	/**
	 * A global `process` object is only available during build to access NODE_ENV.
	 */
	const process: { env: { NODE_ENV: "production" | "development" } };

	/**
	 * Declare expected Env parameter in fetch handler.
	 */
	interface Env extends HydrogenEnv {
		SESSION_SECRET: string;
		PUBLIC_STORE_DOMAIN: string;
		PUBLIC_CHECKOUT_DOMAIN: string;

		PUBLIC_STOREFRONT_ID: string;
		PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
		PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
		PUBLIC_STOREFRONT_API_TOKEN: string;
		PRIVATE_STOREFRONT_API_TOKEN: string;

		PRIVATE_ADMIN_API_TOKEN: string;
		PRIVATE_ADMIN_API_KEY: string;
		PRIVATE_ADMIN_API_SECRET_KEY: string;

		PRIVATE_META_PIXEL_ACCESS_TOKEN: string;

		META_PIXEL_ID: string;
		REDDIT_AD_ID: string;

		OPENREPLAY_PROJECT_KEY: string;
	}
}

declare module "react-router" {
	interface AppLoadContext extends Awaited<ReturnType<typeof createAppLoadContext>> {
		// to change context type, change the return of createAppLoadContext() instead
	}

	// TODO: remove this once we've migrated our loaders to `Route.LoaderArgs`
	interface LoaderFunctionArgs {
		context: AppLoadContext;
	}

	// TODO: remove this once we've migrated our loaders to `Route.ActionArgs`
	interface ActionFunctionArgs {
		context: AppLoadContext;
	}

	interface SessionData extends HydrogenSessionData {
		// declare local additions to the Remix session data here
	}
}
