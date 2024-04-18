import { Await } from "@remix-run/react";
import type {
	ComponentizableCartLine,
	CartLineUpdateInput,
	CartLine,
} from "@shopify/hydrogen-react/storefront-api-types";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { CartForm, Money, OptimisticInput, useOptimisticData, flattenConnection } from "@shopify/hydrogen";
import { MinusIcon } from "~/assets/icons/Minus";
import { PlusIcon } from "~/assets/icons/Plus";
import { useRootLoaderData } from "~/root";
import { ButtonLink } from "~/components/elements/Button";
import { twJoin } from "tailwind-merge";

type OptimisticData = {
	action?: string;
	quantity?: number;
};

interface CartQuantityButtonProps {
	children: ReactNode;
	line: CartLineUpdateInput;
	quantity?: number;
}

function UpdateCartButton({ children, line }: CartQuantityButtonProps) {
	return (
		<CartForm
			route="/cart"
			action={CartForm.ACTIONS.LinesUpdate}
			inputs={{
				lines: [line],
			}}>
			{children}
		</CartForm>
	);
}

function RemoveFromCartButton({ children, line }: CartQuantityButtonProps) {
	return (
		<CartForm
			route="/cart"
			action={CartForm.ACTIONS.LinesRemove}
			inputs={{
				lineIds: [line.id],
			}}>
			{children}
		</CartForm>
	);
}

const IncrementQuantityButton = UpdateCartButton;
const DecrementQuantityButton = ({ children, line, quantity }: CartQuantityButtonProps) =>
	(quantity || 2) > 1 ? (
		<UpdateCartButton line={line}>{children}</UpdateCartButton>
	) : (
		<RemoveFromCartButton line={line}>{children}</RemoveFromCartButton>
	);

function QuantitySelector({ line }: { line: CartLine | ComponentizableCartLine }) {
	const lineId = line.id;
	const optimisticData = useOptimisticData<OptimisticData>(lineId);

	if (!line?.quantity && line.quantity !== 0) return null;

	const quantity = optimisticData?.quantity ?? line.quantity;
	const prevQuantity = parseInt(Math.max(0, quantity - 1).toFixed(0));
	const nextQuantity = parseInt((quantity + 1).toFixed(0));

	return (
		<>
			<label htmlFor={`quantity-${lineId}`} className="sr-only">
				Quantity: {quantity}
			</label>
			<div className="flex items-center justify-center gap-4 h-4 [&>form]:flex">
				<DecrementQuantityButton line={{ id: lineId, quantity: prevQuantity }} quantity={quantity}>
					<button
						name="decrease-quantity"
						aria-label="Decrease quantity"
						className="w-5 h-5 -mt-px rounded bg-cocoa-120 text-yogurt-60 hover:bg-accent disabled:bg-cocoa-80"
						value={prevQuantity}
						disabled={quantity <= 1}>
						<MinusIcon className="w-full h-full" />
					</button>
					<OptimisticInput id={lineId} data={{ quantity: prevQuantity }} />
				</DecrementQuantityButton>
				<span className="text-cocoa-120 font-semibold text-base tabular-nums h-4 leading-none">{quantity}</span>
				<IncrementQuantityButton line={{ id: lineId, quantity: nextQuantity }}>
					<button
						name="increase-quantity"
						aria-label="Increase quantity"
						className="w-5 h-5 rounded bg-cocoa-120 text-yogurt-60 hover:bg-accent disabled:bg-cocoa-80"
						value={nextQuantity}>
						<PlusIcon className="w-full h-full" />
					</button>
					<OptimisticInput id={lineId} data={{ quantity: nextQuantity }} />
				</IncrementQuantityButton>
			</div>
		</>
	);
}

function CartLineItem({ line }: { line: CartLine | ComponentizableCartLine }) {
	const image = line.merchandise.image || null;

	return (
		<div className="flex flex-row gap-6">
			<div className="aspect-square h-24 flex-shrink-0 rounded-2xl overflow-clip object-cover bg-cocoa-80">
				{image && (
					<img
						src={image.url}
						alt={image.altText || undefined}
						height={image.height || undefined}
						width={image.width || undefined}
					/>
				)}
			</div>
			<div className="w-full flex flex-col items-start justify-between py-2">
				<span className="font-semibold text-lg text-cocoa-120">{line.merchandise.product.title}</span>
				<div className="w-full flex flex-row items-center justify-between">
					<QuantitySelector line={line} />
					<span className="text-cocoa-100 text-base font-semibold">
						<Money withoutTrailingZeros data={line.cost.totalAmount} />
					</span>
				</div>
			</div>
		</div>
	);
}

export function Cart({ show = false }: { show?: boolean }) {
	const { cart } = useRootLoaderData();

	return (
		<div
			className={twJoin(
				"absolute left-0 right-0 top-28 sm:left-unset sm:top-20 sm:right-10 w-6/7 sm:w-96 flex flex-col mx-auto sm:mx-unset px-10 py-8 gap-8 bg-yogurt-60 border border-cocoa-60 rounded-2xl transition-opacity",
				show ? "opacity-100 pointer-events-auto shadow-md" : "opacity-0 pointer-events-none",
			)}
			onClick={(e) => e.stopPropagation()}>
			<Suspense fallback={<span className="font-medium text-base text-cocoa-100">loading...</span>}>
				<Await resolve={cart}>
					{(cart) => {
						const lines = flattenConnection(cart?.lines);
						const amount = cart?.cost.totalAmount || null;
						const checkoutUrl = cart?.checkoutUrl || null;
						const cartLines = lines?.length ? (
							lines.map((line) => <CartLineItem line={line} />)
						) : (
							<span className="font-medium text-base text-cocoa-100">your cart is empty!</span>
						);
						return (
							<>
								{cartLines}
								<div className="flex flex-col w-full gap-4">
									{amount && (
										<div className="flex flex-row w-full justify-between items-center">
											<span className="text-cocoa-120 text-base font-medium">subtotal</span>
											<span className="text-cocoa-120 text-base font-semibold">
												<Money withoutTrailingZeros data={amount} />
											</span>
										</div>
									)}
									<div className="flex flex-row w-full justify-between items-center">
										<span className="text-cocoa-120 text-base font-medium">shipping & tax</span>
										<span className="text-cocoa-80 text-base font-semibold">
											handled at checkout
										</span>
									</div>
								</div>
								{checkoutUrl && (
									<ButtonLink
										url={checkoutUrl}
										color="accent"
										className="w-full text-yogurt-100 h-10">
										check out
									</ButtonLink>
								)}
							</>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}
