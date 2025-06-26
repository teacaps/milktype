import { LightboxImage } from "~/components/elements/Image";
import { ButtonLink } from "~/components/elements/Button";
import { ArrowUpIcon } from "~/assets/icons/ArrowUp";
import { Asteroid } from "~/assets/Asteroid";
import { Renders } from "./constants";

export function DeskpadCallout() {
	return (
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
	);
}
