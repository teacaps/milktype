import type { ReactNode } from "react";
import { Container } from "~/components/global/Container";
import { Splat } from "~/assets/Splat";
import { NavLink, unstable_useViewTransitionState } from "@remix-run/react";
import { Divider } from "~/assets/Divider";

interface ProductSectionProps {
	name: ReactNode;
	description: ReactNode;
	image: ReactNode;
	url: string;
}

export function ProductSection(props: ProductSectionProps) {
	const isTransitioning = unstable_useViewTransitionState(props.url);
	return (
		<Container className="relative py-24 flex flex-col gap-9">
			<Divider className="w-[150%] xl:w-[125%] xl:max-w-screen-xl -top-20 left-1/2 -translate-x-1/2 absolute h-auto text-yogurt-60" />
			<div className="flex flex-row items-center mt-16 bg-yogurt-60 px-12 py-8 h-52 rounded-3xl">
				<div className="flex flex-col gap-4">
					<h3 className="text-3xl text-cocoa-120 font-medium">{props.name}</h3>
					<p className="text-xl text-cocoa-100 font-medium w-3/5">{props.description}</p>
				</div>
				<NavLink className="ml-auto -mr-24 group" to={props.url} prefetch="render" unstable_viewTransition>
					<Splat splatClasses="fill-accent h-60 transition-transform ease-in-out duration-700 rotate-0 group-hover:-rotate-90">
						<span className="text-yogurt-100 text-3xl ease-in-out duration-700 font-semibold rotate-12 transition-transform group-hover:-rotate-12">
							shop now
						</span>
					</Splat>
				</NavLink>
			</div>
			<div
				className="w-full h-auto bg-blurple min-h-[25rem] rounded-3xl"
				style={isTransitioning ? { viewTransitionName: "product-image" } : {}}>
				{props.image}
			</div>
		</Container>
	);
}
