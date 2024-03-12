import { Link, NavLink } from "@remix-run/react";
import { Wordmark } from "~/assets/Wordmark";
import { CartIcon } from "~/assets/icons/Cart";
import { useCart } from "@shopify/hydrogen-react";
import { Container } from "~/components/global/Container";
import { twJoin } from "tailwind-merge";

export function Navigation() {
	return (
		<Container
			as="header"
			className="flex w-full flex-row py-8 items-center"
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
				<button className="relative flex">
					<CartIcon className="h-4 fill-cocoa-120 hover:fill-accent xs:h-5 sm:h-6" />
					<CartBadge />
				</button>
			</nav>
		</Container>
	);
}

function CartBadge() {
	const { totalQuantity } = useCart();
	if (!totalQuantity) return null;
	return (
		<div className="absolute -bottom-1 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent px-[0.125rem] py-[0.125rem] pb-[0.25rem]">
			<span className="text-[0.75rem] text-center font-medium text-yogurt-100 trim-both leading-none">
				{totalQuantity}
			</span>
		</div>
	);
}
