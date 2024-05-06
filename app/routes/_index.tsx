import { Layout } from "~/components/global/Layout";
import { Hero } from "~/components/landing/Hero";
import { ProductSection } from "~/components/landing/ProductSection";
import { Intro } from "~/components/landing/Intro";
import type { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { MILKTYPE75_IMAGE } from "~/routes/products.milktype75";

export async function loader({ context }: LoaderFunctionArgs) {
	return {
		seo: {
			title: "milktype",
		},
	};
}

export default function Landing() {
	return (
		<Layout>
			<Hero />
			<ProductSection
				name={
					<>
						milktype<span className="text-lg align-super ml-1 font-bold">75</span>
					</>
				}
				description="the perfect keyboard for boba lovers. functional, stunning, and ready to use right out of the box."
				url="/products/milktype75"
				image={MILKTYPE75_IMAGE}
			/>
			<Intro />
		</Layout>
	);
}
