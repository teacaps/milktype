import type { ActionFunctionArgs } from "@shopify/remix-oxygen";
import { json } from "@shopify/remix-oxygen";
import { type AdminApiClient, createAdminApiClient } from "@shopify/admin-api-client";

let gqlClient: AdminApiClient;

export async function action({ request, context }: ActionFunctionArgs) {
	const fd = await request.formData();
	const email = fd.get("email");

	if (!email) {
		return json(null, { status: 400 });
	}

	gqlClient ??= createAdminApiClient({
		storeDomain: context.env.PUBLIC_STORE_DOMAIN,
		apiVersion: context.env.API_VERSION,
		accessToken: context.env.PRIVATE_ADMIN_API_TOKEN,
	});

	const { data, errors } = await gqlClient.request(CREATE_CUSTOMER_MUTATION, {
		variables: { email },
	});

	if (errors) {
		console.error(errors.message, errors.graphQLErrors);
		return json(null, { status: 500 });
	}

	return json(data, { status: 200 });
}

const CREATE_CUSTOMER_MUTATION = `#graphql
mutation CreateCustomer($email: String!) {
    customerCreate(input: { email: $email, emailMarketingConsent: { marketingState: SUBSCRIBED, marketingOptInLevel: SINGLE_OPT_IN } }) {
		customer {
			id
		}
    }
}
`;
