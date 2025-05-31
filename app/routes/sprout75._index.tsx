import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import { Image, ImageProps, LightboxImage } from "~/components/elements/Image";
import { twJoin } from "tailwind-merge";
import { json, useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { Input } from "~/components/elements/Input";
import { Button, ButtonLink } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { sendShopifyAnalytics, useCart } from "@shopify/hydrogen-react";
import lightboxStyles from "yet-another-react-lightbox/styles.css";
import { Asteroid } from "~/assets/Asteroid";
import { InfoBubble } from "~/components/elements/InfoBubble";
import { socials } from "~/components/global/Footer";
import { SocialBlob } from "~/assets/SocialBlob";
import { MouseEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { CheckIcon } from "~/assets/icons/Check";
import { MinusIcon } from "~/assets/icons/Minus";
import { ArrowUpIcon } from "~/assets/icons/ArrowUp";
import { AnalyticsEvent, CartForm, OptimisticInput, ProductViewPayload, useAnalytics } from "@shopify/hydrogen";
import { useCartVisibility } from "~/components/global/Cart";
import { Result, usePrevious } from "~/lib/util";
import { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import Tracker from "@openreplay/tracker";
import { CartIcon } from "~/assets/icons/Cart";
import { TruckIcon } from "~/assets/icons/Truck";
import { ShoppingBagIcon } from "~/assets/icons/ShoppingBag";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import { withModalDelay } from "~/lib/ModalContext";
import { CartActions } from "~/routes/cart";
import { Video, VideoSequence } from "~/components/elements/Video";
import { ScrollLinkedImageSequence } from "~/components/anim/ScrollLinkedImageSequence";
import { TweakWordmark } from "~/assets/sprout75/TweakWordmark";
import { Keymap } from "~/assets/sprout75/Keymap";
import { Pointer } from "~/assets/sprout75/Pointer";
import { BrowseToTweak } from "~/assets/sprout75/BrowseToTweak";
import { BluetoothIcon } from "~/assets/icons/Bluetooth";
import { BatteryIcon } from "~/assets/icons/Battery";

const title = "sprout 75";
const description = "available now for $168 usd";

export const SPROUT_75_MERCHANDISE_ID = "gid://shopify/ProductVariant/45575282786531";
export const BSB_DESKPAD_MERCHANDISE_ID = "gid://shopify/ProductVariant/45729711849699";

export const SPROUT75_IMAGE = {
	src: "https://img.milktype.co/cdn-cgi/image/width=2000,format=auto/sprout75/Sprout75Image.png",
	alt: "a photo of the Sprout 75 mechanical keyboard. it's floating just above the ground at an angle on an orange-yellow background.",
};

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
	const { product } = await context.storefront.query(SPROUT75_PRODUCT_QUERY, {
		variables: {
			handle: "sprout-75-brown-sugar-boba",
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

	return json({
		productPayload,
		url: request.url,
		trackerProjectKey: context.env.OPENREPLAY_PROJECT_KEY,
		searchParams: Object.fromEntries(searchParams.entries()),
	});
}

export default function Sprout75() {
	const { productPayload, url, trackerProjectKey, searchParams } = useLoaderData<typeof loader>();
	const { publish, shop } = useAnalytics();

	const DeskpadModal = withModalDelay("DeskpadDiscount", 10_000, {}, true);

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
			<DeskpadModal />
			<Container
				as="main"
				className="w-full sm:w-full max-w-[96rem] lg:max-w-[96rem] px-0 sm:px-0 lg:px-0 overflow-x-visible flex flex-col">
				<section className="w-full px-8 md:pl-16 md:pr-12 flex flex-col sm:flex-row-reverse sm:items-center lg:max-w-screen-lg sm:mx-auto">
					<LightboxImage
						{...Renders.BoardSpin}
						className="aspect-[2/3] w-[15rem] xs:w-[22rem] md:w-[30rem]"
						button={{
							className: "self-end sm:self-start -mr-4 xs:-mr-8 sm:-mr-12 md:-mr-24",
						}}
					/>
					<div className=" -mt-8 sm:mt-36 flex flex-col gap-y-2 sm:gap-y-4 w-full xs:text-lg">
						<Sprout75Mark />
						<span className="text-cocoa-100 text-balance text-lg sm:text-xl xl:text-2xl font-medium">
							a mechanical keyboard inspired by our favorite drink — brown sugar boba.
						</span>
						<CheckoutForm />
					</div>
				</section>
				<section className="w-full flex flex-col xl:flex-row my-16 lg:my-24 lg:mx-auto xl:justify-between xl:gap-x-24">
					<div className="w-full my-4 lg:mx-auto pr-8 pl-0 xs:px-8 md:px-16 lg:px-12 scroll-px-8 md:scroll-px-16 xl:scroll-px-64 snap-x snap-mandatory flex flex-row lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-8 overflow-x-scroll lg:overflow-auto">
						{carouselImages.map((image) => (
							<LightboxImage
								key={image.src}
								className="xl:flex-1 h-44 xs:h-44 sm:h-56 lg:h-auto lg:w-full flex items-center justify-center bg-yogurt-60 rounded-2xl"
								{...image}></LightboxImage>
						))}
					</div>
				</section>
				<section className="xs:mt-18 lg:mt-0 flex flex-col lg:flex-row items-center sm:w-full sm:max-w-screen-2xl">
					<Image {...Renders.BoardTilt} className="w-full lg:w-1/2 lg:max-w-xl xl:max-w-3xl" />
					<div className="relative sm:-mt-12 lg:mt-0 gap-y-4 max-w-[30ch] md:max-w-[35ch] xl:max-w-[40ch] text-balance">
						<h2 className="mb-8 text-3xl sm:text-4xl xl:text-5xl font-medium text-cocoa-120 text-right md:text-center lg:text-left text-balance">
							<span className="italic">created for </span>
							<br />
							<span className="text-[#A8593F]">bubble tea</span>
							<span className="italic"> lovers</span>
						</h2>
						<ButtonLink
							external={true}
							url="https://youtu.be/c2XSvORM5wE"
							color="yogurt"
							className="py-4 text-shrub visited:text-blurple hover:text-yogurt-100 xs:text-xl font-medium w-full border-2 border-shrub visited:border-blurple hover:border-transparent">
							watch the intro video{"   "}→
						</ButtonLink>
					</div>
				</section>
				<section className="w-full mt-24 xs:mt-36 lg:mt-16 flex flex-col-reverse items-center lg:flex-row lg:items-end lg:justify-end px-8 xl:pl-0 xl:pr-32">
					<div className="mt-8 lg:mb-8 space-y-4 lg:flex-shrink-0 w-4/5 max-w-lg lg:max-w-[30ch] xl:max-w-[50ch] text-balance">
						<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
							included <span className="text-blurple">novelty</span> keycaps
						</h2>
						<p className="xs:text-lg xl:text-xl xs:font-medium">
							every board comes with a 6-pack of novelty keycaps, inspired by furry friends and cozy
							vibes.
						</p>
					</div>
					<div className="relative lg:self-end w-4/5 max-w-lg lg:w-full lg:max-w-xl 2xl:max-w-2xl lg:h-unset">
						<Image {...Photos.NoveltiesCloseUp} className="w-full rounded-3xl" />
					</div>
				</section>
				<section className="w-full mt-16 xs:mt-36 flex flex-col md:flex-row md:px-12 items-center justify-center">
					<div className="relative md:-ml-32">
						<ScrollLinkedImageSequence images={keycapSpinImages} className="w-full max-w-lg" />
					</div>
					<div className="flex flex-col items-center md:-ml-8 gap-y-4 max-w-lg md:max-w-[30ch] xl:max-w-[40ch] text-balance text-center lg:text-left">
						<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120 -mt-16 lg:mt-0">
							built with premium
							<wbr /> <span className="text-shrub">pbt keycaps</span>
						</h2>
						<p className="mx-4 xs:text-lg xl:text-xl xs:font-medium">
							deliciously soft kca profile keycaps, dye-sublimated for text that never fades, and 1.6mm
							thick pbt plastic that never shines.
						</p>
					</div>
				</section>
				<section className="mx-auto w-full mt-36 xs:mt-48 px-8 sm:px-12 md:px-16 grid grid-cols-1 gap-x-16 gap-y-20 md:gap-x-32 md:grid-cols-2 md:grid-rows-2 max-w-xl md:max-w-screen-xl">
					<div className="relative flex-col w-full">
						<Video
							{...Videos.RearWeightVid}
							className="w-full aspect-square rounded-3xl"
							autoPlay={true}
							loop={true}
							controls={false}
							muted={true}
							playsInline={true}
							poster={Photos.Photo2.src}
						/>
						<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
							<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
								polished mirror backpiece
							</h2>
							<p className="xs:text-lg xl:text-xl xs:font-medium">
								designed with high quality materials that sound and feel just as good as they look.
							</p>
						</div>
					</div>
					<div className="relative flex-col w-full">
						<Video
							{...Videos.SwitchVid}
							className="w-full aspect-square rounded-3xl"
							autoPlay={true}
							loop={true}
							controls={false}
							muted={true}
							playsInline={true}
							poster={Photos.Photo5.src}
						/>
						<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
							<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
								fully customizable
							</h2>
							<p className="xs:text-lg xl:text-xl xs:font-medium">
								with standard cherry style keycaps and switches, every part is waiting to be made yours.
							</p>
						</div>
					</div>
					<div className="relative flex-col w-full">
						<Video
							{...Videos.GasketMountVid}
							className="w-full aspect-square rounded-3xl"
							autoPlay={true}
							loop={true}
							controls={false}
							muted={true}
							playsInline={true}
							poster={Photos.Photo6.src}
						/>
						<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
							<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
								tuned for perfection
							</h2>
							<p className="xs:text-lg xl:text-xl xs:font-medium">
								aluminum case, maximum flex construction, and acoustic foam included by default, all for
								the ideal sound and feel.
							</p>
						</div>
					</div>
					<div className="relative flex-col w-full">
						<Video
							{...Videos.DeskpadVid}
							className="w-full aspect-square rounded-3xl"
							autoPlay={true}
							loop={true}
							controls={false}
							muted={true}
							playsInline={true}
							poster={Photos.Photo1.src}
						/>
						<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
							<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
								sweeten your setup
							</h2>
							<p className="xs:text-lg xl:text-xl xs:font-medium">
								with the matching <span className="text-[#A8593F]">brown sugar boba deskpad</span>,
								perfectly sized to fit all workspaces.
							</p>
						</div>
					</div>
				</section>
				<section className="lg:mt-12">
					<div className="flex flex-col-reverse md:flex-row items-center mx-auto max-w-xl md:max-w-screen-xl px-8 md:px-12">
						<div className="md:flex-grow-0 md:min-w-48 md:w-full md:flex md:items-center lg:justify-center">
							<ButtonLink
								url="#"
								color="shrub"
								className="-rotate-12 text-xl lg:text-2xl xl:text-3xl text-yogurt-100 md:py-6 lg:py-10 lg:px-8 md:-ml-1 -mt-2 md:mt-16"
								icon={<ArrowUpIcon className="w-4 lg:w-6 fill-yogurt-100" />}>
								order now
							</ButtonLink>
						</div>
						<div className="w-auto ml-auto flex-grow flex flex-row-reverse mb-5 xs:mt-20 max-w-screen-sm 2xl:max-w-screen-md">
							<div className="w-full relative">
								<LightboxImage
									{...Renders.DeskpadFull}
									className="w-full object-contain scroll-mt-72"
									id="deskpad"
								/>
								<Asteroid
									className="h-24 md:h-28 absolute top-4 sm:-top-4 md:top-8 -right-4 sm:-right-8 md:-right-4 rotate-12"
									asteroidClasses="fill-blurple h-full w-full">
									<span className="text-yogurt-100 text-sm md:text-base text-center font-semibold leading-4 md:leading-none text-wrap w-full mt-2 px-5">
										67.5x30 cm
									</span>
								</Asteroid>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full mt-32 lg:mt-20 flex flex-col items-center px-8 sm:px-0 md:px-16">
					<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120 text-center text-balance max-w-[20ch]">
						customize the <span className="text-nowrap italic text-[#A9593F]">boba knob</span> for any
						workflow
					</h2>
					<Video
						{...Videos.KnobSpinVid}
						className="w-full mt-8 aspect-square max-w-lg rounded-2xl"
						autoPlay={true}
						loop={true}
						controls={false}
						muted={true}
						playsInline={true}
					/>
					<Video
						{...Videos.KnobUseCases}
						className="w-full mt-8 aspect-video max-w-lg rounded-2xl"
						autoPlay={true}
						loop={true}
						controls={false}
						muted={true}
						playsInline={true}
					/>
					<span className="mt-8 text-xl text-cocoa-80 italic font-medium">configure with</span>
					<TweakWordmark className="w-full max-w-64" />
					<div className="mt-10 grid grid-cols-2 grid-rows-3 gap-4 w-full max-w-lg md:max-w-screen-lg">
						<div className="col-span-1 row-span-1 flex items-center justify-center aspect-square md:aspect-[2/1] bg-blurple rounded-xl">
							<span className="text-yogurt-100 xs:text-lg lg:text-xl font-medium text-center w-4/5 max-w-[30ch] text-balance">
								our simple to use, lightweight keyboard customization tool.
								<br className="hidden xs:block" />
								<br />
								powered by via
							</span>
						</div>
						<div className="col-span-1 row-span-1 flex items-center justify-center aspect-square md:aspect-[2/1] bg-[#F4B499] rounded-xl relative overflow-clip">
							<Keymap className="absolute top-0 md:top-unset md:bottom-0 left-0 h-full md:w-[120%] md:h-unset" />
						</div>
						<div className="col-span-2 row-span-1 flex flex-col gap-3 xs:gap-6 lg:gap-12 items-center justify-center bg-yogurt-60 rounded-xl">
							<span className="text-cocoa-100 xs:text-lg lg:text-xl font-medium text-center w-full sm:w-4/5 max-w-[30ch] text-balance">
								customize it with <span className="text-blurple">tweak</span>. from lighting to macros,
								we've got you covered.
							</span>
							<div className="w-4/5 grid grid-cols-3 grid-rows-2 md:grid-cols-6 md:grid-rows-1 gap-2 xs:gap-3 text-base lg:text-lg">
								<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
									basic
								</div>
								<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
									media
								</div>
								<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
									macro
								</div>
								<div className="relative flex items-center justify-center px-5 py-1 rounded-xl font-semibold bg-accent text-yogurt-100">
									layers
									<Pointer className="absolute -bottom-2 -right-1 w-7" />
								</div>
								<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
									special
								</div>
								<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
									lighting
								</div>
							</div>
						</div>
						<div className="col-span-1 row-span-1 flex flex-col pt-5 items-center bg-yogurt-60 rounded-xl relative overflow-clip">
							<span className="text-cocoa-100 text-xl lg:text-2xl font-medium text-center w-full sm:w-4/5 text-balance">
								no <span className="text-blurple italic">installation</span>.<br />
								no <span className="text-shrub">hassle</span>.
							</span>
							<BrowseToTweak className="absolute -bottom-12 xs:-bottom-6 -right-32 md:-bottom-20 md:-right-12 xl:-bottom-40 xl:-right-48 h-3/4 md:w-full md:h-unset xl:w-[120%]" />
						</div>
						<ButtonLink
							url="https://tweak.milktype.co"
							color="shrub"
							className="col-span-1 row-span-1 flex items-center justify-center aspect-square md:aspect-[2/1] rounded-xl">
							<span className="text-yogurt-100 text-xl lg:text-2xl font-medium text-center w-full sm:w-4/5 text-balance">
								open tweak in your browser ↗
							</span>
						</ButtonLink>
					</div>
				</section>
				<section className="w-full max-w-md sm:max-w-screen-lg mx-auto mt-32 xs:mt-40 xl:mt-24 pl-12 sm:pr-12 flex flex-col-reverse gap-x-12 md:gap-x-16 sm:flex-row sm:items-center sm:justify-center">
					<Image
						{...Renders.SwitchTransparent}
						className="aspect-square self-end sm:self-start w-60 h-60 max-w-sm xl:w-full xl:h-unset xl:aspect-square -mt-8 xs:-mt-8 sm:mt-0"
					/>
					<div className="space-y-4 lg:flex-shrink-0 max-w-[20ch] xs:max-w-[25ch] sm:max-w-[30ch] xl:max-w-[40ch] text-balance">
						<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">taro switches</h2>
						<p className="xs:text-lg xl:text-xl xs:font-medium">
							our custom designed <span className="text-blurple">taro switches</span> are fabulously
							lightweight and smooth for easy typing. they'll arrive pre-lubricated and perfectly tuned
							for your fingers.
						</p>
					</div>
				</section>
				<section className="mt-16 mx-auto px-6 md:px-8 lg:px-12 py-5 flex flex-col md:flex-row-reverse gap-y-9 md:gap-x-3 items-center w-4/5 max-w-screen-lg bg-yogurt-60 rounded-2xl">
					<div className="flex flex-row items-center gap-x-3 xl:gap-x-6">
						<Image {...Renders.SwitchTransparent2} className="aspect-square w-16 xs:w-20 xl:w-28" />
						<h3 className="text-xl xs:text-2xl xl:text-3xl font-semibold text-cocoa-100">spec sheet</h3>
					</div>
					<div className="w-full flex flex-row flex-wrap gap-3 md:gap-4 text-sm xs:text-base md:text-lg">
						<InfoBubble className="bg-yogurt-80">linear</InfoBubble>
						<InfoBubble className="bg-yogurt-80">55g | bottom-out</InfoBubble>
						<InfoBubble className="bg-yogurt-80">pre-lubed</InfoBubble>
						<InfoBubble className="bg-yogurt-80">3.5mm | travel</InfoBubble>
						<InfoBubble className="bg-yogurt-80">pom | body</InfoBubble>
						<InfoBubble className="bg-yogurt-80">13.6mm | stem</InfoBubble>
						<InfoBubble className="bg-yogurt-80">15mm | spring</InfoBubble>
					</div>
				</section>
				<section className="w-full mt-36 xs:mt-48 flex flex-col items-center px-8 sm:px-0 md:px-16">
					<h3 className="text-center text-shrub text-4xl font-semibold mb-8 sm:mb-16">
						sprout for <span className="text-blurple italic">gaming</span>
					</h3>
					<div className="mx-auto w-full grid grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 max-w-lg md:max-w-screen-lg">
						<LightboxImage
							{...Photos.SproutForGaming}
							button={{
								className: "col-span-full row-span-2 md:col-span-2 md:row-span-full",
							}}
							className="h-full w-full rounded-3xl"
						/>
						<div className="bg-blurple min-h-32 flex flex-col items-center justify-center col-span-1 row-span-1 rounded-3xl">
							<span className="inline-flex justify-end h-9 sm:h-11 text-yogurt-100 text-3xl sm:text-4xl italic tracking-wide">
								<span className="font-semibold">1000</span>hz
							</span>
							<span className="text-yogurt-100 text-base sm:text-lg font-medium">with usb receiver</span>
						</div>
						<div className="bg-shrub flex flex-col items-center justify-center col-span-1 row-span-1 rounded-3xl">
							<div className="h-9 sm:h-11 flex flex-row gap-x-1.5 sm:gap-x-3 items-center">
								<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
									<ArrowUpIcon className="w-3 sm:w-4 h-auto" />
								</div>
								<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
									<ArrowUpIcon className="w-3 sm:w-4 h-auto" />
								</div>
								<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
									<ArrowUpIcon className="w-3 sm:w-4 h-auto rotate-180" />
								</div>
								<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
									<ArrowUpIcon className="w-3 sm:w-4 h-auto rotate-180" />
								</div>
							</div>
							<span className="w-full px-1 sm:px-0 text-center text-yogurt-100 text-base sm:text-lg font-medium leading-tight">
								programmable macros
							</span>
						</div>
					</div>
					<p className="text-balance text-center text-cocoa-100 text-lg sm:text-xl font-medium max-w-lg md:max-w-[50ch] mx-auto mt-8 sm:mt-12">
						a 1000hz polling rate and buttery smooth switches mean pixel perfect actuation and zero fatigue
						during marathon sessions.
					</p>
				</section>
				<section className="w-full mt-24 xs:mt-36 flex flex-col items-center px-8 sm:px-0 md:px-16">
					<h3 className="text-center text-shrub text-4xl font-semibold mb-8 sm:mb-16">
						sprout for <span className="text-cherry italic">creation</span>
					</h3>
					<div className="mx-auto w-full grid grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 max-w-lg md:max-w-screen-lg">
						<LightboxImage
							{...Photos.SproutForCreation}
							button={{
								className: "col-span-full row-span-2 md:col-span-2 md:row-span-full",
							}}
							className="h-full w-full rounded-3xl"
						/>
						<div className="bg-cherry min-h-32 flex flex-row md:flex-row-reverse px-4 md:px-8 lg:px-12 gap-x-2 items-center justify-center col-span-1 row-span-1 rounded-3xl">
							<Image {...Renders.KnobTransparent} className="h-auto w-1/3" />
							<span className="w-full md:w-auto mr-1 sm:mr-2 text-yogurt-100 text-base sm:text-lg md:text-base lg:text-xl text-balance text-right font-medium !leading-snug">
								built for creative cloud, CAD, and more
							</span>
						</div>
						<div className="bg-blurple flex flex-col items-center justify-center gap-1.5 col-span-1 row-span-1 rounded-3xl">
							<BatteryIcon className="h-7 text-yogurt-100" />
							<span className="text-yogurt-100 text-base sm:text-lg md:text-base lg:text-xl text-balance text-center font-medium !leading-snug">
								a month of battery on a single charge
							</span>
						</div>
					</div>
					<p className="text-balance text-center text-cocoa-100 text-lg sm:text-xl font-medium max-w-lg md:max-w-[50ch] mx-auto mt-8 sm:mt-12">
						the programmable encoder knob lets you zoom timelines, scrub layers, and dial in brush size, all
						without ever leaving your keyboard.
					</p>
				</section>
				<section className="w-full mt-24 xs:mt-36 flex flex-col items-center px-8 sm:px-0 md:px-16">
					<h3 className="text-center text-shrub text-4xl font-semibold mb-8 sm:mb-16">
						sprout for <span className="text-sky italic">productivity</span>
					</h3>
					<div className="mx-auto w-full grid grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 max-w-lg md:max-w-screen-lg">
						<LightboxImage
							{...Photos.SproutForProductivity}
							button={{
								className: "col-span-full row-span-2 md:col-span-2 md:row-span-full",
							}}
							className="h-full w-full rounded-3xl"
						/>
						<div className="bg-shrub flex flex-col items-center justify-center gap-1.5 col-span-1 row-span-1 rounded-3xl">
							<BluetoothIcon className="h-7 text-yogurt-100" />
							<span className="text-yogurt-100 text-base sm:text-lg md:text-base lg:text-xl text-balance text-center font-medium !leading-snug">
								on-the-go ready
							</span>
						</div>
						<div className="bg-cherry flex flex-col items-center justify-center gap-y-1 sm:gap-y-2 col-span-1 row-span-1 rounded-3xl">
							<div className="h-9 sm:h-11 flex flex-row gap-x-1.5 sm:gap-x-3 items-center">
								<div className="flex items-center justify-center h-full px-2 sm:px-3 border-2 border-yogurt-100 rounded-xl text-yogurt-100">
									<span className="text-yogurt-100 font-medium text-lg sm:text-xl">ctrl</span>
								</div>
								<div className="flex items-center justify-center h-full px-2 sm:px-3 border-2 border-yogurt-100 rounded-xl text-yogurt-100">
									<span className="text-yogurt-100 font-medium text-lg sm:text-xl">shift</span>
								</div>
								<div className="flex items-center justify-center h-full px-2 sm:px-3 border-2 border-yogurt-100 rounded-xl text-yogurt-100">
									<span className="text-yogurt-100 font-medium text-lg sm:text-xl">v</span>
								</div>
							</div>
							<span className="w-4/5 px-1 sm:px-0 text-balance text-center text-yogurt-100 text-base sm:text-lg font-medium !leading-snug">
								custom keybinds for every key
							</span>
						</div>
					</div>
					<p className="text-balance text-center text-cocoa-100 text-lg sm:text-xl font-medium max-w-lg md:max-w-[50ch] mx-auto mt-8 sm:mt-12">
						map every key to your heart's desire with our web-based configuration tool,{" "}
						<a href="https://tweak.milktype.co" className="text-accent underline hover:no-underline">
							tweak
						</a>
						.
					</p>
				</section>
				<section className="mt-20 xl:mt-32 px-7 md:px-16 w-full lg:mx-auto lg:max-w-screen-lg">
					<h2 className="text-2xl xs:text-3xl font-medium mb-4 xs:mb-8">specs</h2>
					<div className="flex flex-row flex-wrap gap-3 md:gap-4 text-sm xs:text-base md:text-lg">
						<InfoBubble>75% | layout</InfoBubble>
						<InfoBubble>gasket | mount</InfoBubble>
						<InfoBubble>full aluminum | case</InfoBubble>
						<InfoBubble>silver pvd | weight (4lbs)</InfoBubble>
						<InfoBubble>silver anodized | volume knob</InfoBubble>
						<InfoBubble>plate mount | stabilizers</InfoBubble>
						<InfoBubble>bluetooth | enabled</InfoBubble>
						<InfoBubble>2.4ghz | usb receiver (1000hz)</InfoBubble>
						<InfoBubble>usb-c | charging</InfoBubble>
						<InfoBubble>mac/win | support</InfoBubble>
						<InfoBubble>backlight | effects</InfoBubble>
						<InfoBubble>south-facing | pcb</InfoBubble>
						<InfoBubble>5-pin hotswap | switches</InfoBubble>
						<InfoBubble>6 week | battery life</InfoBubble>
						<InfoBubble>qmk | compatible</InfoBubble>
						<InfoBubble>1.5mm pbt | keycaps</InfoBubble>
						<InfoBubble>kca | profile keycaps</InfoBubble>
					</div>
				</section>
				<section className="@container flex flex-col mt-28 mb-16 px-8 md:px-16 xs:text-lg md:text-xl font-medium lg:mx-auto lg:max-w-screen-lg lg:w-full lg:flex-row lg:justify-between">
					<div className="flex flex-col gap-y-8 text-cocoa-120 font-medium xs:text-lg">
						<ButtonLink
							url="#"
							color="shrub"
							className="text-yogurt-100 py-3 -ml-1"
							icon={<ArrowUpIcon className="w-4 fill-yogurt-100" />}>
							order now
						</ButtonLink>
						<NotificationsSignup fetcherKey="footer" cta="get updates at" />
						<div className="flex flex-row w-full gap-x-3 xs:gap-x-4 items-center">
							<span>or our socials</span>
							{socials.map((social, i) => (
								<a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="relative h-12 w-12 group transition-transform focus-visible:outline-none focus-visible:scale-125">
									<SocialBlob
										className={twJoin(
											"h-12 w-12 absolute transition-transform ease-in-out duration-700 rotate-0 group-focus-visible:fill-accent",
											"motion-safe:group-focus-visible:rotate-90 motion-safe:group-hover:rotate-90 motion-reduce:group-hover:fill-accent",
											social.color,
										)}
									/>
									<social.icon className="absolute ease-in-out duration-700 transition-transform text-yogurt-100 left-2 top-2 h-8 w-8 motion-safe:-rotate-12 group-focus-visible:motion-safe:rotate-12 group-hover:motion-safe:rotate-12" />
								</a>
							))}
						</div>
					</div>
					<LightboxImage
						{...Renders.BoardFloat}
						button={{ className: "lg:w-1/2 lg:min-h-96" }}
						className="w-full md:px-12 lg:px-0 mt-6 lg:mt-0 aspect-[5/3]"
					/>
				</section>
			</Container>
		</Layout>
	);
}

const Sprout75Mark = () => (
	<h1 className="-ml-px text-4xl xs:text-5xl md:text-7xl font-semibold text-shrub">
		sprout<span className="ml-1 align-sub text-3xl xs:text-4xl md:text-6xl font-[728] text-blurple">75</span>
	</h1>
);

function NotificationsSignup({ fetcherKey, cta }: { fetcherKey: string; cta: string }) {
	const fetcher = useFetcher({ key: fetcherKey });
	const { response: { customerCreate: { customer = null } = {} } = {}, error = null } =
		(fetcher.data as Result<{ customerCreate: { customer: Pick<Customer, "email"> | null } }>) ?? {};
	const submitted = !!customer;
	const email = customer?.email || fetcher.formData?.get("email")?.toString() || "";

	return (
		<fetcher.Form
			action="/signup"
			method="POST"
			id="newsletter-signup"
			className="flex flex-col @xs:flex-row gap-2 xs:gap-3 items-start @xs:items-center justify-start rounded-2xl transition-colors delay-300 duration-700">
			<span className="font-medium text-cocoa-120">
				{!submitted ? (
					<>
						{cta}
						<span className="@xs:hidden">:</span>
					</>
				) : (
					<>
						thanks for signing up! we’ll keep you updated
						{email ? (
							<>
								{" "}
								at <span className="font-semibold">{email}</span>
							</>
						) : null}
						.
					</>
				)}
			</span>
			{submitted ? null : (
				<>
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<div className="flex flex-row">
						<Input
							type="email"
							name="email"
							placeholder="example@gmail.com"
							className="w-[15ch] h-auto -mb-px xs:-mb-[3px] p-0 text-cocoa-100 [font-size:inherit] focus-visible:ring-0"
						/>
						<Button
							color={submitted ? "shrub" : "accent"}
							icon={<ArrowRightIcon className="w-4 fill-yogurt-100" />}
							className={twJoin(
								"ml-3 xs:ml-4 h-8 w-8 p-2 rounded-lg mt-1",
								submitted && "bg-shrub cursor-default pointer-events-none",
							)}
							disabled={fetcher.state !== "idle" || submitted}
							type="submit"
							onClick={(ev) => {
								const email = ev.currentTarget.form?.email.value;

								fetcher.submit(ev.currentTarget.form);

								if (email) {
									void sendShopifyAnalytics({
										eventName: "custom_newsletter_signup",
										payload: {
											// @ts-expect-error — custom payload
											email,
										},
									});
								}
							}}
						/>
					</div>
				</>
			)}
		</fetcher.Form>
	);
}

function CheckoutForm() {
	const { lines } = useCart();
	const { setCartVisible } = useCartVisibility();
	const navigation = useNavigation();
	const [justAddedDeskpad, setJustAddedDeskpad] = useState(false);
	const deskpadRef = useRef<HTMLDivElement>(null);

	const deskpadInCart = lines?.some((line) => line?.merchandise?.id === BSB_DESKPAD_MERCHANDISE_ID) || false;

	const fetcher = useFetcher({ key: "checkout" });
	const previousFetcherState = usePrevious(fetcher.state);

	useEffect(() => {
		if (fetcher.state === "idle" && previousFetcherState === "loading") {
			setCartVisible(true);
		}
	}, [fetcher.state]);

	const handleDeskpadAdd: MouseEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		setJustAddedDeskpad(true);
		setTimeout(() => setJustAddedDeskpad(false), 2000);

		fetcher.submit(
			{
				[CartForm.INPUT_NAME]: JSON.stringify({
					action: CartActions.LinesAdd,
					inputs: {
						lines: [{ merchandiseId: BSB_DESKPAD_MERCHANDISE_ID, quantity: 1 }],
					},
				}),
			},
			{ method: "POST", action: "/cart", preventScrollReset: true },
		);
	};

	return (
		<CartForm
			route="/cart"
			action={CartActions.LinesAdd}
			inputs={{ lines: [{ merchandiseId: SPROUT_75_MERCHANDISE_ID, quantity: 1 }] }}
			fetcherKey="checkout">
			{(fetcher) => (
				<>
					<OptimisticInput id={SPROUT_75_MERCHANDISE_ID} data={{}} />
					<div
						ref={deskpadRef}
						className="relative group w-full xs:w-3/4 sm:w-full rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-accent"
						tabIndex={0}
						aria-label={deskpadInCart ? "Remove desk pad from cart" : "Add desk pad to cart"}>
						<LightboxImage
							{...Renders.DeskpadFull}
							className="w-full object-contain"
							button={{
								"onClick": handleDeskpadAdd,
								"aria-label": deskpadInCart ? "Remove desk pad from cart" : "Add desk pad to cart",
								"tabIndex": -1,
							}}
						/>
						<Button
							color={deskpadInCart ? "lilac" : "blurple"}
							onClick={handleDeskpadAdd}
							hoverRef={deskpadRef}
							className="absolute bottom-[10%] sm:bottom-[5%] md:bottom-[10%] -right-2 sm:-right-[20%] md:-right-[15%] rotate-[3deg] rounded-full py-2 pl-4 pr-5 flex flex-row gap-0 items-center justify-center text-yogurt-100 text-sm xs:text-base lg:text-lg xs:font-medium"
							disabled={navigation.state !== "idle"}
							aria-label={deskpadInCart ? "Remove desk pad from cart" : "Add desk pad to cart"}>
							{!deskpadInCart ? (
								<CartIcon className="w-4 xs:w-5 h-auto mr-3" />
							) : (
								<>
									<CheckIcon
										className={twJoin(
											"w-[1.375rem] xs:w-6 lg:w-7 h-auto",
											!justAddedDeskpad && "group-hover:hidden",
										)}
									/>
									<MinusIcon
										className={twJoin(
											"w-[1.375rem] xs:w-6 lg:w-7 h-auto hidden",
											!justAddedDeskpad && "group-hover:block",
										)}
									/>
								</>
							)}
							<span>
								{fetcher.state === "submitting" ? (
									"loading..."
								) : (
									<>
										matching deskpad ⋅ $12{" "}
										<span className="text-yogurt-60 opacity-75 line-through">$18</span>
									</>
								)}
							</span>
						</Button>
					</div>
					<div className="flex flex-row mb-4 gap-2 sm:gap-3 items-center text-cocoa-80 text-sm sm:text-lg xl:text-xl font-medium">
						<TruckIcon className="w-4 sm:w-5 xl:w-6 h-auto" />
						<span>free shipping in the us</span>
					</div>
					<div className="flex flex-row mb-4 gap-2 sm:gap-3 items-center text-cocoa-80 text-sm sm:text-lg xl:text-xl font-medium">
						<ShoppingBagIcon className="w-4 sm:w-5 xl:w-6 h-auto" />
						<span>save on a deskpad when you bundle</span>
					</div>
					<Button
						type="submit"
						className="w-full py-4 text-yogurt-100 xs:text-lg xs:font-medium lg:text-xl"
						color="shrub"
						rainbow={false}
						disabled={navigation.state !== "idle"}>
						{fetcher.state === "submitting" ? "loading..." : "add to cart ⋅ $168 usd"}
					</Button>
				</>
			)}
		</CartForm>
	);
}

const Renders = {
	BoardSpin: {
		src: "sprout75/BoardSpin.png",
		alt: "a photo of the Sprout 75 mechanical keyboard. it's placed vertically with just one corner on the ground. it's a cream-colored aluminum keyboard showcasing the brown sugar boba keycaps.",
	},
	NoveltiesTransparent: {
		src: "sprout75/NoveltiesTransparent.png",
		alt: "a close-up of the right side of Sprout 75. it's got a silver aluminum knob at the top right corner, shaped like a bubble tea cup. in the macro column, you can see novelties depicting cats and desserts.",
	},
	SwitchTransparent: {
		src: "sprout75/SwitchTransparent.png",
		alt: "the Taro linear switch. it has a light purple housing with a subtle cream-colored stem.",
	},
	SwitchTransparent2: {
		src: "sprout75/SwitchTransparent2.png",
		alt: "a bird's-eye view of the Taro linear switch. it has a light purple housing with a subtle cream-colored stem.",
	},
	KnobTransparent: {
		src: "sprout75/KnobTransparent.png",
		alt: "a silver aluminum knob. it's shaped like a bubble tea cup and has a straw sticking out of the top.",
	},
	TweakPreview: {
		src: "sprout75/TweakPreview.png",
		alt: "a preview of Tweak, the configuration tool for the sprout 75. the bottom left corner of a keyboard layout is displayed, with the 'alt' key highlighted and a cursor over it.",
	},
	DongleCloseUp: {
		src: "sprout75/DongleCloseUp.png",
		alt: "a very close-up shot of the back of Sprout 75. there's a 2.4ghz usb dongle leaning against the board, next to a switch for toggling between wireless and wired.",
	},
	NoveltySwap: {
		src: "sprout75/NoveltySwap.png",
		alt: "the top right of Sprout 75. there's two keycaps floating above an exposed switch. one is the 'del' keycap, while the other is a novelty depicting a cup of bubble tea.",
	},
	DeskpadCloseUp: {
		src: "sprout75/DeskmatCloseUp.png",
		alt: "a close-up shot of the left side of the brown sugar boba deskpad. towards the right edge you can see Sprout 75 board on it.",
	},
	DeskpadFull: {
		src: "sprout75/DeskmatFull.png",
		alt: "the brown sugar boba deskpad. it depicts cats hanging out at a boba café.",
		big: true,
	},
	BoardTilt: {
		src: "sprout75/BoardTilt.png",
		alt: "a photo of the Sprout 75 mechanical keyboard. it's floating just above the ground at an angle.",
	},
	BoardFloat: {
		src: "sprout75/BoardFloat.png",
		alt: "a shot of Sprout 75, at an angle from above so it looks like it's floating.",
	},
} satisfies Record<string, ImageProps>;

const Photos = {
	Photo1: {
		src: "sprout75/photos/Photo1.png",
		alt: "an angled birds-eye shot of Sprout 75 laying on the brown sugar boba deskpad. towards the upper edge of the image there's a white mug with a grid pattern, and a wooden to-do organizer with a card in it.",
	},
	Photo2: {
		src: "sprout75/photos/Photo2.png",
		alt: "an angled birds-eye view of the backside of Sprout 75. it has a reflective silver aluminum weight with a circle, a triangle, and a pentagon etched into the middle.",
	},
	Photo3: {
		src: "sprout75/photos/Photo3.png",
		alt: "a close-up shot of the top right corner of Sprout 75. the silver knob is in focus, in the shape of a bubble tea cup with a straw sticking out of the top.",
	},
	Photo4: {
		src: "sprout75/photos/Photo4.png",
		alt: "an angled birds-eye shot of the right side of Sprout 75. it's on aw white surface, and scattered around the board are a few keycaps — cmd, pgup, end, enter, and pgdn.",
	},
	Photo5: {
		src: "sprout75/photos/Photo5.png",
		alt: "a close-up shot of the Taro switches on Sprout 75. they have a light purple housing with a subtle cream-colored stem, and the milktype logo is etched into the housing.",
	},
	Photo6: {
		src: "sprout75/photos/Photo6.png",
		alt: "a close-up shot of the right side of the back of Sprout 75. there's a silver aluminum toggle for switching between wireless and wired. next to it, there's a usb-c port.",
	},
	NoveltiesCloseUp: {
		src: "sprout75/photos/NoveltiesCloseUp.png",
		alt: "a close-up shot of the right side of Sprout 75. the enter key depicts a cat spilling boba. in the macro column, you can see novelties depicting cats and desserts.",
	},
	SproutForGaming: {
		src: "sprout75/photos/SproutForGaming.png",
		alt: "a desk setup with Sprout 75 next to a white vertical mouse on the brown sugar boba deskpad.",
	},
	SproutForCreation: {
		src: "sprout75/photos/SproutForCreation.png",
		alt: "an angled birds-eye shot of Sprout 75 laying on the brown sugar boba deskpad. towards the upper edge of the image there's a notepad with a pen placed on it, to the side of the keyboard there's a gold screw tray, and just out of focus in the foreground there are a few plants.",
	},
	SproutForProductivity: {
		src: "sprout75/photos/SproutForProductivity.png",
		alt: "a close-up of the Sprout 75 knob, also showing the keys next to and below it. to the side, cut off, is a cup of bubble tea.",
	},
} satisfies Record<string, ImageProps>;

const Videos = {
	DeskpadVid: {
		src: "sprout75/videos/DeskpadVid.mp4",
		alt: "a video of the brown sugar boba deskpad. it depicts cats hanging out at a boba café.",
	},
	NoveltiesVid: {
		src: "sprout75/videos/NoveltiesVid.mp4",
		alt: "a video of the Sprout 75 mechanical keyboard. it shows the novelty enter keycap depicting a cat spilling boba.",
	},
	RearWeightVid: {
		src: "sprout75/videos/RearWeightVid.mp4",
		alt: "a video of the back of Sprout 75. it shows the aluminum weight with a circle, a triangle, and a pentagon etched into the middle.",
	},
	SwitchVid: {
		src: "sprout75/videos/SwitchVid.mp4",
		alt: "a video showing the Taro linear switch installed in a board. it has a light purple housing with a subtle cream-colored stem.",
	},
	GasketMountVid: {
		src: "sprout75/videos/GasketMountVid.mp4",
		alt: "a video showing the flex construction of the keyboard. keys are pressed, and the plate flexes downwards.",
	},
	KnobSpinVid: {
		src: "sprout75/videos/KnobSpinVid.mp4",
		alt: "a video animation. various keys are pressed on the keyboard, the camera zooms in on the knob spinning, then zooms back out.",
	},
	KnobUseCases: {
		src: "sprout75/videos/KnobUseCasesVid.mp4",
		alt: "a series of clips depicting various use cases for the knob; undoing/redoing, adjusting volume, switching between apps, and zooming.",
	},
} satisfies Record<string, ImageProps>;

const carouselImages = [Photos.Photo1, Photos.Photo2, Photos.Photo3, Photos.Photo4, Photos.Photo5, Photos.Photo6];
const keycapSpinImages = Array.from({ length: 90 }, (_, i) => ({
	src: `sprout75/keycap-spin/keycap-spin${(i + 1).toString().padStart(4, "0")}.webp`,
	alt: "an esc keycap spinning",
}));

const SPROUT75_PRODUCT_QUERY = `#graphql
query Sprout75Product($handle: String!) {
    product(handle: $handle) {
        id
        title
        vendor
        variants(first: 1) {
            nodes {
                id
                title
                price {
                    amount
                }
            }
        }
    }
}
`;
