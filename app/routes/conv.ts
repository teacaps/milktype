import { AnalyticsEvent, CartLineUpdatePayload, flattenConnection, ProductViewPayload } from "@shopify/hydrogen";
import type { ActionFunctionArgs } from "@shopify/remix-oxygen";
import { data } from "@shopify/remix-oxygen";

export type ConversionsEvent =
	| {
			type: typeof AnalyticsEvent.PRODUCT_VIEWED;
			event: ProductViewPayload;
	  }
	| {
			type: typeof AnalyticsEvent.PRODUCT_ADD_TO_CART;
			event: CartLineUpdatePayload;
	  }
	| {
			type: "custom_newsletter_signup";
			event: { email: string; customData?: Record<string, unknown> | undefined };
	  };

export async function action({ request, context }: ActionFunctionArgs) {
	const CONVERSIONS_ENDPOINT = `https://graph.facebook.com/v21.0/${context.env.META_PIXEL_ID}/events?access_token=${context.env.PRIVATE_META_PIXEL_ACCESS_TOKEN}`;

	const { type, event } = await request.json<ConversionsEvent>();

	const fbc =
		event.customData?.fbclid && typeof event.customData.fbclid === "string"
			? `fb.1.${Date.now()}.${event.customData.fbclid}`
			: undefined;

	let res: Response | undefined;

	switch (type) {
		case AnalyticsEvent.PRODUCT_VIEWED: {
			res = await fetch(CONVERSIONS_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: [
						{
							event_name: "ViewContent",
							event_time: Math.round(Date.now() / 1000),
							event_source_url: event.url,
							user_data: {
								fbc,
								client_ip_address: request.headers.get("CF-Connecting-IP"),
								client_user_agent: request.headers.get("User-Agent"),
							},
							action_source: "website",
							custom_data: {
								content_ids: [event.products[0].id],
								content_type: "product",
							},
						},
					],
				}),
			});
			break;
		}
		case AnalyticsEvent.PRODUCT_ADD_TO_CART: {
			if (!event.currentLine?.merchandise?.price) break;

			const value = Math.max(
				0,
				parseFloat(event.currentLine.merchandise.price.amount) * event.currentLine.quantity -
					parseFloat(event.prevLine?.cost.totalAmount.amount ?? "0") * (event.prevLine?.quantity ?? 0),
			);

			const email = await hashEmail(event.cart?.buyerIdentity?.email);
			const phone = await hashPhone(event.cart?.buyerIdentity?.phone);
			const firstName = await hashName(event.cart?.buyerIdentity?.customer?.firstName);
			const lastName = await hashName(event.cart?.buyerIdentity?.customer?.lastName);

			const address =
				flattenConnection(event.cart?.buyerIdentity?.customer?.addresses ?? { nodes: [], edges: [] })?.[0] ||
				undefined;
			const city = await hashCity(address?.city);
			const state = await hashState(address?.countryCodeV2 === "US" ? address?.provinceCode : address?.province);
			const zip = await hashZip(address?.countryCodeV2 === "US" ? address?.zip?.slice(0, 5) : address?.zip);
			const country = await hashCountry(address?.countryCodeV2);

			const user_data = {
				fbc,
				client_ip_address: request.headers.get("CF-Connecting-IP"),
				client_user_agent: request.headers.get("User-Agent"),
				em: email,
				ph: phone,
				fn: firstName,
				ln: lastName,
				ct: city,
				st: state,
				zp: zip,
				co: country,
			};

			res = await fetch(CONVERSIONS_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: [
						{
							event_name: "AddToCart",
							event_time: Math.round(Date.now() / 1000),
							event_source_url: event.url,
							user_data,
							action_source: "website",
							custom_data: {
								value,
								net_revenue: value,
								currency: event.currentLine.cost.totalAmount.currencyCode,
								content_ids: [event.currentLine.merchandise.sku],
								content_type: "product",
							},
						},
					],
				}),
			});
			break;
		}
		case "custom_newsletter_signup": {
			res = await fetch(CONVERSIONS_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: [
						{
							event_name: "Lead",
							event_time: Math.round(Date.now() / 1000),
							event_source_url: request.referrerPolicy === "no-referrer" ? undefined : request.referrer,
							user_data: {
								fbc,
								client_ip_address: request.headers.get("CF-Connecting-IP"),
								client_user_agent: request.headers.get("User-Agent"),
								em: event.email,
							},
							action_source: "website",
						},
					],
				}),
			});
			break;
		}
		default: {
			return data(null, { status: 400 });
		}
	}

	if (res) {
		const resData = (await res.json()) as { error?: object };
		if (resData.error) {
			console.error(type, JSON.stringify(resData.error));
			return data(null, { status: 500 });
		}
	}

	return data(null, { status: 200 });
}

export function publishConversionsEvent(event: ConversionsEvent) {
	return fetch("/conv", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event),
	});
}

async function sha256(str: string | undefined | null) {
	if (!str) return undefined;
	const utf8 = new TextEncoder().encode(str);
	return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) =>
		Array.from(new Uint8Array(hashBuffer))
			.map((bytes) => bytes.toString(16).padStart(2, "0"))
			.join(""),
	);
}

const hashEmail = (email?: string | undefined | null) => sha256(email?.trim().toLowerCase().replace(/\s/g, ""));
const hashPhone = (phone?: string | undefined | null) => sha256(phone?.replace(/[^0-9]/g, "").replace(/^0+/, ""));
const hashName = (name?: string | undefined | null) => sha256(name?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
const hashCity = (city?: string | undefined | null) => sha256(city?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
const hashState = (state?: string | undefined | null) => sha256(state?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
const hashZip = (zip?: string | undefined | null) => sha256(zip?.replace(/[^a-z0-9]/g, "").toLowerCase());
const hashCountry = (country?: string | undefined | null) => sha256(country?.replace(/[^a-zA-Z]/g, "").toLowerCase());
