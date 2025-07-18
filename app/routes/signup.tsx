import type { ActionFunctionArgs } from "@shopify/remix-oxygen";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/web-api";

export async function action({ request, context }: ActionFunctionArgs) {
	try {
		const fd = await request.formData();
		const email = fd.get("email")?.toString();

		if (!email) {
			return { error: "email is required" };
		}

		const hostname = new URL(request.url).hostname;

		const shopify = shopifyApi({
			adminApiAccessToken: context.env.PRIVATE_ADMIN_API_TOKEN,
			apiKey: context.env.PRIVATE_ADMIN_API_KEY,
			apiSecretKey: context.env.PRIVATE_ADMIN_API_SECRET_KEY,
			scopes: ["read_customers", "write_customers"],
			hostName: hostname,
			hostScheme: hostname.startsWith("localhost") ? "http" : "https",
			apiVersion: LATEST_API_VERSION,
			isEmbeddedApp: false,
			isCustomStoreApp: true,
		});

		const gqlClient = new shopify.clients.Graphql({
			session: shopify.session.customAppSession(context.env.PUBLIC_STORE_DOMAIN),
		});

		const { data, errors } = await gqlClient.request(CREATE_CUSTOMER_MUTATION, {
			variables: { email },
		});

		if (errors) {
			console.error(errors.message, JSON.stringify(errors.graphQLErrors, null, 4));
			return { error: errors.message };
		}

		return { response: data };
	} catch (error) {
		console.error("Unhandled error at signup:", error);
		return { error: "an unknown error occurred" };
	}
}

const CREATE_CUSTOMER_MUTATION = `#graphql
mutation CreateCustomer($email: String!) {
    customerCreate(input: { email: $email, emailMarketingConsent: { marketingOptInLevel: SINGLE_OPT_IN, marketingState: SUBSCRIBED } }) {
        customer {
			id
            email
        }
    }
}
`;
