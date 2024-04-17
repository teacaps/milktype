import { CartForm, type CartQueryDataReturn } from "@shopify/hydrogen";
import type { ActionFunctionArgs } from "@shopify/remix-oxygen";
import { json } from "@shopify/remix-oxygen";

export async function action({ request, context }: ActionFunctionArgs) {
	const { cart } = context;

	const formData = await request.formData();
	const { action, inputs } = CartForm.getFormInput(formData);

	let result: CartQueryDataReturn;

	switch (action) {
		case CartForm.ACTIONS.LinesAdd:
			result = await cart.addLines(inputs.lines);
			break;
		case CartForm.ACTIONS.LinesUpdate:
			result = await cart.updateLines(inputs.lines);
			break;
		case CartForm.ACTIONS.LinesRemove:
			result = await cart.removeLines(inputs.lineIds);
			break;
		default:
			throw new Error(`Invalid action: ${action}`);
	}

	const headers = cart.setCartId(result.cart.id);

	return json(result, { status: 200, headers });
}
