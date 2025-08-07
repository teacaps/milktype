import { AnalyticsEvent, useAnalytics } from "@shopify/hydrogen";
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

	// Initialize Triple Whale pixel
	useEffect(() => {
		// @ts-ignore
		(window.TriplePixelData = {
			TripleName: "66904d-c5.myshopify.com",
			ver: "2.17",
			plat: "SHOPIFY",
			isHeadless: true,
		}),
			(function (W?: any, H?: any, A?: any, L?: any, E?: any, _?: any, B?: any, N?: any) {
				// @ts-ignore
				function O(U?: any, T?: any, P?: any, H?: any, R?: any) {
					void 0 === R && (R = !1),
						(H = new XMLHttpRequest()),
						P
							? (H.open("POST", U, !0), H.setRequestHeader("Content-Type", "text/plain"))
							: H.open("GET", U, !0),
						H.send(JSON.stringify(P || {})),
						(H.onreadystatechange = function () {
							4 === H.readyState && 200 === H.status
								? ((R = H.responseText), U.includes("/first") ? eval(R) : P || (N[B] = R))
								: (299 < H.status || H.status < 200) && T && !R && ((R = !0), O(U, T - 1, P));
						});
				}
				if (((N = window), !N[H + "sn"])) {
					(N[H + "sn"] = 1),
						(L = function () {
							return Date.now().toString(36) + "_" + Math.random().toString(36);
						});
					try {
						A.setItem(H, 1 + (0 | A.getItem(H) || 0)),
							(E = JSON.parse(A.getItem(H + "U") || "[]")).push({
								u: location.href,
								r: document.referrer,
								t: Date.now(),
								id: L(),
							}),
							A.setItem(H + "U", JSON.stringify(E));
					} catch (e) {}
					var i, m, p;
					A.getItem('"!nC`') ||
						((_ = A),
						(A = N),
						A[H] ||
							((E = A[H] =
								function (t?: any, e?: any, a?: any) {
									return (
										void 0 === a && (a = []),
										"State" == t
											? E.s
											: ((W = L()), (E._q = E._q || []).push([W, t, e].concat(a)), W)
									);
								}),
							(E.s = "Installed"),
							(E._q = []),
							(E.ch = W),
							(B = "configSecurityConfModel"),
							(N[B] = 1),
							O("https://conf.config-security.com/model", 5),
							(i = L()),
							(m = A[atob("c2NyZWVu")]),
							_.setItem("di_pmt_wt", i),
							(p = {
								id: i,
								action: "profile",
								avatar: _.getItem("auth-security_rand_salt_"),
								time: m[atob("d2lkdGg=")] + ":" + m[atob("aGVpZ2h0")],
								host: A.TriplePixelData.TripleName,
								plat: A.TriplePixelData.plat,
								url: window.location.href.slice(0, 500),
								ref: document.referrer,
								ver: A.TriplePixelData.ver,
							}),
							O("https://api.config-security.com/event", 5, p),
							O("https://api.config-security.com/first?host=66904d-c5.myshopify.com&plat=SHOPIFY", 5)));
				}
			})("", "TriplePixel", localStorage);
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
			const productId = event.currentLine.merchandise.product.id;
			const variantId = event.currentLine.merchandise.id;
			const quantity = event.currentLine.quantity - (event.prevLine?.quantity ?? 0);
			const line = {
				itemCount: quantity,
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
			window.TriplePixel("AddToCart", { item: productId, q: quantity, v: variantId });
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
				window.TriplePixel("Contact", { email: payload.email });
				await publishConversionsEvent({
					type: "custom_newsletter_signup",
					event: { email: payload.email, ...event },
				});
			}
		});
	}, [subscribe]);

	return null;
}
