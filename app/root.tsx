import {
	AnalyticsEventName,
	getClientBrowserParameters,
	sendShopifyAnalytics,
	useNonce,
	useShopifyCookies,
} from "@shopify/hydrogen";
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
	useLocation,
} from "@remix-run/react";
import favicon from "../public/favicon.svg";
import styles from "./styles/tailwind.css";
import { CartProvider } from "@shopify/hydrogen-react";
import type { LoaderFunctionArgs, SerializeFrom } from "@shopify/remix-oxygen";
import { useEffect, useRef } from "react";
import { usePageAnalytics } from "~/lib/usePageAnalytics";

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
	const { cart } = context;
	const { shop } = await context.storefront.query(`#graphql
	query Shop { shop { id } }`);

	return defer({
		cart: cart.get(),
		analytics: {
			shopId: shop.id,
		},
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
	useShopifyCookies({ domain: "milktype.co" });

	const location = useLocation();
	const lastLocationKey = useRef<string>("");
	const pageAnalytics = usePageAnalytics({ hasUserConsent: false });

	useEffect(() => {
		// Only continue if the user's location changed.
		if (lastLocationKey.current === location.key) return;
		// Update the current location reference
		lastLocationKey.current = location.key;

		// Analytics data, including browser information
		const payload = {
			...getClientBrowserParameters(),
			...pageAnalytics,
		};

		// Send analytics payload to Shopify
		sendShopifyAnalytics({
			eventName: AnalyticsEventName.PAGE_VIEW,
			// @ts-expect-error
			payload,
		});
	}, [location, pageAnalytics]);

	const nonce = useNonce();

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
				<CartProvider>
					<Outlet />
					<ScrollRestoration nonce={nonce} />
					<Scripts nonce={nonce} />
					<LiveReload nonce={nonce} />
				</CartProvider>
			</body>
		</html>
	);
}

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
