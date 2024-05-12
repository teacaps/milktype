import { unstable_useAnalytics as useAnalytics } from "@shopify/hydrogen";
import { useEffect } from "react";

export function AnalyticsListener() {
	const { subscribe } = useAnalytics();

	useEffect(() => {
		subscribe("page_viewed", ({ url }) => {
			console.log("[ANALYTICS] Page viewed:", url);
		});
		subscribe("product_viewed", ({ products }) => {
			console.log("[ANALYTICS] Product viewed:", products[0].title);
		});
		subscribe("cart_viewed", ({ url }) => {
			console.log("[ANALYTICS] Cart viewed:", url);
		});
		subscribe("cart_updated", ({ currentLine }) => {
			console.log("[ANALYTICS] Cart updated:", currentLine);
		});
	}, [subscribe]);

	return null;
}
