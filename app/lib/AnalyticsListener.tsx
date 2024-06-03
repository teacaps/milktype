import { AnalyticsEvent, flattenConnection, unstable_useAnalytics as useAnalytics } from "@shopify/hydrogen";
import { useEffect } from "react";

declare global {
	interface Window {
		rdt: any;
	}
}

export function AnalyticsListener({ redditAdId }: { redditAdId: string }) {
	const { subscribe } = useAnalytics();

	// Initialize Reddit pixel
	useEffect(() => {
		/* eslint-disable */
		(function (w, d) {
			if (!w.rdt) {
				var p: any = (w.rdt = function () {
					p.sendEvent ? p.sendEvent.apply(p, arguments) : p.callQueue.push(arguments);
				});
				p.callQueue = [];
				var t = d.createElement("script");
				(t.src = "https://www.redditstatic.com/ads/pixel.js"), (t.async = !0);
				var s = d.getElementsByTagName("script")[0];
				s.parentNode?.insertBefore(t, s);
			}
		})(window, document);
		/* eslint-enable */

		window.rdt("init", redditAdId);
	}, []);

	useEffect(() => {
		subscribe(AnalyticsEvent.PAGE_VIEWED, ({ url }) => {
			console.log("[ANALYTICS] Page viewed:", url);
			window.rdt("track", "PageVisit");
		});
		subscribe(AnalyticsEvent.PRODUCT_VIEWED, ({ products }) => {
			console.log("[ANALYTICS] Product viewed:", products[0].title);
			window.rdt("track", "ViewContent", { content_ids: [products[0].id] });
		});
		subscribe(AnalyticsEvent.CART_VIEWED, ({ url }) => {
			console.log("[ANALYTICS] Cart viewed:", url);
		});
		subscribe(AnalyticsEvent.CART_UPDATED, ({ cart, prevCart }) => {
			if (!cart?.lines) return;

			const cartLines = flattenConnection(cart.lines);
			const prevCartLines = prevCart ? flattenConnection(prevCart.lines) : [];

			const addedLines = cartLines.reduce<
				Array<{
					itemCount: number;
					value: number;
					currency: string;
					products: Array<{
						id: string;
						category: string;
						name: string;
					}>;
				}>
			>((acc, line) => {
				const prevLine = prevCartLines.find((prevLine) => prevLine.id === line.id);
				if (prevLine && prevLine.quantity === line.quantity) return acc;
				acc.push({
					itemCount: Math.max(0, line.quantity - (prevLine?.quantity ?? 0)),
					value: Math.max(
						0,
						parseFloat(line.cost.totalAmount.amount) - parseFloat(prevLine?.cost.totalAmount.amount ?? "0"),
					),
					currency: line.cost.totalAmount.currencyCode,
					products: [
						{
							id: line.merchandise.sku || "Unknown SKU",
							category: "Milktype",
							name: line.merchandise.product.title,
						},
					],
				});
				return acc;
			}, []);

			if (addedLines.length) {
				console.log("[ANALYTICS] Product added to cart:", addedLines);
				addedLines.forEach((line) => {
					window.rdt("track", "AddToCart", line);
				});
			}
		});
		subscribe(AnalyticsEvent.CUSTOM_EVENT, ({ eventName, payload }) => {
			if (eventName === "custom_newsletter_signup") {
				if (
					!payload ||
					typeof payload !== "object" ||
					!("email" in payload) ||
					typeof payload.email !== "string"
				)
					return;
				console.log("[ANALYTICS] Newsletter signup:", payload.email);
				window.rdt("track", "Lead", { conversionId: payload.email });
			}
		});
	}, [subscribe]);

	return null;
}
