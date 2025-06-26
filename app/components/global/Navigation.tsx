import { Await, Link, NavLink, useRouteLoaderData } from "react-router";
import { Wordmark } from "~/assets/Wordmark";
import { CartIcon } from "~/assets/icons/Cart";
import { Container } from "~/components/global/Container";
import { twJoin } from "tailwind-merge";
import { Suspense } from "react";
import { Cart, useCartVisibility } from "~/components/global/Cart";
import type { RootLoader } from "~/root";

export function Navigation() {
	const { cartVisible, setCartVisible } = useCartVisibility();
	return (
		<Container
			as="header"
			className="flex relative w-full flex-row py-8 items-center z-10"
			style={{ viewTransitionName: "navigation" }}>
			<Link
				to="/"
				className="mr-auto text-cocoa-120 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
				aria-label="Home"
				viewTransition>
				<Wordmark className="h-8 xs:h-10" />
			</Link>
			<nav className="flex flex-row flex-grow sm:flex-grow-0 items-center justify-between sm:justify-start sm:gap-x-24 pl-8 sm:pl-0 font-medium text-cocoa-120 text-base leading-6 xs:text-lg">
				<NavLink
					prefetch="intent"
					to="/sprout75"
					className={({ isActive }) =>
						twJoin(
							isActive && "underline",
							"hover:text-accent focus-visible:text-accent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-accent active:font-medium",
						)
					}
					viewTransition>
					sprout 75
				</NavLink>
				<button
					type="button"
					className="relative flex group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-8 focus-visible:ring-accent"
					onClick={() => setCartVisible((show) => !show)}>
					<CartIcon
						className={twJoin(
							"h-4 xs:h-5 sm:h-6",
							cartVisible ? "fill-accent" : "fill-cocoa-120",
							"group-hover:fill-accent group-focus-visible:fill-accent",
						)}
					/>
					<CartBadge />
				</button>
			</nav>
			<Cart />
		</Container>
	);
}

function CartBadge() {
	const { cart } = useRouteLoaderData<RootLoader>("root")!;
	return (
		<Suspense fallback={null}>
			<Await resolve={cart}>
				{(cart) => {
					if (!cart?.totalQuantity) return null;
					return (
						<div className="peer/badge absolute -bottom-1 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
							<span className="text-[0.75rem] tabular-nums text-center font-medium text-yogurt-100 trim-both leading-none m-auto">
								{cart.totalQuantity}
							</span>
						</div>
					);
				}}
			</Await>
		</Suspense>
	);
}
