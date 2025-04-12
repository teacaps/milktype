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

	const cartData = await cart.get();

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
				const newLines = cartData
					? inputs.lines.filter(
							(line) =>
								!cartData.lines?.nodes?.some(
									(existingLine) => existingLine.merchandise.id === line.merchandiseId,
								),
					  )
					: inputs.lines;
				const existingLines = cartData
					? inputs.lines
							.map((line) => {
								const existingLine = cartData.lines?.nodes?.find(
									(existingLine) => existingLine.merchandise.id === line.merchandiseId,
								);
								if (!existingLine) return null;
								return {
									id: existingLine.id,
									...line,
								};
							})
							.filter((l): l is NonNullable<typeof l> => !!l)
					: [];

				result = cartData
					? (await Promise.all([cart.addLines(newLines), cart.updateLines(existingLines)]))[0]
					: await cart.create({ lines: inputs.lines });
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
