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

	const SplatLink = ({ className }: { className: string }) => (
		<NavLink className={"group " + className} to={props.url} prefetch="render" unstable_viewTransition>
			<Splat
				className="h-60"
				splatClasses="fill-accent h-full w-full transition-transform ease-in-out duration-700 rotate-0 group-hover:-rotate-90">
				<span className="text-yogurt-100 text-3xl ease-in-out duration-700 font-semibold rotate-12 transition-transform group-hover:-rotate-12">
					shop now
				</span>
			</Splat>
		</NavLink>
	);

	return (
		<Container className="relative py-24 flex flex-col gap-9">
			<Divider className="w-[150%] xl:w-[125%] xl:max-w-screen-xl -top-2 md:-top-20 left-1/2 -translate-x-1/2 absolute h-auto text-yogurt-60" />
			<div className="flex flex-col md:flex-row md:items-center mt-16 bg-yogurt-60 px-12 py-8 h-fit lg:h-52 rounded-3xl">
				<div className="flex flex-col gap-4">
					<h3 className="text-3xl text-cocoa-120 font-medium">{props.name}</h3>
					<p className="text-xl text-cocoa-100 font-medium w-full md:w-4/5 xl:w-3/5">{props.description}</p>
				</div>
				<SplatLink className="hidden md:block my-unset ml-auto -mr-24" />
			</div>
			<div
				className="relative w-full h-auto bg-blurple min-h-[25rem] rounded-3xl"
				style={isTransitioning ? { viewTransitionName: "product-image" } : {}}>
				<SplatLink className="absolute -top-12 -right-8 md:hidden" />
				{props.image}
			</div>
		</Container>
	);
}
