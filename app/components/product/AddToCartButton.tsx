import type { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";
import { CartForm } from "@shopify/hydrogen";
import { Button } from "~/components/elements/Button";

export function AddToCartButton({ lines, disabled: _disabled }: { lines: CartLineInput[]; disabled?: boolean }) {
	return (
		<CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{ lines }}>
			{(fetcher) => {
				const disabled = _disabled ?? fetcher.state !== "idle";
				return (
					<Button
						color="accent"
						className="h-16 text-xl text-yogurt-100 font-medium"
						type="submit"
						disabled={disabled}>
						add to cart
					</Button>
				);
			}}
		</CartForm>
	);
}
