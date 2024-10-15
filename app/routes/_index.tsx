import { Layout } from "~/components/global/Layout";
import { Hero } from "~/components/landing/Hero";
import { ProductSection } from "~/components/landing/ProductSection";
import { Intro } from "~/components/landing/Intro";
import type { LoaderFunctionArgs, MetaFunction } from "@shopify/remix-oxygen";
import { json } from "@shopify/remix-oxygen";
import { AnalyticsPageType } from "@shopify/hydrogen-react";
import { SPROUT75_IMAGE } from "~/routes/sprout75";

export const meta: MetaFunction = () => [
	{
		title: "milktype",
	},
	{
		name: "description",
		content: "adorable accessories for people we ♥",
	},
	{
		property: "og:title",
		content: "milktype",
	},
	{
		property: "og:description",
		content: "adorable accessories for people we ♥",
	},
	{
		property: "og:url",
		content: "https://milktype.co",
	},
	{
		property: "og:image",
		content: "https://milktype.co/og/main.png",
	},
	{
		property: "twitter:image",
		content: "https://milktype.co/og/main.png",
	},
];

export function loader({ context }: LoaderFunctionArgs) {
	return json({
		analytics: { pageType: AnalyticsPageType.home },
	});
}

export default function Landing() {
	return (
		<Layout>
			<Hero />
			<ProductSection
				name={
					<>
						sprout<span className="text-lg align-sub ml-1 font-bold">75</span>
					</>
				}
				description="launching in cream beige featuring a boba theme, included novelties, and mac/win keycaps, there's something for everyone."
				url="/sprout75"
				image={SPROUT75_IMAGE}
			/>
			<Intro />
		</Layout>
	);
}
