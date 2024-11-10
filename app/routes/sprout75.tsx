import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@shopify/remix-oxygen";
import { Image, ImageProps, LightboxImage } from "~/components/elements/Image";
import { twJoin, twMerge } from "tailwind-merge";
import { json, useFetcher, useLoaderData, useNavigation, useActionData, Form } from "@remix-run/react";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { sendShopifyAnalytics, useCart } from "@shopify/hydrogen-react";
import { Splat } from "~/assets/Splat";
import lightboxStyles from "yet-another-react-lightbox/styles.css";
import { Asteroid } from "~/assets/Asteroid";
import { InfoBubble } from "~/components/elements/InfoBubble";
import { socials } from "~/components/global/Footer";
import { SocialBlob } from "~/assets/SocialBlob";
import { useEffect, useState } from "react";

const title = "sprout 75";
const description = "available for pre-order nov 12 &#127793;";

export const SPROUT75_IMAGE = {
	src: "https://img.milktype.co/cdn-cgi/image/width=2000,format=auto/sprout75/Sprout75Image.png",
	alt: "a photo of the Sprout 75 mechanical keyboard. it's floating just above the ground at an angle on an orange-yellow background.",
};

export const meta: MetaFunction = () => [
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

export async function loader({ context }: LoaderFunctionArgs) {
	const RESERVATION_HANDLE = "sprout-75-reservation";
	const { product } = await context.storefront.query(RESERVATION_QUERY, {
		variables: {
			handle: RESERVATION_HANDLE,
		},
	});

	if (!product?.id || !product?.variants?.nodes?.[0]?.id) {
		throw new Response(null, { status: 404 });
	}

	return json({
		variantId: product.variants.nodes[0].id,
	});
}

export async function action({ request, context }: ActionFunctionArgs) {
	const fd = await request.formData();
	if (fd.get("action") !== "cartCreate") return null;
	const variantId = fd.get("variantId");
	if (!variantId || typeof variantId !== "string") return null;
	const { cartCreate } = await context.storefront.mutate(CART_CREATE_MUTATION, { variables: { variantId } });
	const checkoutUrl = cartCreate?.cart?.checkoutUrl;
	if (checkoutUrl) return json({ checkoutUrl });
	return json({ checkoutUrl: null });
}

export default function Sprout75() {
	const { variantId } = useLoaderData<typeof loader>();

	return (
		<Layout footer={false}>
			<Container
				as="main"
				className="w-full sm:w-full px-0 sm:px-0 lg:px-0 lg:max-w-unset overflow-x-visible flex flex-col">
				<section className="w-full px-8 md:px-16 flex flex-col lg:flex-row-reverse lg:items-center lg:max-w-screen-lg lg:mx-auto">
					<Image
						{...Images.BoardSpin}
						className="self-end aspect-square w-[25rem] xs:w-[30rem] sm:w-[35rem] lg:w-[40rem] -mr-28"
					/>
					<div className="@container -mt-12 sm:-mt-20 lg:mt-0 flex flex-col gap-y-2 lg:gap-y-4 w-full xs:text-lg">
						<Sprout75Mark />
						<span className="font-medium lg:mt-12">pre-order available on nov 12</span>
						<NotificationsSignup fetcherKey="header" cta="get notified at" />
					</div>
				</section>
				<section className="mt-28 xs:mt-36 lg:mt-0 pr-8 flex flex-col lg:flex-row lg:gap-x-20 lg:items-center lg:w-full lg:max-w-screen-2xl lg:mr-auto">
					<Image
						{...Images.NoveltiesTransparent}
						className="w-5/6 md:w-2/3 lg:w-1/2 lg:max-w-xl xl:max-w-3xl aspect-square"
					/>
					<div className="relative -mt-4 xs:-mt-12 md:-mt-48 lg:-mt-0 xl:mt-20 space-y-4 self-end lg:self-center lg:flex-shrink-0 max-w-[20ch] xs:max-w-[30ch] md:max-w-[35ch] xl:max-w-[40ch] text-balance">
						<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
							for <span className="text-[#A8593F]">boba</span> lovers
						</h2>
						<p className="xs:text-lg xl:text-xl xs:font-medium">
							sprout 75 launches in our signature <span className="text-[#9E7C6B]">cream beige</span> with{" "}
							<span className="text-[#A8593F]">brown sugar boba</span> keycaps inspired by our favorite
							drink. with included novelties and mac/win keycaps, there's something for everyone.
						</p>
					</div>
				</section>
				<section className="mt-28 xs:mt-36 md:mt-56 xl:mt-36 2xl:mt-0 pl-8 md:pl-16 md:pr-8 lg:px-16 flex flex-col sm:flex-row lg:items-center sm:justify-between xl:justify-end lg:w-full lg:max-w-screen-lg lg:mx-auto 2xl:mr-24">
					<div className="space-y-4 lg:flex-shrink-0 max-w-[20ch] xs:max-w-[25ch] sm:max-w-[30ch] xl:max-w-[40ch] text-balance">
						<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">turn it up</h2>
						<p className="xs:text-lg xl:text-xl xs:font-medium">
							or down with the exclusive <span className="text-[#7B7673]">silver boba knob</span>,
							included for free if you pre-order on kickstarter. standard volume knob also included.
						</p>
					</div>
					<div className="relative self-end w-80 h-80 xl:w-full xl:max-w-xl 2xl:max-w-2xl xl:h-unset xl:aspect-square -mt-8 xs:-mt-20 sm:mt-0">
						<Image {...Images.KnobTransparent} className="aspect-square h-full" />
						<Splat
							className="h-36 xl:h-56 2xl:h-64 absolute bottom-4 xl:bottom-16 2xl:bottom-24 -left-4 xl:left-unset xl:-right-4"
							splatClasses="fill-accent h-full w-full">
							<span className="text-yogurt-100 text-xl xl:text-2xl 2xl:text-3xl text-center font-semibold rotate-[24deg]">
								kickstarter
								<br />
								exclusive
							</span>
						</Splat>
					</div>
				</section>
				<section className="mt-28 px-8 sm:px-12 md:px-16 flex flex-col lg:flex-row lg:justify-between lg:max-w-screen-lg lg:mx-auto lg:w-full">
					<div className="w-36 xs:w-52 sm:w-60 md:w-72 lg:w-60 self-end lg:self-auto">
						<Image
							{...Images.TweakPreview}
							className="w-full mb-8 aspect-square rounded-3xl overflow-hidden"
						/>
						<h3 className="mb-4 text-xl xs:text-2xl xl:text-3xl font-medium">
							make it <span className="text-accent">yours</span>
						</h3>
						<p className="xs:text-lg xl:text-xl xs:font-medium text-balance">
							{/* todo: change link */}
							configure keybinds and settings with <span className="text-accent">milktype tweak</span>,
							our lightweight design tool.
						</p>
					</div>
					<div className="w-36 xs:w-52 sm:w-60 md:w-72 lg:w-60 -mt-16 lg:mt-48">
						<Image
							{...Images.DongleCloseUp}
							className="w-full mb-8 aspect-square rounded-3xl overflow-hidden"
						/>
						<h3 className="mb-4 text-xl xs:text-2xl xl:text-3xl font-medium">drop the wire</h3>
						<p className="xs:text-lg xl:text-xl xs:font-medium text-balance">
							with bluetooth and usb wireless, and a battery that lasts for 6 weeks.
						</p>
					</div>
					<div className="w-36 xs:w-52 sm:w-60 md:w-72 lg:w-60 -mt-16 self-end lg:self-auto lg:mt-96">
						<Image
							{...Images.NoveltySwap}
							className="w-full mb-8 aspect-square rounded-3xl overflow-hidden"
						/>
						<h3 className="mb-4 text-xl xs:text-2xl xl:text-3xl font-medium">switch it up</h3>
						<p className="xs:text-lg xl:text-xl xs:font-medium text-balance">
							with hotswap compatibility and our taro switches, designed for a light, buttery smooth
							typing experience.
						</p>
					</div>
				</section>
				<section className="mt-28 lg:mt-40 flex flex-col lg:flex-row-reverse xl:pl-16 2xl:pl-32">
					<div className="lg:w-auto lg:flex lg:flex-col lg:items-end xl:w-full xl:flex-grow">
						<Image
							{...Images.DeskpadCloseUp}
							className="w-11/12 xs:w-3/4 lg:w-full 2xl:w-[34rem] max-w-lg lg:max-w-3xl xl:max-w-xl xs:mb-8 aspect-square ml-auto lg:ml-0"
						/>
						<div className="w-full xl:w-5/6 lg:max-w-3xl xl:max-w-xl text-cocoa-120 self-end 2xl:self-start pl-10 pr-8 mt-12 2xl:-mt-2 3xl:-mt-32 mx-auto 2xl:mr-0 2xl:ml-[5%] hidden lg:block rounded-2xl xl:py-16 xl:border-4 xl:border-accent">
							<h2 className="mb-5 text-2xl xs:text-3xl xl:text-4xl font-medium inline-block">
								get a free deskpad
							</h2>
							<p className="xs:text-lg xs:font-medium xl:text-xl max-w-[40ch] text-balance 2xl:w-fit">
								with your order if you put down $1 to reserve your spot right now! your order will be
								the first to ship, and you’ll get access to our discord server for sneak peeks and
								behind-the-scenes content.
							</p>
							<BuyNowButton variantId={variantId} />
						</div>
					</div>
					<div className="flex flex-col lg:flex-grow max-w-screen-sm 2xl:max-w-screen-md">
						<div className="w-full lg:w-auto flex flex-col mb-5 xs:mt-20 gap-y-6">
							<div className="w-4/5 xs:w-2/3 lg:w-3/4 pl-8 sm:pl-12 md:pl-16 xs:-mt-16 sm:-mt-24 md:-mt-40 lg:mt-32">
								<h2 className="mb-5 text-2xl xs:text-3xl xl:text-4xl font-medium">
									sweeten your setup
								</h2>
								<p className="xs:text-lg xs:font-medium xl:text-xl max-w-[40ch] text-balance">
									with the matching <span className="text-[#A8593F]">brown sugar boba deskpad</span>,
									perfectly sized to fit all workspaces.
								</p>
							</div>
							<div className="w-full relative">
								<LightboxImage
									{...Images.DeskpadFull}
									className="w-full object-contain scroll-mt-72"
									id="deskpad"
								/>
								<Asteroid
									className="h-24 xs:h-32 absolute top-0 right-0 rotate-12"
									asteroidClasses="fill-blurple h-full w-full">
									<span className="text-yogurt-100 text-sm xs:text-base text-center font-semibold leading-4 text-wrap w-full mt-1 px-5">
										67.5x30 cm
									</span>
								</Asteroid>
							</div>
							<div className="w-full text-cocoa-120 self-end pl-8 sm:pl-12 md:pl-16 lg:hidden">
								<h2 className="mb-5 text-2xl xs:text-3xl xl:text-4xl font-medium inline-block">
									get a free deskpad
								</h2>
								<p className="xs:text-lg xs:font-medium xl:text-xl max-w-[40ch] text-balance">
									with your order if you put down $1 to reserve your spot right now! your order will
									be the first to ship, and you’ll get access to our discord server for sneak peeks
									and behind-the-scenes content.
								</p>
								<BuyNowButton variantId={variantId} />
							</div>
						</div>
					</div>
				</section>
				<section className="mt-36 xl:mt-44 w-full lg:mx-auto">
					<div className="w-full max-w-[96rem] flex flex-col xl:flex-row lg:mx-auto lg:mb-8 xl:justify-between xl:gap-x-24">
						<div className="w-full my-4 lg:mx-auto px-8 md:px-16 lg:px-12 scroll-px-8 md:scroll-px-16 xl:scroll-px-64 snap-x snap-mandatory flex flex-row lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-8 overflow-x-scroll lg:overflow-auto">
							{carouselImages.map((image, i) => (
								<LightboxImage
									key={image.src}
									className="xl:flex-1 h-32 xs:h-44 sm:h-56 lg:h-auto lg:w-full flex items-center justify-center bg-yogurt-60 rounded-2xl md:snap-start"
									{...image}></LightboxImage>
							))}
						</div>
					</div>
					<div className="px-7 md:px-16 w-full lg:max-w-screen-lg lg:mx-auto">
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
					</div>
					<div className="px-7 md:px-16 w-full mt-16 md:mt-24 lg:max-w-screen-lg lg:mx-auto relative">
						<h2 className="text-2xl font-medium mb-4 xs:mb-8 relative inline-block">
							taro switches
							<Image
								{...Images.SwitchTransparent}
								className="h-[300%] aspect-square absolute -top-12 -right-32"
							/>
						</h2>
						<div className="flex flex-row flex-wrap gap-3 md:gap-4 text-sm xs:text-base md:text-lg">
							<InfoBubble>linear</InfoBubble>
							<InfoBubble>55g | bottom-out</InfoBubble>
							<InfoBubble>pre-lubed</InfoBubble>
							<InfoBubble>3.5mm | total travel</InfoBubble>
							<InfoBubble>pom | stem + housing</InfoBubble>
							<InfoBubble>13.6mm | stem</InfoBubble>
							<InfoBubble>15mm | spring</InfoBubble>
						</div>
					</div>
				</section>
				<section className="@container flex flex-col mt-28 mb-16 px-8 md:px-16 xs:text-lg md:text-xl font-medium lg:mx-auto lg:max-w-screen-lg lg:w-full lg:flex-row">
					<div className="flex flex-col gap-y-8 text-cocoa-120 font-medium xs:text-lg">
						<span>pre-order from nov 12 for $135</span>
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
						{...Images.BoardFloat}
						button={{ className: "lg:w-1/2 lg:min-h-96" }}
						className="w-full md:px-12 lg:px-0 mt-6 lg:mt-0 aspect-[5/3]"
					/>
				</section>
			</Container>
		</Layout>
	);
}

const Sprout75Mark = ({ className }: { className?: string }) => (
	<h1 className={twMerge("text-4xl xs:text-5xl lg:text-7xl font-semibold text-shrub", className)}>
		sprout<span className="ml-1 align-sub text-3xl xs:text-4xl lg:text-6xl font-[728] text-blurple">75</span>
	</h1>
);

function NotificationsSignup({ fetcherKey, cta }: { fetcherKey: string; cta: string }) {
	const fetcher = useFetcher({ key: fetcherKey });
	const email = fetcher.data as string | undefined;
	const submitted = !!email;

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
									sendShopifyAnalytics({
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

function BuyNowButton({ variantId }: { variantId: string }) {
	const navigation = useNavigation();
	const { checkoutUrl } = useActionData<{ checkoutUrl: string | null }>() || {};
	const { cartCreate } = useCart();
	const [buyingNow, setBuyingNow] = useState(false);

	useEffect(() => {
		console.log("checkoutUrl", checkoutUrl);
		if (checkoutUrl && buyingNow) {
			window.open(checkoutUrl, "_blank");
			setBuyingNow(false);
		}
	}, [checkoutUrl, buyingNow]);

	return (
		<Form method="POST" className="mt-5" onSubmit={() => setBuyingNow(true)}>
			<input type="hidden" name="action" value="cartCreate" />
			<input type="hidden" name="variantId" value={variantId} />
			<Button
				type="submit"
				className="py-4 text-yogurt-100 xs:text-lg xs:font-medium xl:text-xl hover:enabled:bg-shrub"
				color="accent"
				rainbow={false}
				disabled={navigation.state !== "idle"}>
				{navigation.state === "idle" ? "let’s do it →" : "loading..."}
			</Button>
		</Form>
	);
}

const Images = {
	BoardSpin: {
		src: "sprout75/BoardSpin.png",
		alt: "a photo of the Sprout 75 mechanical keyboard. it's placed vertically with just one corner on the ground. it's a cream-colored aluminum keyboard showcasing the brown sugar boba keycaps.",
	},
	NoveltiesTransparent: {
		src: "sprout75/NoveltiesTransparent.png",
		alt: "a close-up of the right side of Sprout 75. it's got a silver aluminum knob at the top right corner, shaped like a bubble tea cup. in the macro column, delete fetcherKey, and enter fetcherKey, you can see novelties depicting cats and desserts.",
	},
	SwitchTransparent: {
		src: "sprout75/SwitchTransparent.png",
		alt: "the Taro linear switch. it has a light purple housing with a subtle cream-colored stem.",
	},
	KnobTransparent: {
		src: "sprout75/KnobTransparent.png",
		alt: "a silver aluminum knob. it's shaped like a bubble tea cup and has a straw sticking out of the top.",
	},
	TweakPreview: {
		src: "sprout75/TweakPreview.png",
		alt: "a preview of Tweak, the configuration tool for the sprout 75. the bottom left corner of a keyboard layout is displayed, with the 'alt' fetcherKey highlighted and a cursor over it.",
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
	BoardTop: {
		src: "sprout75/BoardTop.png",
		alt: "a bird's eye view of Sprout 75.",
		big: true,
	},
	BoardBottom: {
		src: "sprout75/BoardBottom.png",
		alt: "a bird's eye view of the backside of Sprout 75. it has a reflective silver aluminum weight with a circle, a triangle, and a pentagon etched into the middle.",
		big: true,
	},
	BoardFloat: {
		src: "sprout75/BoardFloat.png",
		alt: "one last shot of Sprout 75, at an angle from above so it looks like it's floating.",
	},
} satisfies Record<string, ImageProps>;

const carouselImages = [
	{
		src: "sprout75/photos/Photo1.png",
		alt: "an angled birds-eye shot of Sprout 75 laying on the brown sugar boba deskpad. towards the upper edge of the image there's a white mug with a grid pattern, and a wooden to-do organizer with a card in it.",
	},
	{
		src: "sprout75/photos/Photo2.png",
		alt: "an angled birds-eye view of the backside of Sprout 75. it has a reflective silver aluminum weight with a circle, a triangle, and a pentagon etched into the middle.",
	},
	{
		src: "sprout75/photos/Photo3.png",
		alt: "a close-up shot of the top right corner of Sprout 75. the silver knob is in focus, in the shape of a bubble tea cup with a straw sticking out of the top.",
	},
	{
		src: "sprout75/photos/Photo4.png",
		alt: "an angled birds-eye shot of the right sied of Sprout 75. it's on aw white surface, and scattered around the board are a few keycaps — cmd, pgup, end, enter, and pgdn.",
	},
	{
		src: "sprout75/photos/Photo5.png",
		alt: "a close-up shot of the Taro switches on Sprout 75. they have a light purple housing with a subtle cream-colored stem, and the milktype logo is etched into the housing.",
	},
	{
		src: "sprout75/photos/Photo6.png",
		alt: "a close-up shot of the right side of the back of Sprout 75. there's a silver aluminum toggle for switching between wireless and wired. next to it, there's a usb-c port.",
	},
] satisfies Array<ImageProps>;

const RESERVATION_QUERY = `#graphql
query Reservation($handle: String!) {
    product(handle: $handle) {
        id
		variants(first: 1) {
			nodes {
				id
            }
		}
    }
}
`;

const CART_CREATE_MUTATION = `#graphql
mutation CartCreate($variantId: ID!) {
	cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: 1 }] }) {
		cart {
			checkoutUrl
		}
	}
}
`;
