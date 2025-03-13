import { Await } from "@remix-run/react";
import type {
	ComponentizableCartLine,
	CartLineUpdateInput,
	CartLine,
} from "@shopify/hydrogen-react/storefront-api-types";
import { Suspense, type ReactNode, createContext, useContext } from "react";
import {
	CartForm,
	Money,
	OptimisticInput,
	useOptimisticData,
	flattenConnection,
	Analytics,
	useOptimisticCart,
} from "@shopify/hydrogen";
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

	if (line?.quantity == null) return null;

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
						className="w-5 h-5 -mt-px rounded bg-cocoa-120 text-yogurt-60 hover:bg-accent focus-visible:outline-none focus-visible:ring focus-visible:ring-accent disabled:bg-cocoa-80"
						value={prevQuantity}>
						<MinusIcon className="w-full h-full" />
					</button>
					<OptimisticInput id={lineId} data={{ quantity: prevQuantity }} />
				</DecrementQuantityButton>
				<span className="text-cocoa-120 font-semibold text-base tabular-nums h-4 leading-none">{quantity}</span>
				<IncrementQuantityButton line={{ id: lineId, quantity: nextQuantity }}>
					<button
						name="increase-quantity"
						aria-label="Increase quantity"
						className="w-5 h-5 rounded bg-cocoa-120 text-yogurt-60 hover:bg-accent focus-visible:outline-none focus-visible:ring focus-visible:ring-accent disabled:bg-cocoa-80"
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
		<div className="w-full flex flex-row justify-between">
			{!!image && (
				<div className="mr-6 aspect-square h-24 flex-shrink-0 rounded-2xl overflow-clip object-cover bg-cocoa-80">
					<img className="w-full" src={image.url} alt={image.altText || undefined} />
				</div>
			)}
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

export function Cart() {
	const { cart } = useRootLoaderData();
	const { cartVisible, setCartVisible } = useCartVisibility();

	return (
		<>
			{cartVisible ? (
				<div
					className="fixed w-screen h-screen top-0 left-0"
					onClick={() => setCartVisible(false)}
					onKeyDown={(e) => e.key === "Escape" && setCartVisible(false)}
					role="presentation"
					aria-hidden={!cartVisible}
					tabIndex={-1}
					aria-label="Close cart"></div>
			) : null}
			<div
				className={twJoin(
					"cart absolute left-0 right-0 top-28 sm:left-unset sm:top-20 sm:right-10 w-6/7 sm:w-96 mx-auto sm:mx-unset px-10 py-8 bg-yogurt-60 border-2 border-cocoa-60 rounded-2xl transition-[opacity,visibility]",
					cartVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none invisible",
				)}
				role="dialog"
				aria-modal="true"
				aria-label="Cart"
				aria-hidden={!cartVisible}>
				<div
					className="flex flex-col items-center gap-8 w-full"
					role="presentation"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}>
					<Suspense fallback={<span className="font-medium text-base text-cocoa-100">loading...</span>}>
						<Await resolve={cart}>
							{(cart) => {
								const lines = cart?.lines ? flattenConnection(cart.lines) : [];

								const amount = cart?.cost?.subtotalAmount;
								const checkoutUrl = cart?.checkoutUrl;

								if (!lines?.length)
									return (
										<span className="font-medium text-base text-cocoa-100">
											your cart is empty!
										</span>
									);

								return (
									<>
										{lines.map((line) => (
											<CartLineItem line={line} key={line.id} />
										))}
										<div className="flex flex-col w-full gap-4">
											{amount && (
												<div className="flex flex-row w-full justify-between items-center">
													<span className="text-cocoa-120 text-base font-medium">
														subtotal
													</span>
													<span className="text-cocoa-120 text-base font-semibold">
														<Money withoutTrailingZeros data={amount} />
													</span>
												</div>
											)}
											<div className="flex flex-row w-full justify-between items-center">
												<span className="text-cocoa-120 text-base font-medium">
													shipping & tax
												</span>
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
			</div>
			{cartVisible ? <Analytics.CartView /> : null}
		</>
	);
}

export const CartVisibilityContext = createContext<{
	cartVisible: boolean;
	setCartVisible: (cartVisible: boolean | ((cartVisible: boolean) => boolean)) => void;
}>({
	cartVisible: false,
	setCartVisible: () => {},
});

export function useCartVisibility() {
	const { cartVisible: _cartVisible, setCartVisible: _setCartVisible } = useContext(CartVisibilityContext);
	return {
		cartVisible: _cartVisible,
		setCartVisible: (cartVisible: boolean | ((cartVisible: boolean) => boolean)) => {
			const newValue = typeof cartVisible === "function" ? cartVisible(_cartVisible) : cartVisible;
			_setCartVisible(cartVisible);
			if (newValue === true) window.scrollTo(0, 0);
		},
	};
}
