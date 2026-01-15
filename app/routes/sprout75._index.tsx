import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import { useLoaderData } from "react-router";
import { AnalyticsEvent, ProductViewPayload, useAnalytics } from "@shopify/hydrogen";
import lightboxStyles from "yet-another-react-lightbox/styles.css?url";
import { useEffect, useMemo } from "react";
import { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import Tracker from "@openreplay/tracker";
import { withModalDelay } from "~/lib/ModalContext";
import { HeroSection } from "~/components/sprout75/HeroSection";
import { PhotoCarousel } from "~/components/sprout75/PhotoCarousel";
import { IntroSection } from "~/components/sprout75/IntroSection";
import { NoveltiesSection } from "~/components/sprout75/NoveltiesSection";
import { KeycapsSection } from "~/components/sprout75/KeycapsSection";
import { FeatureGrid } from "~/components/sprout75/FeatureGrid";
import { DeskpadCallout } from "~/components/sprout75/DeskpadCallout";
import { TweakSection } from "~/components/sprout75/TweakSection";
import { TaroSwitchesSection } from "~/components/sprout75/TaroSwitchesSection";
import { UseCaseSections } from "~/components/sprout75/UseCaseSections";
import { SpecsSection } from "~/components/sprout75/SpecsSection";
import { FooterSection } from "~/components/sprout75/FooterSection";
import {
	title,
	description,
	SPROUT75_IMAGE,
	SPROUT75_PRODUCT_QUERY,
	BSB_DESKPAD_MERCHANDISE_ID,
} from "~/components/sprout75/constants";
import { EmailConversionPopover } from "~/components/sprout75/EmailConversionPopover";

export const meta = () => [
	{
		title,
	},
	{
		name: "description",
		content: description,
	},
	{
		property: "og:title",
		content: title,
	},
	{
		property: "og:description",
		content: description,
	},
	{
		property: "og:url",
		content: "https://milktype.co/sprout75",
	},
	{
		property: "og:image",
		content: SPROUT75_IMAGE.src,
	},
	{
		property: "twitter:image",
		content: SPROUT75_IMAGE.src,
	},
];

export const links = () => [{ rel: "stylesheet", href: lightboxStyles }];

export async function loader({ request, context }: LoaderFunctionArgs) {
	const { product, deskpad } = await context.storefront.query(SPROUT75_PRODUCT_QUERY, {
		variables: {
			handle: "sprout-75-brown-sugar-boba",
			deskpadId: BSB_DESKPAD_MERCHANDISE_ID,
		},
	});

	const { searchParams } = new URL(request.url);

	if (!product?.id) {
		throw new Response(null, { status: 404 });
	}

	const productPayload: ProductViewPayload["products"][number] = {
		id: product.id,
		title: product.title,
		price: product.variants.nodes[0].price.amount,
		vendor: product.vendor,
		variantId: product.variants.nodes[0].id,
		variantTitle: product.variants.nodes[0].title,
		quantity: 1,
	};

	return {
		productPayload,
		url: request.url,
		trackerProjectKey: context.env.OPENREPLAY_PROJECT_KEY,
		searchParams: Object.fromEntries(searchParams.entries()),
		availableForSale: product.variants.nodes[0].availableForSale ?? true,
		deskpadAvailableForSale: deskpad?.availableForSale ?? true,
	};
}

export default function Sprout75() {
	const { productPayload, url, trackerProjectKey, searchParams, availableForSale, deskpadAvailableForSale } =
		useLoaderData<typeof loader>();
	const { publish, shop } = useAnalytics();

	const DeskpadModal = withModalDelay("DeskpadDiscount", 30_000, {}, true);

	const tracker = useMemo(() => new Tracker({ projectKey: trackerProjectKey }), [trackerProjectKey]);

	useEffect(() => {
		void tracker.start({
			metadata: {
				aud: searchParams["aud"],
				utm_source: searchParams["utm_source"],
				utm_source_platform: searchParams["utm_source_platform"],
				utm_campaign: searchParams["utm_campaign"],
				utm_content: searchParams["utm_content"],
			},
		});
		publish(AnalyticsEvent.PRODUCT_VIEWED, { products: [productPayload], shop, url });
	}, []);

	return (
		<Layout footer={false}>
			<EmailConversionPopover />
			<DeskpadModal />
			<Container
				as="main"
				className="w-full sm:w-full max-w-[96rem] lg:max-w-[96rem] px-0 sm:px-0 lg:px-0 overflow-x-visible flex flex-col">
				<HeroSection availableForSale={availableForSale} deskpadAvailableForSale={deskpadAvailableForSale} />
				<PhotoCarousel />
				<IntroSection />
				<NoveltiesSection />
				<KeycapsSection />
				<FeatureGrid />
				<DeskpadCallout />
				<TweakSection />
				<TaroSwitchesSection />
				<UseCaseSections />
				<SpecsSection />
				<FooterSection />
			</Container>
		</Layout>
	);
}
