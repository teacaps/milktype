import type { ReactNode } from "react";
import { Container } from "~/components/global/Container";
import { Splat } from "~/assets/Splat";
import { Link } from "@remix-run/react";
import { Divider } from "~/assets/Divider";

interface ProductSectionProps {
	name: ReactNode;
	description: ReactNode;
	image: ReactNode;
}

export function ProductSection(props: ProductSectionProps) {
	return (
		<Container className="relative py-24 flex flex-col gap-9">
			<Divider className="w-[150%] xl:w-[125%] xl:max-w-screen-xl -top-20 left-1/2 -translate-x-1/2 absolute h-auto text-yogurt-60" />
			<div className="flex flex-row items-center mt-16 bg-yogurt-60 px-12 py-8 h-52 rounded-3xl">
				<div className="flex flex-col gap-4">
					<h3 className="text-3xl text-cocoa-120 font-medium">{props.name}</h3>
					<p className="text-lg text-cocoa-100 font-medium w-3/5">{props.description}</p>
				</div>
				<Link className="ml-auto -mr-24 group" to="/" prefetch="render">
					<Splat splatClasses="fill-accent h-60 transition-transform ease-in-out duration-700 rotate-0 group-hover:-rotate-90">
						<span className="text-yogurt-100 text-3xl ease-in-out duration-700 font-semibold rotate-12 transition-transform group-hover:-rotate-12">
							shop now
						</span>
					</Splat>
				</Link>
			</div>
			<div className="w-full h-auto bg-blurple min-h-[25rem] rounded-3xl">{props.image}</div>
		</Container>
	);
}
