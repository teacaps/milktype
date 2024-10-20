import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import type { MetaFunction } from "@shopify/remix-oxygen";
import { Image, ImageProps, LightboxImage } from "~/components/elements/Image";
import { twJoin, twMerge } from "tailwind-merge";
import { useFetcher } from "@remix-run/react";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import { Splat } from "~/assets/Splat";
import lightboxStyles from "yet-another-react-lightbox/styles.css";
import { Asteroid } from "~/assets/Asteroid";
import { InfoBubble } from "~/components/elements/InfoBubble";
import { socials } from "~/components/global/Footer";
import { SocialBlob } from "~/assets/SocialBlob";

const title = "sprout 75";
const description = "available for pre-order early nov &#127793;";

export const SPROUT75_IMAGE = {
	src: "https://res.cloudinary.com/dpfhkaxk7/image/upload/f_auto,q_auto:best,w_1500/sprout75/Sprout75Image_vjie5j.png",
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

const Images = {
	BoardSpin: {
		src: "sprout75/BoardSpin_h2jybj.png",
		alt: "a photo of the Sprout 75 mechanical keyboard. it's placed vertically with just one corner on the ground. it's a cream-colored aluminum keyboard showcasing the brown sugar boba keycaps.",
	},
	NoveltiesTransparent: {
		src: "sprout75/NoveltiesTransparent_jfalig.png",
		alt: "a close-up of the right side of the Sprout 75. it's got a silver aluminum knob at the top right corner, shaped like a bubble tea cup. in the macro column, delete fetcherKey, and enter fetcherKey, you can see novelties depicting cats and desserts.",
	},
	SwitchTransparent: {
		src: "sprout75/SwitchTransparent_yfcnbg.png",
		alt: "the Taro linear switch. it has a light purple housing with a subtle cream-colored stem.",
	},
	KnobTransparent: {
		src: "sprout75/KnobTransparent_wqpu9b.png",
		alt: "a silver aluminum knob. it's shaped like a bubble tea cup and has a straw sticking out of the top.",
	},
	TweakPreview: {
		src: "sprout75/TweakPreview_kbzfhf.png",
		alt: "a preview of Tweak, the configuration tool for the sprout 75. the bottom left corner of a keyboard layout is displayed, with the 'alt' fetcherKey highlighted and a cursor over it.",
	},
	DongleCloseUp: {
		src: "sprout75/DongleCloseUp_x2igie.png",
		alt: "a very close-up shot of the back of the Sprout 75. there's a 2.4ghz usb dongle leaning against the board, next to a switch for toggling between wireless and wired.",
	},
	NoveltySwap: {
		src: "sprout75/NoveltySwap_isgz6x.png",
		alt: "the top right of the Sprout 75. there's two keycaps floating above an exposed switch. one is the 'del' keycap, while the other is a novelty depicting a cup of bubble tea.",
	},
	DeskpadCloseUp: {
		src: "sprout75/DeskmatCloseUp_vuxzm2.png",
		alt: "a close-up shot of the left side of the brown sugar boba deskpad. towards the right edge you can see the Sprout 75 board on it.",
	},
	DeskpadFull: {
		src: "sprout75/DeskmatFull_ikyer9.png",
		alt: "the brown sugar boba deskpad. it depicts cats hanging out at a boba café.",
		big: true,
	},
	BoardTop: {
		src: "sprout75/BoardTop_zl5ze3.png",
		alt: "a bird's eye view of the Sprout 75.",
		big: true,
	},
	BoardBottom: {
		src: "sprout75/BoardBottom_kl0xfq.png",
		alt: "a bird's eye view of the bottom of the Sprout 75. it has a reflective silver aluminum weight with a circle, a triangle, and a pentagon etched into the middle.",
		big: true,
	},
	BoardFloat: {
		src: "sprout75/BoardFloat_zmlued.png",
		alt: "one last shot of the Sprout 75, at an angle from above so it looks like it's floating.",
	},
} satisfies Record<string, ImageProps>;

export default function Sprout75() {
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
						<span className="font-medium lg:mt-12">pre-order for $135 usd early nov</span>
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
							configure keybinds and settings with{" "}
							<a href="https://usevia.app" className="underline hover:no-underline hover:text-accent">
								milktype tweak
							</a>
							, our lightweight design tool.
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
				<section className="mt-28 lg:mt-40 flex flex-col">
					<div className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-x-12 lg:w-full lg:ml-auto">
						<Image
							{...Images.DeskpadCloseUp}
							className="w-11/12 xs:w-3/4 lg:w-1/2 max-w-lg xl:max-w-xl 2xl:max-w-3xl mb-8 aspect-square self-end"
						/>
						<div className="w-full 2xl:w-auto flex flex-col 2xl:mt-32 2xl:mx-auto">
							<div className="w-4/5 xs:w-1/2 2xl:w-3/4 pl-8 md:pl-16 xs:-mt-16">
								<h2 className="my-5 text-2xl xs:text-3xl xl:text-4xl font-medium">
									sweeten your setup
								</h2>
								<p className="xs:text-lg xs:font-medium xl:text-xl max-w-[40ch] text-balance">
									with the matching <span className="text-[#A8593F]">brown sugar boba deskpad</span>{" "}
									for +$10 usd when you pre-order ($18 retail).
								</p>
							</div>
							<div className="w-full max-w-5xl relative hidden 2xl:block">
								<LightboxImage {...Images.DeskpadFull} className="w-full object-contain" />
								<Asteroid
									className="h-24 xs:h-32 absolute top-0 right-0 xs:right-2 rotate-12"
									asteroidClasses="fill-blurple h-full w-full">
									<span className="text-yogurt-100 text-sm xs:text-base text-center font-semibold leading-4 text-wrap w-full mt-1 px-5">
										67.5x30 cm
									</span>
								</Asteroid>
							</div>
						</div>
					</div>
					<div className="w-full lg:-mt-20 xl:-mt-40 lg:w-2/3 relative h-fit md:px-8 2xl:hidden">
						<LightboxImage {...Images.DeskpadFull} className="w-full object-contain" />
						<Asteroid
							className="h-24 xs:h-32 absolute top-0 right-0 xs:right-2 rotate-12"
							asteroidClasses="fill-blurple h-full w-full">
							<span className="text-yogurt-100 text-sm xs:text-base text-center font-semibold leading-4 text-wrap w-full mt-1 px-5">
								67.5x30 cm
							</span>
						</Asteroid>
					</div>
				</section>
				<section className="mt-36 xl:mt-44 w-full lg:mx-auto">
					<LightboxImage
						{...Images.BoardTop}
						className="w-full lg:w-2/3 max-w-5xl aspect-[5/2] px-6 md:px-16 lg:mx-auto xl:px-0"
						button={{ className: "w-full" }}
					/>
					{/*<div className="w-full h-32 xs:h-44 sm:h-48 lg:h-64 xl:h-auto my-4 xl:mx-auto px-8 md:px-16 scroll-px-8 md:scroll-px-16 snap-x flex flex-row gap-8 overflow-x-scroll xl:overflow-x-visible">*/}
					{/*	<div className="xl:flex-1 h-full max-h-72 aspect-square flex items-center justify-center bg-yogurt-60 rounded-2xl md:snap-start xl:ml-auto">*/}
					{/*		<span className="text-2xl text-center font-medium text-wrap">placeholder</span>*/}
					{/*	</div>*/}
					{/*	<div className="xl:flex-1 h-full max-h-72 aspect-square flex items-center justify-center bg-yogurt-60 rounded-2xl snap-start">*/}
					{/*		<span className="text-2xl text-center font-medium text-wrap">placeholder</span>*/}
					{/*	</div>*/}
					{/*	<div className="xl:flex-1 h-full max-h-72 aspect-square flex items-center justify-center bg-yogurt-60 rounded-2xl snap-start">*/}
					{/*		<span className="text-2xl text-center font-medium text-wrap">placeholder</span>*/}
					{/*	</div>*/}
					{/*	<div className="xl:flex-1 h-full max-h-72 aspect-square flex items-center justify-center bg-yogurt-60 rounded-2xl snap-start">*/}
					{/*		<span className="text-2xl text-center font-medium text-wrap">placeholder</span>*/}
					{/*	</div>*/}
					{/*	<div className="xl:flex-1 h-full max-h-72 aspect-square flex items-center justify-center bg-yogurt-60 rounded-2xl snap-start xl:mr-auto">*/}
					{/*		<span className="text-2xl text-center font-medium text-wrap">placeholder</span>*/}
					{/*	</div>*/}
					{/*</div>*/}
					<LightboxImage
						{...Images.BoardBottom}
						className="w-full lg:w-2/3 max-w-5xl aspect-[5/2] px-6 md:px-16 mb-8 lg:mx-auto xl:px-0"
						button={{ className: "w-full" }}
					/>
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
					<div>
						<NotificationsSignup fetcherKey="footer" cta="get updates at" />
						<div className="mt-12 xs:mt-16 flex flex-row w-full gap-x-3 xs:gap-x-4 items-center">
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
