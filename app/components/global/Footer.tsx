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
import { NavLink } from "@remix-run/react";

function NewsletterSignup() {
	return (
		<form
			className="flex w-full text-xl p-8 gap-y-4 flex-col md:flex-row items-center justify-center"
			style={{ viewTransitionName: "newsletter" }}>
			<span className="font-medium text-cocoa-120">
				let’s keep in touch — we’ll send a monthly newsletter to<span className="md:hidden">:</span>
			</span>
			<label htmlFor="email" className="sr-only">
				Email
			</label>
			<div className="flex flex-row">
				<Input
					name="email"
					placeholder="example@gmail.com"
					className="w-52 h-auto -mb-[3px] ml-1 px-1 py-0 text-cocoa-100 text-xl placeholder:text-center focus-visible:ring-0"
				/>
				<Button
					color="accent"
					icon={<ArrowRightIcon className="w-4 fill-yogurt-100" />}
					className="ml-3 h-8 w-8 p-2 rounded-lg mt-px"
				/>
			</div>
		</form>
	);
}

const socials = [
	//	{ name: "Discord", icon: DiscordIcon, color: "fill-[#8292CA]", url: "..." },
	{ name: "Bluesky", icon: BlueskyIcon, color: "fill-[#0CD2FE]", url: "https://bsky.app/profile/milktype.co" },
	{ name: "TikTok", icon: TikTokIcon, color: "fill-[#D087BC]", url: "https://tiktok.com/@milktype" },
	{ name: "Instagram", icon: InstagramIcon, color: "fill-[#EFA36C]", url: "https://instagram.com/milktype" },
];

function Socials() {
	return (
		<div className="flex flex-col -space-y-3 w-24 text-yogurt-100">
			{socials.map((social, i) => (
				<a
					key={social.name}
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					className={twJoin("relative h-12 w-12 group", i % 2 === 0 ? "self-end" : "self-start")}>
					<SocialBlob
						className={
							"h-12 w-12 absolute transition-transform ease-in-out duration-700 rotate-0 group-focus-visible:rotate-90 group-focus-visible:fill-accent group-hover:rotate-90 " +
							social.color
						}
					/>
					<social.icon className="left-2 top-2 h-8 w-8 absolute ease-in-out duration-700 -rotate-12 transition-transform group-focus-visible:rotate-12 group-hover:rotate-12" />
				</a>
			))}
		</div>
	);
}

const footerLinks = [
	{ text: "milktype 75", href: "/products/milktype75" },
	{ text: "terms and privacy", href: "/terms" },
	{ text: "about", href: "/about" },
	{ text: "shipping and returns", href: "/shipping" },
];

export function Footer() {
	return (
		<>
			<NewsletterSignup />
			<FooterDivider className="w-full h-auto fill-yogurt-60" />
			<Container
				as="footer"
				className="!w-full !max-w-full !mx-0 font-medium text-cocoa-100 text-base flex flex-row items-center justify-between pt-4 pb-12"
				style={{ viewTransitionName: "footer" }}>
				<div className="max-w-fit w-1/4">
					<Wordmark className="h-14 w-fit text-accent" />
					<p className="mt-3">
						we’re milktype, a design studio in foggy san francisco. we love our creations and the people who
						use them.
					</p>
				</div>
				<Socials />
				<div className="gap-y-4 grid grid-cols-2 grid-rows-2 text-cocoa-100">
					{footerLinks.map((link) => (
						<NavLink
							prefetch="intent"
							to={link.href}
							className={({ isActive }) =>
								twJoin(
									isActive && "underline",
									"hover:text-accent focus-visible:text-accent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-accent active:font-medium",
								)
							}
							unstable_viewTransition>
							{link.text}
						</NavLink>
					))}
				</div>
				<ButtonLink url="mailto:hi@milktype.co" color="lilac" className="text-yogurt-100 p-5">
					send us a message
				</ButtonLink>
			</Container>
		</>
	);
}
