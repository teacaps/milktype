import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import { ProductImageGrid } from "~/components/product/ProductImageGrid";
import { AddToCartButton } from "~/components/product/AddToCartButton";
import type { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useLoaderData } from "@remix-run/react";

export async function loader({ context }: LoaderFunctionArgs) {
	const { product } = await context.storefront.query(PRODUCT_QUERY, {
		variables: {
			handle: "milktype75",
		},
	});
	return { product };
}

function InfoBubble({ children }: { children: string }) {
	const [highlighted, rest] = children.split("|");
	return (
		<div className="flex items-center justify-center p-3 lg:px-5 lg:py-4 font-medium text-base lg:text-lg text-cocoa-100 bg-yogurt-60 rounded-xl lg:rounded-2xl">
			<span className="font-bold">{highlighted}</span>&nbsp;<span>{rest}</span>
		</div>
	);
}

export default function Milktype75() {
	const { product } = useLoaderData<typeof loader>();
	const selectedVariant = product!.variants.nodes[0];
	return (
		<Layout>
			<Container className="py-8 sm:py-16 sm:w-full">
				<div
					className="w-full h-auto bg-blurple min-h-[20rem] rounded-3xl"
					style={{ viewTransitionName: "product-image" }}>
					{null /* HEADER IMAGE */}
				</div>
				<main className="flex flex-col md:flex-row w-full gap-10 mt-8 sm:mt-16">
					<div className="md:basis-1/2 lg:basis-2/5 aspect-square">
						<ProductImageGrid images={["a", "b", "c", "d", "e", "f"]} />
					</div>
					<section className="md:basis-1/2 lg:basis-3/5 flex flex-col gap-y-12">
						<div className="flex flex-col gap-y-6">
							<h1 className="text-4xl font-medium text-cocoa-120">
								milktype<span className="ml-1 align-super font-bold text-xl">75</span>
							</h1>
							<p className="text-cocoa-100 font-medium text-xl leading-relaxed">
								the perfect keyboard for boba lovers. functional, stunning, and ready to use right out
								of the box.
							</p>
							<div className="flex flex-row items-center gap-x-6 justify-between xs:justify-start">
								<span className="text-cocoa-120 font-medium text-2xl">$99</span>
								<AddToCartButton
									lines={[
										{
											merchandiseId: selectedVariant.id,
											quantity: 1,
										},
									]}
								/>
							</div>
						</div>
						<div className="flex flex-row flex-wrap gap-5">
							<InfoBubble>75% | layout</InfoBubble>
							<InfoBubble>gasket | mount</InfoBubble>
							<InfoBubble>volume | knob</InfoBubble>
							<InfoBubble>bluetooth | enabled</InfoBubble>
							<InfoBubble>2.4ghz | usb receiver</InfoBubble>
							<InfoBubble>mac/win | support</InfoBubble>
							<InfoBubble>backlight | effects</InfoBubble>
							<InfoBubble>5-pin hotswap | switches</InfoBubble>
							<InfoBubble>4 week | battery life</InfoBubble>
						</div>
						<h2 className="text-2xl font-medium text-cocoa-120 -mb-4">lychee jelly switches</h2>
						<div className="flex flex-row flex-wrap gap-5">
							<InfoBubble>linear</InfoBubble>
							<InfoBubble>45g | bottom-out</InfoBubble>
							<InfoBubble>pre-lubed</InfoBubble>
							<InfoBubble>2mm | pre-travel</InfoBubble>
							<InfoBubble>3.5mm | total travel</InfoBubble>
						</div>
					</section>
				</main>
			</Container>
		</Layout>
	);
}

const PRODUCT_QUERY = `#graphql
query Product($handle: String!) {
	product(handle: $handle) {
		seo {
			title
			description
        }
		variants(first: 1) {
			nodes {
				id
				price {
					amount
					currencyCode
                }
				compareAtPrice {
					amount
					currencyCode
                }
            }
		}
    }
}
`;
