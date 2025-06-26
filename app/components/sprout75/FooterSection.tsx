import { LightboxImage } from "~/components/elements/Image";
import { ButtonLink } from "~/components/elements/Button";
import { ArrowUpIcon } from "~/assets/icons/ArrowUp";
import { SocialBlob } from "~/assets/SocialBlob";
import { socials } from "~/components/global/Footer";
import { twJoin } from "tailwind-merge";
import { NotificationsSignup } from "./NotificationsSignup";
import { Renders } from "./constants";

export function FooterSection() {
	return (
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
	);
}
