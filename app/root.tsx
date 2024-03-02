import { useNonce } from "@shopify/hydrogen";
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
} from "@remix-run/react";
import favicon from "../public/favicon.svg";

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

export function links() {
	return [
		{
			rel: "preconnect",
			href: "https://cdn.shopify.com",
		},
		{
			rel: "preconnect",
			href: "https://shop.app",
		},
		{ rel: "icon", type: "image/svg+xml", href: favicon },
	];
}

export default function App() {
	const nonce = useNonce();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
				<LiveReload nonce={nonce} />
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
