import { Container } from "~/components/global/Container";
import { Layout } from "~/components/global/Layout";
import { Image, ImageProps, LightboxImage } from "~/components/elements/Image";
import { twJoin } from "tailwind-merge";
import { useFetcher, useLoaderData, useNavigation } from "react-router";
import { Input } from "~/components/elements/Input";
import { Button, ButtonLink } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import { Splat } from "~/assets/Splat";
import lightboxStyles from "yet-another-react-lightbox/styles.css?url";
import { Asteroid } from "~/assets/Asteroid";
import { InfoBubble } from "~/components/elements/InfoBubble";
import { socials } from "~/components/global/Footer";
import { SocialBlob } from "~/assets/SocialBlob";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRouteLoaderData } from "react-router";
import type { RootLoader } from "~/root";
import { TruckIcon } from "~/assets/icons/Truck";
import { PlusIcon } from "~/assets/icons/Plus";
import { CheckIcon } from "~/assets/icons/Check";
import { MinusIcon } from "~/assets/icons/Minus";
import { ArrowUpIcon } from "~/assets/icons/ArrowUp";
import { AnalyticsEvent, CartForm, OptimisticInput, ProductViewPayload, useAnalytics } from "@shopify/hydrogen";
import { useCartVisibility } from "~/components/global/Cart";
import { Result, usePrevious } from "~/lib/util";
import { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import { CartActions } from "~/routes/cart";

const title = "sprout 75 – cream";
const description = "available for pre-order now";

const SPROUT_75_MERCHANDISE_ID = "gid://shopify/ProductVariant/45826342420707";

export const SPROUT75_IMAGE = {
	src: "https://img.milktype.co/cdn-cgi/image/width=2000,format=auto/sprout75/cream/Sprout75CreamImage.png",
	alt: "a photo of the Sprout 75 mechanical keyboard. it's floating just above the ground at an angle on a light orange background.",
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
		content: "https://milktype.co/sprout75/cream",
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
			handle: "sprout-75-cream",
		},
	});

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
	};
}

export default function Sprout75() {
	const { productPayload, url } = useLoaderData<typeof loader>();
	const { publish, shop } = useAnalytics();

	useEffect(() => {
		publish(AnalyticsEvent.PRODUCT_VIEWED, { products: [productPayload], shop, url });
	}, []);

	return (
		<Layout footer={false}>
			<Container
				as="main"
				className="w-full sm:w-full px-0 sm:px-0 lg:px-0 lg:max-w-unset overflow-x-visible flex flex-col">
				<section className="w-full px-8 md:pl-16 md:pr-12 flex flex-col sm:flex-row-reverse sm:items-center lg:max-w-screen-lg sm:mx-auto">
					<Image
						{...Images.BoardSpin}
						className="self-end sm:self-start aspect-[2/3] w-[15rem] xs:w-[22rem] md:w-[30rem] -mr-4 xs:-mr-8 sm:-mr-12 md:-mr-24"
					/>
					<div className=" -mt-12 sm:mt-36 flex flex-col gap-y-2 sm:gap-y-4 w-full xs:text-lg">
						<Sprout75Mark />
						<div className="flex flex-row gap-2 sm:gap-3 items-center text-cocoa-80 xs:text-lg xl:text-xl xs:font-medium">
							<TruckIcon className="w-5 xl:w-6 h-auto" />
							<span>ships in feb 2025</span>
						</div>
						<span className="text-cocoa-120 text-balance xs:text-lg xl:text-xl xs:font-medium">
							a fully assembled mechanical keyboard in our signature cream colorway.
						</span>
						<CheckoutForm />
					</div>
				</section>
				<section className="mt-28 xs:mt-36 lg:mt-0 pr-8 flex flex-col lg:flex-row lg:gap-x-20 lg:items-center lg:w-full lg:max-w-screen-2xl lg:mr-auto">
					<Image
						{...Images.NoveltiesTransparent}
						className="w-5/6 md:w-2/3 lg:w-1/2 lg:max-w-xl xl:max-w-3xl aspect-square"
					/>
					<div className="relative -mt-4 xs:-mt-12 md:-mt-48 lg:-mt-0 xl:mt-20 space-y-4 self-end lg:self-center lg:flex-shrink-0 max-w-[20ch] xs:max-w-[30ch] md:max-w-[35ch] xl:max-w-[40ch] text-balance">
						<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
							the perfect keyboard
						</h2>
						<p className="xs:text-lg xl:text-xl xs:font-medium">
							sprout 75 comes with a variety of swappable keycaps — we've got you covered from mac to
							windows.
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
					<div className="relative self-end w-52 h-52 sm:w-80 sm:h-80 lg:w-full lg:max-w-xl 2xl:max-w-2xl lg:h-unset lg:aspect-square -mt-8 xs:-mt-20 sm:mt-0">
						<Image {...Images.KnobTransparent} className="aspect-square h-full" />
						<Splat
							className="h-32 lg:h-56 2xl:h-64 absolute -bottom-4 sm:bottom-4 lg:bottom-16 2xl:bottom-24 -left-8 sm:left-unset lg:-right-4"
							splatClasses="fill-accent h-full w-full">
							<span className="text-yogurt-100 text-lg lg:text-2xl 2xl:text-3xl text-center font-semibold rotate-[24deg]">
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
							configure keybinds and settings with{" "}
							<a
								className="underline hover:no-underline text-accent"
								href="https://tweak.milktype.co"
								target="_blank">
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
				<section className="w-full max-w-md sm:max-w-screen-lg mx-auto mt-16 xs:mt-24 md:mt-40 xl:mt-24 pl-12 sm:pr-12 flex flex-col-reverse gap-x-12 md:gap-x-16 sm:flex-row sm:items-center sm:justify-center">
					<Image
						{...Images.SwitchTransparent}
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
        const { turnstileSiteKey } = useRouteLoaderData<RootLoader>("root")!;
        const turnstileRef = useRef<TurnstileInstance | null>(null);
        const pendingForm = useRef<HTMLFormElement | null>(null);
        const [captchaError, setCaptchaError] = useState(false);

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
                                        {captchaError ? (
                                                <p className="text-cocoa-100">
                                                        there was an error. email hi@milktype.co for a discount code
                                                        (don't worry, we reply fast!)
                                                </p>
                                        ) : (
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
                                                                        ev.preventDefault();
                                                                        pendingForm.current = ev.currentTarget.form;
                                                                        setCaptchaError(false);
                                                                        turnstileRef.current?.execute();
                                                                }}
                                                        />
                                                </div>
                                        )}
                                        <Turnstile
                                                ref={turnstileRef}
                                                siteKey={turnstileSiteKey}
                                                className="hidden"
                                                options={{ size: "invisible", execution: "execute" }}
                                                onSuccess={() => {
                                                        const form = pendingForm.current;
                                                        if (!form) return;
                                                        const email = form.email.value;
                                                        fetcher.submit(form);
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
                                                onError={() => setCaptchaError(true)}
                                        />
                                </>
                        )}
                </fetcher.Form>
        );
}

function CheckoutForm() {
	const { setCartVisible } = useCartVisibility();
	const navigation = useNavigation();

	const fetcher = useFetcher({ key: "checkout" });
	const previousFetcherState = usePrevious(fetcher.state);

	useEffect(() => {
		if (fetcher.state === "idle" && previousFetcherState === "loading") {
			setCartVisible(true);
		}
	}, [fetcher.state]);

	const lines = [{ merchandiseId: SPROUT_75_MERCHANDISE_ID, quantity: 1 }];

	return (
		<CartForm route="/cart" action={CartActions.LinesAdd} inputs={{ lines }} fetcherKey="checkout">
			{(fetcher) => (
				<>
					<OptimisticInput id={SPROUT_75_MERCHANDISE_ID} data={{}} />
					<Button
						type="submit"
						className="w-full max-w-96 py-4 text-yogurt-100 xs:text-lg xs:font-medium lg:text-xl"
						color="shrub"
						rainbow={false}
						disabled={navigation.state !== "idle"}>
						{fetcher.state === "submitting" ? "loading..." : "pre-order now ⋅ $135 usd"}
					</Button>
				</>
			)}
		</CartForm>
	);
}

const Images = {
	BoardSpin: {
		src: "sprout75/cream/BoardSpin.png",
		alt: "a photo of the Sprout 75 mechanical keyboard. it's placed vertically with just one corner on the ground. it's a cream-colored aluminum keyboard with matching keycaps.",
	},
	NoveltiesTransparent: {
		src: "sprout75/cream/NoveltiesTransparent.png",
		alt: "a close-up of the right side of Sprout 75. it's got a silver aluminum knob at the top right corner, shaped like a bubble tea cup.",
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
		src: "sprout75/cream/DongleCloseUp.png",
		alt: "a very close-up shot of the back of Sprout 75. there's a 2.4ghz usb dongle leaning against the board, next to a switch for toggling between wireless and wired.",
	},
	NoveltySwap: {
		src: "sprout75/cream/NoveltySwap.png",
		alt: "the top right of Sprout 75. there's a 'del' keycap floating above an exposed switch.",
	},
	BoardTilt: {
		src: "sprout75/cream/BoardTilt.png",
		alt: "a photo of the Sprout 75 mechanical keyboard. it's floating just above the ground at an angle.",
	},
	BoardFloat: {
		src: "sprout75/cream/BoardFloat.png",
		alt: "one last shot of Sprout 75, at an angle from above so it looks like it's floating.",
	},
} satisfies Record<string, ImageProps>;

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
