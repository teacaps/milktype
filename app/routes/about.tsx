import type { MetaFunction } from "@shopify/remix-oxygen";
import { Layout } from "~/components/global/Layout";
import { Container } from "~/components/global/Container";
import { Image } from "~/components/elements/Image";
import { Cascade } from "~/assets/Cascade";

export const meta: MetaFunction = () => [
	{
		title: "about",
	},
	{
		name: "description",
		content: "about milktype.",
	},
	{
		property: "og:title",
		content: "about",
	},
	{
		property: "og:description",
		content: "about milktype.",
	},
	{
		property: "og:url",
		content: "https://milktype.co/about",
	},
	{
		property: "og:image",
		content: "https://milktype.co/og/about.png",
	},
	{
		property: "twitter:image",
		content: "https://milktype.co/og/about.png",
	},
];

export default function About() {
	return (
		<Layout>
			<Container className="py-8 md:py-16 !md:px-0 flex flex-col gap-y-16 md:flex-row md:items-center md:justify-between">
				<h1 className="mt-12 md:-mt-24 xl:-mt-16 w-4/5 sm:w-3/5 md:w-1/2 xl:w-3/4 text-5xl xl:text-6xl text-balance text-cocoa-120 leading-tight font-medium">
					inspired by the wonder of <span className="italic">play</span>.
				</h1>
				<Cascade className="self-end -mt-8 sm:-mt-20 md:mt-24 xl:mt-16 h-auto w-64 xl:w-80" />
			</Container>
			<Container className="mt-24">
				<p className="w-full prose prose-2xl lg:text-3xl lg:leading-[1.7] font-medium text-cocoa-120 text-center">
					milktype is a design studio producing adorable accessories for people we love. we believe fun isn’t
					just for the young — it's how we do our best work.
				</p>
			</Container>
			<Container className="my-24 md:w-full xl:w-4/5 flex flex-col gap-y-8 md:flex-row md:gap-x-16 items-center justify-center">
				<Image
					src="web/AboutMotifCloseUp.png"
					alt="a close-up shot of a silver mirror weight, with the milktype motif etched into it — a circle, a triangle, and a pentagon in a row."
					className="w-full md:basis-1/2 aspect-[3/2] rounded-lg"
				/>
				<p className="w-full md:basis-1/2 prose prose-xl lg:prose-2xl font-medium text-cocoa-120 text-balance text-center md:text-left">
					our tools are designed with intention. we love creative materials and thoughtful functionality. most
					importantly, our products are{" "}
					<span className="italic">
						<span className="text-accent">playful</span> <span className="text-shrub">by</span>{" "}
						<span className="text-blurple">design</span>
					</span>
					.
				</p>
			</Container>
		</Layout>
	);
}
