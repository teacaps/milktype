import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import { ProductImageGrid } from "~/components/product/ProductImageGrid";
import { AddToCartButton } from "~/components/product/AddToCartButton";
import type { LoaderFunctionArgs, MetaFunction } from "@shopify/remix-oxygen";
import { useLoaderData } from "react-router";
import { Money, Analytics } from "@shopify/hydrogen";

const META_SRC = "https://img.milktype.co/cdn-cgi/image/width=2000,format=auto/posters-keycaps/meta.png";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
	{
		title: data?.product?.seo?.title ?? data?.product?.title,
	},
	{
		name: "description",
		content: data?.product?.seo?.description ?? data?.product?.description,
	},
	{
		property: "og:title",
		content: data?.product?.seo?.title ?? data?.product?.title,
	},
	{
		property: "og:description",
		content: data?.product?.seo?.description ?? data?.product?.description,
	},
	{
		property: "og:url",
		content: "https://milktype.co/products/posters-keycaps",
	},
	{
		property: "og:image",
		content: META_SRC,
	},
	{
		property: "twitter:image",
		content: META_SRC,
	},
];

const GRID_IMAGES = [
	"posters-keycaps/2.png",
	"posters-keycaps/3.png",
	"posters-keycaps/4.png",
	"posters-keycaps/1.png",
	"posters-keycaps/5.png",
	"posters-keycaps/6.png",
];

export async function loader({ context }: LoaderFunctionArgs) {
	const { product } = await context.storefront.query(PRODUCT_QUERY, {
		variables: {
			handle: "posters-keycaps",
		},
	});

	if (!product?.id) {
		throw new Response(null, { status: 404 });
	}

	return {
		product,
	};
}

export default function PostersKeycaps() {
	const { product } = useLoaderData<typeof loader>();
	const selectedVariant = product.variants.nodes[0];

	const price = selectedVariant.price;
	const compareAtPrice = selectedVariant.compareAtPrice || price;

	const isAvailable = (selectedVariant.quantityAvailable ?? -1) > 0;
	const isOnSale = isAvailable && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

	return (
		<Layout>
			<Container className="py-8 sm:py-16 sm:w-full">
				<main className="flex flex-col md:flex-row w-full">
					<div className="md:basis-1/2 lg:basis-2/5 w-full self-center md:self-start aspect-square">
						<ProductImageGrid images={GRID_IMAGES} />
					</div>
					<section className="md:basis-1/2 lg:basis-3/5 flex flex-col gap-y-12 mt-10 md:mt-0 md:ml-10">
						<div className="flex flex-col gap-y-6">
							<h1 className="text-4xl font-medium text-cocoa-120">{"poster's keycaps"}</h1>
							<p
								className="text-cocoa-100 font-medium prose-xl prose-a:text-accent prose-a:underline hover:prose-a:no-underline"
								dangerouslySetInnerHTML={{ __html: product?.descriptionHtml }}></p>
							<div className="mt-4 flex flex-row items-center gap-x-6">
								<div className="flex flex-col gap-y-1">
									<span className="font-semibold text-2xl inline-flex items-center">
										{isOnSale ? (
											<Money
												as="span"
												className="text-cocoa-100 text-xl mr-4 relative before:absolute before:content-[''] before:left-0 before:top-1/2 before:right-0 before:border-t-[3px] before:border-t-blurple before:-rotate-12 before:scale-125"
												withoutTrailingZeros
												data={compareAtPrice}
											/>
										) : null}
										<Money
											as="span"
											withoutTrailingZeros
											data={price}
											className={
												isOnSale
													? "text-blurple"
													: isAvailable
													? "text-cocoa-100"
													: "text-cocoa-80"
											}
										/>
									</span>
								</div>
								<AddToCartButton
									lines={[
										{
											merchandiseId: selectedVariant.id,
											quantity: 1,
										},
									]}
									disabled={!selectedVariant.quantityAvailable}
								/>
							</div>
						</div>
					</section>
				</main>
				<Analytics.ProductView
					data={{
						products: [
							{
								id: product.id,
								title: product.title,
								price: selectedVariant.price.amount,
								vendor: product.vendor,
								variantId: selectedVariant.id,
								variantTitle: selectedVariant.title,
								quantity: 1,
							},
						],
					}}
				/>
			</Container>
		</Layout>
	);
}

const PRODUCT_QUERY = `#graphql
query PostersKeycapsProduct($handle: String!) {
    product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        vendor
		seo {
			title
			description
        }
        variants(first: 1) {
            nodes {
                id
                title
                price {
                    amount
                    currencyCode
                }
                compareAtPrice {
                    amount
                    currencyCode
                }
                quantityAvailable
            }
        }
    }
}
`;
