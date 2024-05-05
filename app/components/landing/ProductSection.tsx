import type { ReactNode } from "react";
import { Container } from "~/components/global/Container";
import { Splat } from "~/assets/Splat";
import { NavLink, unstable_useViewTransitionState } from "@remix-run/react";
import { HeroDivider } from "~/assets/Divider";
import { twJoin } from "tailwind-merge";

interface ProductSectionProps {
	name: ReactNode;
	description: ReactNode;
	image?: {
		src: string;
		alt: string;
	};
	url: string;
}

export function ProductSection(props: ProductSectionProps) {
	const isTransitioning = unstable_useViewTransitionState(props.url);

	const splat = (
		<Splat
			className={twJoin(
				"h-48 sm:h-60 transition-transform ease-bounce duration-500",
				isTransitioning && "scale-0",
			)}
			splatClasses="fill-accent h-full w-full transition-transform ease-in-out duration-700 rotate-0 group-focus-visible:motion-safe:-rotate-90 group-focus-visible:fill-shrub group-hover:motion-safe:-rotate-90 group-hover:motion-reduce:fill-shrub">
			<span className="text-yogurt-100 text-2xl sm:text-3xl ease-in-out duration-700 font-semibold rotate-12 transition-transform group-focus-visible:motion-safe:-rotate-12 group-hover:motion-safe:-rotate-12">
				shop now
			</span>
		</Splat>
	);

	return (
		<Container className="relative py-24 flex flex-col gap-4">
			<HeroDivider className="w-[150%] xl:w-[125%] xl:max-w-screen-xl -top-2 md:-top-20 left-1/2 -translate-x-1/2 absolute h-auto fill-yogurt-60" />
			<div className="flex flex-col md:flex-row md:items-center mt-16 bg-yogurt-60 px-12 py-8 h-fit lg:h-52 rounded-3xl">
				<div className="flex flex-col gap-4">
					<h3 className="text-3xl text-cocoa-120 font-medium">{props.name}</h3>
					<p className="text-xl text-cocoa-100 font-medium w-full md:w-4/5 xl:w-3/5">{props.description}</p>
				</div>
				<NavLink
					className="group focus-visible:outline-none relative hidden md:block my-unset ml-auto -mr-24"
					to={props.url}
					prefetch="render"
					unstable_viewTransition>
					{splat}
				</NavLink>
			</div>
			<NavLink
				to={props.url}
				prefetch="render"
				unstable_viewTransition
				className={twJoin(
					"group focus-visible:outline-none relative flex items-center justify-center w-full h-auto bg-blurple rounded-3xl",
					isTransitioning && "bg-opacity-0",
				)}>
				<div className="absolute -right-8 -bottom-20 sm:-right-20 sm:-bottom-28 md:hidden">{splat}</div>
				{props.image && (
					<img
						src={props.image.src}
						alt={props.image.alt}
						className="object-cover object-center aspect-video h-auto min-h-[20rem] rounded-3xl"
						style={isTransitioning ? { viewTransitionName: "product-image" } : {}}
					/>
				)}
			</NavLink>
		</Container>
	);
}
