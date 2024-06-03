import type { ActionFunctionArgs } from "@shopify/remix-oxygen";
import { json } from "@shopify/remix-oxygen";
import { importPKCS8, SignJWT } from "jose";

const GOOGLE_OAUTH_ENDPOINT = "https://www.googleapis.com/oauth2/v4/token";
const JWT_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const JWT_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:jwt-bearer";

let accessToken: string | null = null;
let accessTokenExpiresAt = 0;

export async function action({ request, context }: ActionFunctionArgs) {
	const fd = await request.formData();
	const email = fd.get("email")?.toString();

	if (!email) {
		return json(null, { status: 400 });
	}

	const privateKey = context.env.PRIVATE_GSHEETS_KEY.replaceAll("\\n", "\n");

	const accessToken = await fetchAccessTokenIfExpired(context.env.PRIVATE_GSHEETS_CLIENT_EMAIL, privateKey);

	if (!accessToken) {
		return json(null, { status: 500 });
	}

	const response = await fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${context.env.PRIVATE_EMAILS_SHEET_ID}/values/Sheet1!A1:append?valueInputOption=RAW`,
		{
			method: "POST",
			headers: {
				"Authorization": `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				values: [["", "", email, "yes"]],
			}),
		},
	);

	if (!response.ok) {
		console.error(response);
		return json(null, { status: 500 });
	}

	return json(email, { status: 200 });
}

async function fetchAccessTokenIfExpired(email: string, privateKey: string) {
	if (accessToken && Date.now() < accessTokenExpiresAt) {
		return accessToken;
	}

	const { accessToken: newAccessToken, expiresAt } = (await fetchAccessToken(email, privateKey)) || {};

	if (!newAccessToken || !expiresAt) {
		return null;
	}

	accessToken = newAccessToken;
	accessTokenExpiresAt = expiresAt;

	return accessToken;
}

async function fetchAccessToken(email: string, privateKey: string) {
	const secret = await importPKCS8(privateKey, "RS256");

	const signedJwt = await new SignJWT({ scope: JWT_SCOPE })
		.setProtectedHeader({ alg: "RS256" })
		.setIssuedAt()
		.setIssuer(email)
		.setAudience(GOOGLE_OAUTH_ENDPOINT)
		.setExpirationTime("1h")
		.sign(secret)
		.catch((e) => {
			console.error(e);
			return null;
		});

	if (!signedJwt) {
		console.error("Failed to sign JWT");
		return null;
	}

	const response = await fetch(GOOGLE_OAUTH_ENDPOINT, {
		method: "POST",
		body: JSON.stringify({
			grant_type: JWT_GRANT_TYPE,
			assertion: signedJwt,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

	if (
		!response ||
		typeof response !== "object" ||
		!("access_token" in response) ||
		typeof response.access_token !== "string" ||
		!("expires_in" in response) ||
		typeof response.expires_in !== "number"
	) {
		console.error(response);
		return null;
	}

	return {
		accessToken: response.access_token,
		expiresAt: Date.now() + response.expires_in * 1000,
	};
}
