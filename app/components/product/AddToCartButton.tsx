import type { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";
import type { ShopifyAnalyticsProduct } from "@shopify/hydrogen";
import { AnalyticsEventName, CartForm, getClientBrowserParameters, sendShopifyAnalytics } from "@shopify/hydrogen";
import { Button } from "~/components/elements/Button";
import type { ReactNode } from "react";
import { useEffect } from "react";
import type { FetcherWithComponents } from "@remix-run/react";
import { usePageAnalytics } from "~/lib/usePageAnalytics";

function AddToCartAnalytics({
	fetcher,
	children,
}: {
	fetcher: FetcherWithComponents<any>;
	children: ReactNode;
}): JSX.Element {
	const hasUserConsent = false;

	const fetcherData = fetcher.data; // Action response data
	const formData = fetcher.formData; // Form input data
	// Page view data from loaders
	const pageAnalytics = usePageAnalytics({ hasUserConsent });
	console.log("add to cart analytics", pageAnalytics);

	useEffect(() => {
		if (formData) {
			const cartData: Record<string, unknown> = {};
			const cartInputs = CartForm.getFormInput(formData);

			// Parse `analytics` data passed by CartForm
			try {
				if (cartInputs.inputs.analytics) {
					const dataInForm: unknown = JSON.parse(String(cartInputs.inputs.analytics));
					Object.assign(cartData, dataInForm);
					console.log("cartData", cartData);
				}
			} catch {
				// do nothing
			}

			// If the cart action responded, send the analytics data
			if (Object.keys(cartData).length && fetcherData) {
				const addToCartPayload = {
					...getClientBrowserParameters(),
					...pageAnalytics,
					...cartData,
					cartId: fetcherData.cart.id,
				};

				console.log("addToCartPayload", addToCartPayload);

				void sendShopifyAnalytics({
					eventName: AnalyticsEventName.ADD_TO_CART,
					// @ts-expect-error
					payload: addToCartPayload,
				});
			}
		}
	}, [fetcherData, formData, pageAnalytics]);
	return <>{children}</>;
}

export function AddToCartButton({
	lines,
	disabled: _disabled,
	productAnalytics,
}: {
	lines: CartLineInput[];
	disabled?: boolean;
	productAnalytics: ShopifyAnalyticsProduct;
}) {
	const analytics = {
		products: [productAnalytics],
	};

	return (
		<CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{ lines }}>
			{(fetcher) => {
				const disabled = _disabled ?? fetcher.state !== "idle";
				let text = "add to cart";
				if (fetcher.state === "submitting") text = "adding...";
				if (_disabled) text = "out of stock";
				return (
					<AddToCartAnalytics fetcher={fetcher}>
						<input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
						<Button
							color="accent"
							className="h-16 text-xl text-yogurt-100 font-medium"
							type="submit"
							disabled={disabled}>
							{text}
						</Button>
					</AddToCartAnalytics>
				);
			}}
		</CartForm>
	);
}
