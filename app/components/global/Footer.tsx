import { Wordmark } from "~/assets/Wordmark";
import { Container } from "~/components/global/Container";
import { Input } from "~/components/elements/Input";
import { Button, ButtonLink } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { FooterDivider } from "~/assets/Divider";
import { DiscordIcon } from "~/assets/icons/socials/Discord";
import { BlueskyIcon } from "~/assets/icons/socials/Bluesky";
import { TikTokIcon } from "~/assets/icons/socials/TikTok";
import { InstagramIcon } from "~/assets/icons/socials/Instagram";
import { SocialBlob } from "~/assets/SocialBlob";
import { twJoin } from "tailwind-merge";
import { NavLink, useFetcher } from "@remix-run/react";
import { Result, useHasAnalyticsConsent } from "~/lib/util";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";

function NewsletterSignup() {
	const fetcher = useFetcher({ key: "newsletter" });
	const { response: { customerCreate: { customer = null } = {} } = {}, error = null } =
		(fetcher.data as Result<{ customerCreate: { customer: Pick<Customer, "email"> | null } }>) ?? {};
	const submitted = !!customer;
	const email = customer?.email || fetcher.formData?.get("email")?.toString() || "";

	const hasAnalyticsConsent = useHasAnalyticsConsent();

	return (
		<fetcher.Form
			action="/signup"
			method="POST"
			id="newsletter-signup"
			className="flex w-fit text-xl mt-8 mb-12 lg:mb-8 py-4 px-8 gap-y-4 flex-col lg:flex-row items-center justify-center rounded-2xl transition-colors delay-300 duration-700"
			style={{ viewTransitionName: "newsletter" }}>
			<span className="font-medium text-center lg:text-start text-cocoa-120">
				{!submitted ? (
					<>
						let’s keep in touch — we’ll send a monthly newsletter to<span className="lg:hidden">:</span>
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
							className="w-52 h-auto -mb-[3px] ml-1 px-1 py-0 text-cocoa-100 text-xl placeholder:text-center focus-visible:ring-0"
						/>
						<Button
							color={submitted ? "shrub" : "accent"}
							icon={<ArrowRightIcon className="w-4 fill-yogurt-100" />}
							className={twJoin(
								"ml-3 h-8 w-8 p-2 rounded-lg mt-px",
								submitted && "bg-shrub cursor-default pointer-events-none",
							)}
							disabled={fetcher.state !== "idle" || submitted}
							type="submit"
							onClick={(ev) => {
								const email = ev.currentTarget.form?.email.value;

								fetcher.submit(ev.currentTarget.form);

								if (hasAnalyticsConsent && email) {
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

export const socials = [
	//	{ name: "Discord", icon: DiscordIcon, color: "fill-[#8292CA]", url: "..." },
	{ name: "Bluesky", icon: BlueskyIcon, color: "fill-[#0CB5FE]", url: "https://bsky.app/profile/milktype.co" },
	{ name: "TikTok", icon: TikTokIcon, color: "fill-[#D087BC]", url: "https://tiktok.com/@milktype" },
	{ name: "Instagram", icon: InstagramIcon, color: "fill-[#EFA36C]", url: "https://instagram.com/milktype" },
];

function Socials({ className }: { className?: string }) {
	return (
		<div
			className={twJoin(
				"flex flex-row lg:flex-col justify-between lg:justify-normal lg:-space-y-3 w-full lg:w-24 h-16 lg:h-auto mt-6 md:mt-12 lg:mt-0",
				className,
			)}>
			{socials.map((social, i) => (
				<a
					key={social.name}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					className={twJoin(
						"relative h-12 w-12 group transition-transform focus-visible:outline-none focus-visible:scale-125",
						i % 2 === 0 ? "self-start lg:self-end" : "self-end lg:self-start",
					)}>
					<SocialBlob
						className={twJoin(
							"h-12 w-12 absolute transition-transform ease-in-out duration-700 rotate-0 group-focus-visible:fill-accent",
							i % 2 !== 0
								? "motion-safe:group-focus-visible:rotate-90 motion-safe:group-hover:rotate-90"
								: "motion-safe:group-focus-visible:-rotate-90 motion-safe:group-hover:-rotate-90",
							"motion-reduce:group-hover:fill-accent",
							social.color,
						)}
					/>
					<social.icon
						className={twJoin(
							"absolute ease-in-out duration-700 transition-transform text-yogurt-100",
							"left-2 top-2 h-8 w-8",
							i % 2 !== 0
								? "motion-safe:-rotate-12 group-focus-visible:motion-safe:rotate-12 group-hover:motion-safe:rotate-12"
								: "motion-safe:rotate-12 group-focus-visible:motion-safe:-rotate-12 group-hover:motion-safe:-rotate-12",
						)}
					/>
				</a>
			))}
		</div>
	);
}

const footerLinks = [
	{ text: "sprout 75", href: "/sprout75" },
	{ text: "terms and privacy", href: "/terms" },
	{ text: "about", href: "/about" },
	{ text: "shipping and returns", href: "/shipping" },
];

function SendMessageButton({ className }: { className?: string }) {
	return (
		<ButtonLink url="mailto:hi@milktype.co" color="blurple" className={twJoin("text-yogurt-100 p-4", className)}>
			send us a message
		</ButtonLink>
	);
}

export function Footer() {
	return (
		<>
			<NewsletterSignup />
			<FooterDivider className="w-[175%] sm:w-[150%] md:w-[125%] lg:w-full h-auto fill-yogurt-60" />
			<Container
				as="footer"
				className="!w-full !max-w-full !mx-0 font-medium text-cocoa-100 text-sm xs:text-base flex flex-row md:items-center justify-between pt-4 pb-12"
				style={{ viewTransitionName: "footer" }}>
				<div className="w-1/2 md:w-1/3 lg:w-1/4 max-w-[40ch]">
					<a
						href="/"
						className="inline-block w-fit text-accent hover:text-cocoa-120 focus-visible:text-cocoa-120 focus-visible:outline-none">
						<Wordmark className="h-10 sm:h-14" />
					</a>
					<p className="mt-1 mb-4 leading-normal">
						we’re milktype, a design studio in foggy san francisco. we love our creations and the people who
						use them.
					</p>
					<SendMessageButton className="lg:hidden" />
				</div>
				<div className="mt-14 md:mt-0 text-cocoa-100">
					<div className="gap-y-4 flex flex-col md:grid grid-cols-2 grid-rows-2 mb-4 mx-8 md:mx-0 text-center md:text-start">
						{footerLinks.map((link) => (
							<NavLink
								key={link.href}
								prefetch="intent"
								to={link.href}
								className={({ isActive }) =>
									twJoin(
										isActive && "underline",
										"rounded-sm hover:text-accent focus-visible:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-accent active:font-medium",
									)
								}
								unstable_viewTransition>
								{link.text}
							</NavLink>
						))}
					</div>
					<Socials className="lg:hidden col-span-full max-w-52 mx-auto" />
				</div>
				<div className="hidden lg:flex flex-row items-center gap-2">
					<Socials />
					<SendMessageButton />
				</div>
			</Container>
		</>
	);
}
