import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useFetcher, useNavigation } from "react-router";
import { useCart } from "@shopify/hydrogen-react";
import { CartForm, OptimisticInput } from "@shopify/hydrogen";
import { twJoin } from "tailwind-merge";
import { useCartVisibility } from "~/components/global/Cart";
import { usePrevious } from "~/lib/util";
import { CartActions } from "~/routes/cart";
import { Button } from "~/components/elements/Button";
import { LightboxImage } from "~/components/elements/Image";
import { CartIcon } from "~/assets/icons/Cart";
import { CheckIcon } from "~/assets/icons/Check";
import { MinusIcon } from "~/assets/icons/Minus";
import { TruckIcon } from "~/assets/icons/Truck";
import { ShoppingBagIcon } from "~/assets/icons/ShoppingBag";
import { SPROUT_75_MERCHANDISE_ID, BSB_DESKPAD_MERCHANDISE_ID, Renders } from "./constants";

export function CheckoutForm() {
	const { setCartVisible } = useCartVisibility();
	const navigation = useNavigation();
	const [justAddedDeskpad, setJustAddedDeskpad] = useState(false);
	const [includeDeskpad, setIncludeDeskpad] = useState(false);
	const deskpadRef = useRef<HTMLDivElement>(null);

	const fetcher = useFetcher({ key: "checkout" });
	const previousFetcherState = usePrevious(fetcher.state);

	useEffect(() => {
		if (fetcher.state === "idle" && previousFetcherState === "loading") {
			setCartVisible(true);
		}
	}, [fetcher.state]);

	const handleDeskpadAdd: MouseEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		setJustAddedDeskpad(true);
		setTimeout(() => setJustAddedDeskpad(false), 2000);

		setIncludeDeskpad((prev) => !prev);
	};

	return (
		<CartForm
			route="/cart"
			action={CartActions.LinesAdd}
			inputs={{
				lines: [
					{ merchandiseId: SPROUT_75_MERCHANDISE_ID, quantity: 1 },
					...(includeDeskpad ? [{ merchandiseId: BSB_DESKPAD_MERCHANDISE_ID, quantity: 1 }] : []),
				],
			}}
			fetcherKey="checkout">
			{(fetcher) => (
				<>
					<OptimisticInput id={SPROUT_75_MERCHANDISE_ID} data={{}} />
					{includeDeskpad && <OptimisticInput id={BSB_DESKPAD_MERCHANDISE_ID} data={{}} />}
					<input type="hidden" name="checkout" value="true" />
					<div
						ref={deskpadRef}
						className="relative group w-full xs:w-3/4 sm:w-full rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-accent"
						tabIndex={0}
						aria-label={includeDeskpad ? "Remove desk pad from cart" : "Add desk pad to cart"}>
						<LightboxImage
							{...Renders.DeskpadFull}
							className="w-full object-contain"
							button={{
								"onClick": handleDeskpadAdd,
								"aria-label": includeDeskpad ? "Remove desk pad from cart" : "Add desk pad to cart",
								"tabIndex": -1,
							}}
						/>
						<Button
							color={includeDeskpad ? "lilac" : "blurple"}
							onClick={handleDeskpadAdd}
							hoverRef={deskpadRef}
							className="absolute bottom-[10%] sm:bottom-[5%] md:bottom-[10%] -right-2 sm:-right-[20%] md:-right-[15%] rotate-[3deg] rounded-full py-2 pl-4 pr-5 flex flex-row gap-0 items-center justify-center text-yogurt-100 text-sm xs:text-base lg:text-lg xs:font-medium"
							disabled={navigation.state !== "idle"}
							aria-label={includeDeskpad ? "Remove desk pad from cart" : "Add desk pad to cart"}>
							{!includeDeskpad ? (
								<CartIcon className="w-4 xs:w-5 h-auto mr-3" />
							) : (
								<>
									<CheckIcon
										className={twJoin(
											"w-[1.375rem] xs:w-6 lg:w-8 h-auto -my-1 -ml-1 mr-1",
											!justAddedDeskpad && "group-hover:hidden",
										)}
									/>
									<MinusIcon
										className={twJoin(
											"w-[1.375rem] xs:w-6 lg:w-8 h-auto -my-1 -ml-1 mr-1 hidden",
											!justAddedDeskpad && "group-hover:block",
										)}
									/>
								</>
							)}
							<span>
								{fetcher.state === "submitting" ? (
									"loading..."
								) : (
									<>
										matching deskpad ⋅ $12{" "}
										<span className="text-yogurt-60 opacity-75 line-through">$18</span>
									</>
								)}
							</span>
						</Button>
					</div>
					<div className="flex flex-row mb-4 gap-2 sm:gap-3 items-center text-cocoa-80 text-sm sm:text-lg xl:text-xl font-medium">
						<TruckIcon className="w-4 sm:w-5 xl:w-6 h-auto" />
						<span>free shipping in the us</span>
					</div>
					<div className="flex flex-row mb-4 gap-2 sm:gap-3 items-center text-cocoa-80 text-sm sm:text-lg xl:text-xl font-medium">
						<ShoppingBagIcon className="w-4 sm:w-5 xl:w-6 h-auto" />
						<span>save on a deskpad when you bundle</span>
					</div>
					<Button
						type="submit"
						className="w-full py-4 text-yogurt-100 xs:text-lg xs:font-medium lg:text-xl"
						color="shrub"
						rainbow={false}
						disabled={navigation.state !== "idle"}>
						{fetcher.state === "submitting" ? (
							"loading..."
						) : (
							<span>
								buy now ⋅ $169 <span className="text-yogurt-60 opacity-75 line-through"></span> usd
							</span>
						)}
					</Button>
				</>
			)}
		</CartForm>
	);
}
