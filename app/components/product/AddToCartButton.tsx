import type { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";
import { CartForm } from "@shopify/hydrogen";
import { Button } from "~/components/elements/Button";
import { CartActions } from "~/routes/cart";

export function AddToCartButton({ lines, disabled: _disabled }: { lines: CartLineInput[]; disabled?: boolean }) {
	return (
		<CartForm route="/cart" action={CartActions.LinesAdd} inputs={{ lines }}>
			{(fetcher) => {
				const disabled = _disabled ?? fetcher.state !== "idle";
				let text = "add to cart";
				if (fetcher.state === "submitting") text = "adding...";
				if (_disabled) text = "out of stock";
				return (
					<Button
						color="accent"
						className="h-16 text-xl text-yogurt-100 font-medium"
						type="submit"
						disabled={disabled}>
						{text}
					</Button>
				);
			}}
		</CartForm>
	);
}
