import { Await, Link, NavLink } from "@remix-run/react";
import { Wordmark } from "~/assets/Wordmark";
import { CartIcon } from "~/assets/icons/Cart";
import { useRootLoaderData } from "~/root";
import { Container } from "~/components/global/Container";
import { twJoin } from "tailwind-merge";
import { Suspense, useState } from "react";
import { Cart } from "~/components/global/Cart";

export function Navigation() {
	const [showCart, setShowCart] = useState(false);
	return (
		<Container
			as="header"
			className="flex relative w-full flex-row py-8 items-center z-10"
			style={{ viewTransitionName: "navigation" }}>
			<Link to="/" className="mr-auto" aria-label="Home" unstable_viewTransition>
				<Wordmark className="h-10 text-cocoa-120" />
			</Link>
			<nav className="flex flex-row gap-x-24 font-medium text-cocoa-120 text-base leading-6 xs:text-lg">
				<NavLink
					prefetch="intent"
					to="/products/milktype75"
					className={({ isActive }) =>
						twJoin(isActive && "underline", "hover:text-accent active:font-medium")
					}
					unstable_viewTransition>
					milktype 75
				</NavLink>
				<button type="button" className="relative flex group" onClick={() => setShowCart((show) => !show)}>
					<CartIcon
						className={twJoin(
							"h-4 xs:h-5 sm:h-6",
							showCart ? "fill-accent" : "fill-cocoa-120",
							"group-hover:opacity-50",
						)}
					/>
					<CartBadge />
				</button>
			</nav>
			{showCart ? <Cart /> : null}
		</Container>
	);
}

function CartBadge() {
	const { cart } = useRootLoaderData();
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
