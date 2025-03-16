import {
	CartForm,
	type CartQueryDataReturn,
	CartActionInput as CartFormActionInput,
	OptimisticCartLineInput,
} from "@shopify/hydrogen";
import type { ActionFunctionArgs } from "@shopify/remix-oxygen";
import { json } from "@shopify/remix-oxygen";

export const CartActions = {
	...CartForm.ACTIONS,
	LinesUpsert: "LinesUpsert",
} as const;

type CartLinesUpsertRequire = {
	action: "LinesUpsert";
	inputs: {
		lines: Array<OptimisticCartLineInput>;
	};
};

export type CartActionInput = CartFormActionInput | CartLinesUpsertRequire;

export async function action({ request, context }: ActionFunctionArgs) {
	const { cart } = context;

	const cartReturn = await cart.get();

	const formData = await request.formData();
	const { action, inputs } = CartForm.getFormInput(formData) as CartActionInput;

	let result: CartQueryDataReturn;

	try {
		switch (action) {
			case CartActions.LinesAdd:
				result = await cart.addLines(inputs.lines);
				break;
			case CartActions.LinesUpdate:
				result = await cart.updateLines(inputs.lines);
				break;
			case CartActions.LinesRemove:
				result = await cart.removeLines(inputs.lineIds);
				break;
			case CartActions.LinesUpsert:
				if (!cartReturn) throw new Error("Cart not found");
				const newLines = inputs.lines.filter(
					(line) =>
						!cartReturn.lines?.nodes?.some(
							(existingLine) => existingLine.merchandise.id === line.merchandiseId,
						),
				);
				const existingLines = inputs.lines
					.map((line) => {
						const existingLine = cartReturn.lines?.nodes?.find(
							(existingLine) => existingLine.merchandise.id === line.merchandiseId,
						);
						if (!existingLine) return null;
						return {
							id: existingLine.id,
							...line,
						};
					})
					.filter((l): l is NonNullable<typeof l> => !!l);

				result = (await Promise.all([cart.addLines(newLines), cart.updateLines(existingLines)]))[0];
				break;
			case CartActions.DiscountCodesUpdate:
				result = await cart.updateDiscountCodes(inputs.discountCodes);
				break;
			default:
				throw new Error(`Invalid action: ${action}`);
		}
	} catch (error) {
		console.error(error);
		return json({ error }, { status: 200 });
	}

	const headers = cart.setCartId(result.cart.id);

	return json({ response: result }, { status: 200, headers });
}
