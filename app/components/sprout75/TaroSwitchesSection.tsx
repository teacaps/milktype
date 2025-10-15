import { Image } from "~/components/elements/Image";
import { InfoBubble } from "~/components/elements/InfoBubble";
import { Renders } from "./constants";

export function TaroSwitchesSection() {
	return (
		<>
			<section className="w-full max-w-md sm:max-w-screen-lg mx-auto mt-32 xs:mt-40 xl:mt-24 pl-12 sm:pr-12 flex flex-col-reverse gap-x-12 md:gap-x-16 sm:flex-row sm:items-center sm:justify-center">
				<Image
					{...Renders.SwitchTransparent}
					className="aspect-square self-end sm:self-start w-60 h-60 max-w-sm xl:w-full xl:h-unset xl:aspect-square -mt-8 xs:-mt-8 sm:mt-0"
				/>
				<div className="space-y-4 lg:flex-shrink-0 max-w-[20ch] xs:max-w-[25ch] sm:max-w-[30ch] xl:max-w-[40ch] text-balance">
					<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">taro switches</h2>
					<p className="xs:text-lg xl:text-xl xs:font-medium">
						our custom designed <span className="text-blurple">taro switches</span> are fabulously
						lightweight and smooth for easy typing. they'll arrive pre-lubricated and perfectly tuned for
						your fingers.
					</p>
				</div>
			</section>
			<section className="mt-16 mx-auto px-6 md:px-8 lg:px-12 py-5 flex flex-col md:flex-row-reverse gap-y-9 md:gap-x-3 items-center w-4/5 max-w-screen-lg bg-yogurt-70 rounded-2xl">
				<div className="flex flex-row items-center gap-x-3 xl:gap-x-6">
					<Image {...Renders.SwitchTransparent2} className="aspect-square w-16 xs:w-20 xl:w-28" />
					<h3 className="text-xl xs:text-2xl xl:text-3xl font-semibold text-cocoa-100">spec sheet</h3>
				</div>
				<div className="w-full flex flex-row flex-wrap gap-3 md:gap-4 text-sm xs:text-base md:text-lg">
					<InfoBubble className="bg-yogurt-60">linear</InfoBubble>
					<InfoBubble className="bg-yogurt-60">55g | bottom-out</InfoBubble>
					<InfoBubble className="bg-yogurt-60">pre-lubed</InfoBubble>
					<InfoBubble className="bg-yogurt-60">3.5mm | travel</InfoBubble>
					<InfoBubble className="bg-yogurt-60">pom | body</InfoBubble>
					<InfoBubble className="bg-yogurt-60">13.6mm | stem</InfoBubble>
					<InfoBubble className="bg-yogurt-60">15mm | spring</InfoBubble>
				</div>
			</section>
		</>
	);
}
