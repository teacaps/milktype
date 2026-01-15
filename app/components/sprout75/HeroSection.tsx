import { LightboxImage } from "~/components/elements/Image";
import { Sprout75Mark } from "./Sprout75Mark";
import { CheckoutForm } from "./CheckoutForm";
import { Renders } from "./constants";

export function HeroSection({
	availableForSale,
	deskpadAvailableForSale,
}: {
	availableForSale: boolean;
	deskpadAvailableForSale: boolean;
}) {
	return (
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
				<CheckoutForm availableForSale={availableForSale} deskpadAvailableForSale={deskpadAvailableForSale} />
			</div>
		</section>
	);
}
