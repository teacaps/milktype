import { useNonce, Analytics, getShopAnalytics, useShopifyCookies } from "@shopify/hydrogen";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	LiveReload,
	useRouteError,
	ScrollRestoration,
	isRouteErrorResponse,
	type ShouldRevalidateFunction,
	defer,
	useMatches,
	useLoaderData,
	useSearchParams,
} from "@remix-run/react";
import favicon from "../public/favicon.svg";
import styles from "./styles/tailwind.css";
import { CartProvider } from "@shopify/hydrogen-react";
import type { LoaderFunctionArgs, SerializeFrom } from "@shopify/remix-oxygen";
import { CookieConsentNotice } from "~/components/global/CookieConsentNotice";
import { AnalyticsListener } from "~/lib/AnalyticsListener";
import { CookiesProvider } from "react-cookie";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ConsentLevel, useConsentLevel } from "~/lib/util";

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({ formMethod, currentUrl, nextUrl }) => {
	// revalidate when a mutation is performed e.g add to cart, login...
	if (formMethod && formMethod !== "GET") {
		return true;
	}

	// revalidate when manually revalidating via useRevalidator
	return currentUrl.toString() === nextUrl.toString();
};

export async function loader({ context }: LoaderFunctionArgs) {
	const { cart, storefront } = context;
	const { shop } = await context.storefront.query(`#graphql
	query Shop { shop { id } }`);

	return defer({
		cart: cart.get(),
		shop: getShopAnalytics({
			storefront,
			publicStorefrontId: context.env.PUBLIC_STOREFRONT_ID,
		}),
		consent: {
			checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
			storefrontAccessToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
		},
		redditAdId: context.env.REDDIT_AD_ID,
	});
}

export const useRootLoaderData = () => {
	const [root] = useMatches();
	return root?.data as SerializeFrom<typeof loader>;
};

export function links() {
	return [
		{
			rel: "canonical",
			href: "https://milktype.co",
		},
		{
			rel: "preconnect",
			href: "https://cdn.shopify.com",
		},
		{
			rel: "preconnect",
			href: "https://shop.app",
		},
		{
			rel: "preconnect",
			href: "https://fonts.googleapis.com",
		},
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
			crossOrigin: "anonymous",
		},
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap",
		},
		{
			rel: "stylesheet",
			href: styles,
		},
		{ rel: "icon", href: "/favicon.ico", sizes: "48x48" },
		{ rel: "icon", type: "image/svg+xml", href: favicon },
	];
}

export default function App() {
	const nonce = useNonce();

	const data = useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<meta name="theme-color" content="#E2794C" />
				<meta property="og:site_name" content="milktype" />
				<meta property="og:type" content="website" />
				<meta property="twitter:card" content="summary_large_image" />
				<Meta />
				<Links />
			</head>
			<body className="antialiased scroll-smooth font-figtree selection:bg-accent selection:text-yogurt-100">
				<CookiesProvider
					defaultSetOptions={{ path: "/", expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) }}>
					<AnalyticsWrapper>
						<CartProvider>
							<Outlet />
							<ScrollRestoration nonce={nonce} />
							<Scripts nonce={nonce} />
							<LiveReload nonce={nonce} />
							<AnalyticsListener redditAdId={data.redditAdId} />
						</CartProvider>
					</AnalyticsWrapper>
				</CookiesProvider>
			</body>
		</html>
	);
}

const AnalyticsWrapper = ({ children }: { children: ReactNode }) => {
	const data = useLoaderData<typeof loader>();

	const [queryParams] = useSearchParams();

	const [consentLevel, setConsentLevel] = useConsentLevel();
	const hasAnalyticsConsent = consentLevel !== ConsentLevel.NECESSARY_ONLY;

	const [showConsentNotice, setShowConsentNotice] = useState(false);
	useEffect(() => {
		if (consentLevel === ConsentLevel.NOT_SET) {
			setShowConsentNotice(true);
		} else {
			setShowConsentNotice(false);
		}
	}, [consentLevel]);

	useShopifyCookies({ hasUserConsent: hasAnalyticsConsent });

	return (
		<Analytics.Provider
			canTrack={() => hasAnalyticsConsent}
			cart={data.cart}
			shop={data.shop}
			consent={data.consent}
			customData={{
				fbclid: queryParams.get("fbclid"),
			}}>
			{children}
			{showConsentNotice ? <CookieConsentNotice setConsentLevel={setConsentLevel} /> : null}
		</Analytics.Provider>
	);
};

export function ErrorBoundary() {
	const error = useRouteError();
	const nonce = useNonce();
	let errorMessage = "Unknown error";
	let errorStatus = 500;

	if (isRouteErrorResponse(error)) {
		errorMessage = error?.data?.message ?? error.data;
		errorStatus = error.status;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	}

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<div className="route-error">
					<h1>Oops</h1>
					<h2>{errorStatus}</h2>
					{errorMessage && (
						<fieldset>
							<pre>{errorMessage}</pre>
						</fieldset>
					)}
				</div>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
				<LiveReload nonce={nonce} />
			</body>
		</html>
	);
}
