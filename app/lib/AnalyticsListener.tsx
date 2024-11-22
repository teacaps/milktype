import { AnalyticsEvent, flattenConnection, useAnalytics } from "@shopify/hydrogen";
import { useEffect } from "react";
import { publishConversionsEvent } from "~/routes/conv";

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
		subscribe(AnalyticsEvent.PRODUCT_VIEWED, async ({ products, ...event }) => {
			console.log("[ANALYTICS] Product viewed:", products[0].title);
			window.rdt("track", "ViewContent", { content_ids: [products[0].id] });
			await publishConversionsEvent({ type: AnalyticsEvent.PRODUCT_VIEWED, event: { ...event, products } });
		});
		subscribe(AnalyticsEvent.CART_VIEWED, ({ url }) => {
			console.log("[ANALYTICS] Cart viewed:", url);
		});
		subscribe(AnalyticsEvent.PRODUCT_ADD_TO_CART, async (event) => {
			if (!event.currentLine?.merchandise?.price) return;
			const line = {
				itemCount: event.currentLine.quantity - (event.prevLine?.quantity ?? 0),
				value: Math.max(
					0,
					parseFloat(event.currentLine.merchandise.price.amount) * event.currentLine.quantity -
						parseFloat(event.prevLine?.cost.totalAmount.amount ?? "0") * (event.prevLine?.quantity ?? 0),
				),
				currency: event.currentLine.cost.totalAmount.currencyCode,
				products: [
					{
						id: event.currentLine.merchandise.product.handle,
						category: "Milktype",
						name: event.currentLine.merchandise.product.title,
					},
				],
			};
			console.log("[ANALYTICS] Product added to cart:", line);
			window.rdt("track", "AddToCart", line);
			await publishConversionsEvent({ type: AnalyticsEvent.PRODUCT_ADD_TO_CART, event });
		});
		subscribe(AnalyticsEvent.CUSTOM_EVENT, async ({ eventName, payload, ...event }) => {
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
				await publishConversionsEvent({
					type: "custom_newsletter_signup",
					event: { email: payload.email, ...event },
				});
			}
		});
	}, [subscribe]);

	return null;
}
