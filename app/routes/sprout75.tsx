import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import { Image, ImageProps, LightboxImage } from "~/components/elements/Image";
import { twJoin } from "tailwind-merge";
import { useFetcher, useNavigation, useActionData, Form, json } from "@remix-run/react";
import { Input } from "~/components/elements/Input";
import { Button, ButtonLink } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import { Splat } from "~/assets/Splat";
import lightboxStyles from "yet-another-react-lightbox/styles.css";
import { Asteroid } from "~/assets/Asteroid";
import { InfoBubble } from "~/components/elements/InfoBubble";
import { socials } from "~/components/global/Footer";
import { SocialBlob } from "~/assets/SocialBlob";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { TruckIcon } from "~/assets/icons/Truck";
import { PlusIcon } from "~/assets/icons/Plus";
import { CheckIcon } from "~/assets/icons/Check";
import { MinusIcon } from "~/assets/icons/Minus";
import { ActionFunctionArgs } from "@shopify/remix-oxygen";
import { ArrowUpIcon } from "~/assets/icons/ArrowUp";

const title = "sprout 75";
const description = "available for pre-order nov 12 &#127793;";

const SPROUT_75_MERCHANDISE_ID = "gid://shopify/ProductVariant/45575282786531";
const BSB_DESKPAD_MERCHANDISE_ID = "gid://shopify/ProductVariant/45729711849699";

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

export async function action({ request, context }: ActionFunctionArgs) {
	const fd = await request.formData();
	if (fd.get("action") !== "cartCreate") return null;

	const deskpad = fd.get("deskpad") === "true";

	const lines = [{ merchandiseId: SPROUT_75_MERCHANDISE_ID, quantity: 1 }];
	if (deskpad) lines.push({ merchandiseId: BSB_DESKPAD_MERCHANDISE_ID, quantity: 1 });

	const { cartCreate } = await context.storefront.mutate(CART_CREATE_MUTATION, {
		variables: { lines: lines },
	});
	const checkoutUrl = cartCreate?.cart?.checkoutUrl || null;
	return json({ checkoutUrl });
}

export default function Sprout75() {
	return (
		<Layout footer={false}>
			<Container
				as="main"
				className="w-full sm:w-full px-0 sm:px-0 lg:px-0 lg:max-w-unset overflow-x-visible flex flex-col">
				<section className="w-full px-8 md:px-16 flex flex-col sm:flex-row-reverse sm:items-center lg:max-w-screen-lg sm:mx-auto">
					<Image
						{...Images.BoardSpin}
						className="self-end sm:self-start aspect-[2/3] w-[15rem] xs:w-[20rem] sm:w-[25rem] md:w-[30rem] -mr-4 xs:-mr-8 sm:-mr-12 md:-mr-24"
					/>
					<div className=" -mt-12 sm:mt-36 flex flex-col gap-y-2 sm:gap-y-4 w-full xs:text-lg">
						<Sprout75Mark />
						<div className="flex flex-row gap-2 sm:gap-3 items-center text-cocoa-80 xs:text-lg xl:text-xl xs:font-medium">
							<TruckIcon className="w-5 xl:w-6 h-auto" />
							<span>ships in jan 2025</span>
						</div>
						<span className="text-cocoa-120 text-balance xs:text-lg xl:text-xl xs:font-medium">
							a fully assembled mechanical keyboard inspired by our favorite drink — brown sugar boba.
						</span>
						<CheckoutForm />
					</div>
				</section>
				<section className="w-full max-w-[96rem] flex flex-col xl:flex-row my-24 lg:mx-auto xl:justify-between xl:gap-x-24">
					<div className="w-full my-4 lg:mx-auto px-8 md:px-16 lg:px-12 scroll-px-8 md:scroll-px-16 xl:scroll-px-64 snap-x snap-mandatory flex flex-row lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-8 overflow-x-scroll lg:overflow-auto">
						{carouselImages.map((image, i) => (
							<LightboxImage
								key={image.src}
								className="xl:flex-1 h-32 xs:h-44 sm:h-56 lg:h-auto lg:w-full flex items-center justify-center bg-yogurt-60 rounded-2xl md:snap-start"
								{...image}></LightboxImage>
						))}
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
							sprout 75 comes with a variety of swappable keycaps — from mac + windows support to adorable
							dessert-themed keys, we've got you covered.
						</p>
					</div>
				</section>
				<section className="mt-28 xs:mt-36 md:mt-56 xl:mt-36 2xl:mt-0 pl-8 md:pl-16 md:pr-8 lg:px-16 flex flex-col sm:flex-row lg:items-center sm:justify-between xl:justify-end lg:w-full lg:max-w-screen-lg lg:mx-auto 2xl:mr-24">
					<div className="space-y-4 lg:flex-shrink-0 max-w-[20ch] xs:max-w-[25ch] sm:max-w-[30ch] xl:max-w-[40ch] text-balance">
						<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">turn it up</h2>
						<p className="xs:text-lg xl:text-xl xs:font-medium">
							or down with the exclusive <span className="text-[#7B7673]">silver boba knob</span>,
							included for free if you pre-order. standard volume knob also included.
						</p>
					</div>
					<div className="relative self-end w-80 h-80 xl:w-full xl:max-w-xl 2xl:max-w-2xl xl:h-unset xl:aspect-square -mt-8 xs:-mt-20 sm:mt-0">
						<Image {...Images.KnobTransparent} className="aspect-square h-full" />
						<Splat
							className="h-36 xl:h-56 2xl:h-64 absolute bottom-4 xl:bottom-16 2xl:bottom-24 -left-4 xl:left-unset xl:-right-4"
							splatClasses="fill-accent h-full w-full">
							<span className="text-yogurt-100 text-xl xl:text-2xl 2xl:text-3xl text-center font-semibold rotate-[24deg]">
								pre-order
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
				<section className="max-w-screen-lg mx-auto mt-16 xs:mt-24 md:mt-40 xl:mt-24 flex flex-col-reverse gap-x-16 sm:flex-row sm:items-center sm:justify-center lg:w-full">
					<Image
						{...Images.SwitchTransparent}
						className="aspect-square self-end sm:self-start w-80 h-80 max-w-sm xl:w-full xl:h-unset xl:aspect-square -mt-8 xs:-mt-20 sm:mt-0"
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
				<section className="mt-16 mx-auto px-6 md:px-8 lg:px-12 py-5 flex flex-col md:flex-row-reverse gap-y-9 md:gap-x-4 items-center w-4/5 max-w-screen-lg bg-yogurt-60 rounded-2xl">
					<div className="flex flex-row items-center gap-x-3 xl:gap-x-6">
						<Image {...Images.SwitchTransparent2} className="aspect-square w-16 xs:w-20 xl:w-28" />
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
				<section className="mt-28 lg:mt-40 flex flex-col lg:flex-row-reverse xl:pl-16 2xl:pl-32">
					<div className="lg:w-auto lg:flex lg:flex-col lg:items-end xl:w-full xl:flex-grow">
						<Image
							{...Images.DeskpadCloseUp}
							className="w-11/12 xs:w-3/4 lg:w-full 2xl:w-[34rem] max-w-lg lg:max-w-3xl xl:max-w-xl xs:mb-8 aspect-square ml-auto lg:ml-0"
						/>
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
									className="h-24 xs:h-32 absolute top-8 right-0 rotate-12"
									asteroidClasses="fill-blurple h-full w-full">
									<span className="text-yogurt-100 text-sm xs:text-base text-center font-semibold leading-4 text-wrap w-full mt-1 px-5">
										67.5x30 cm
									</span>
								</Asteroid>
							</div>
						</div>
					</div>
				</section>
				<section className="mt-20 xl:mt-32 px-7 md:px-16 w-full lg:mx-auto lg:max-w-screen-lg">
					<LightboxImage {...Images.BoardTilt} className="w-full overflow-hidden" />
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
							pre-order now
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
						{...Images.BoardFloat}
						button={{ className: "lg:w-1/2 lg:min-h-96" }}
						className="w-full md:px-12 lg:px-0 mt-6 lg:mt-0 aspect-[5/3]"
					/>
				</section>
			</Container>
		</Layout>
	);
}

const Sprout75Mark = () => (
	<h1 className="-ml-px text-4xl xs:text-5xl lg:text-7xl font-semibold text-shrub">
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
	const navigation = useNavigation();
	const { checkoutUrl } = useActionData<{ checkoutUrl: string | null }>() || {};
	const [addedDeskpad, setAddedDeskpad] = useState(false);
	const [justAddedDeskpad, setJustAddedDeskpad] = useState(false);
	const [buyingNow, setBuyingNow] = useState(false);
	const deskpadRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (checkoutUrl && buyingNow) {
			window.open(checkoutUrl, "_blank");
			setBuyingNow(false);
		}
	}, [checkoutUrl, buyingNow]);

	const handleDeskpadAdd: MouseEventHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setAddedDeskpad((prev) => !prev);
		setJustAddedDeskpad(true);
		setTimeout(() => setJustAddedDeskpad(false), 2000);
	};

	return (
		<Form method="POST" className="flex flex-col gap-8" onSubmit={() => setBuyingNow(true)}>
			<input type="hidden" name="action" value="cartCreate" />
			<input type="hidden" name="deskpad" value={addedDeskpad ? "true" : "false"} />
			<div
				ref={deskpadRef}
				className="w-full xs:w-3/4 sm:w-full relative group rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-accent"
				tabIndex={0}
				aria-label={addedDeskpad ? "Remove desk pad from cart" : "Add desk pad to cart"}>
				<LightboxImage
					{...Images.DeskpadFull}
					className="w-full object-contain"
					button={{
						"onClick": handleDeskpadAdd,
						"aria-label": addedDeskpad ? "Remove desk pad from cart" : "Add desk pad to cart",
						"tabIndex": -1,
					}}
				/>
				<Button
					color={addedDeskpad ? "lilac" : "blurple"}
					onClick={handleDeskpadAdd}
					hoverRef={deskpadRef}
					className="absolute bottom-[10%] sm:bottom-[5%] md:bottom-[10%] -right-2 sm:-right-[20%] md:-right-[15%] rotate-[3deg] rounded-full py-2 pl-4 pr-5 flex flex-row gap-0 items-center justify-center text-yogurt-100 text-sm xs:text-base lg:text-lg xs:font-medium"
					aria-label={addedDeskpad ? "Remove desk pad from cart" : "Add desk pad to cart"}>
					{!addedDeskpad ? (
						<PlusIcon className="w-[1.375rem] xs:w-6 lg:w-7 h-auto" />
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
					<span>matching deskpad $10</span>
				</Button>
			</div>
			<Button
				type="submit"
				className="w-full py-4 text-yogurt-100 xs:text-lg xs:font-medium lg:text-xl"
				color="shrub"
				rainbow={false}
				disabled={navigation.state !== "idle"}>
				{navigation.state === "idle" ? "pre-order now ⋅ $135 usd" : "loading..."}
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
	BoardTilt: {
		src: "sprout75/BoardTilt.png",
		alt: "a photo of the Sprout 75 mechanical keyboard. it's floating just above the ground at an angle.",
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

const CART_CREATE_MUTATION = `#graphql
mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
        cart {
            checkoutUrl
        }
    }
}
`;
