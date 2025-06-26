import { ScrollLinkedVideo } from "../anim/ScrollLinkedVideo";
import { Videos } from "./constants";

export function KeycapsSection() {
	return (
		<section className="w-full mt-16 xs:mt-36 flex flex-col md:flex-row md:px-12 items-center justify-center">
			<div className="w-full aspect-square max-w-lg relative md:-ml-32">
				<ScrollLinkedVideo
					transitionSpeed={20}
					frameThreshold={0.02}
					src={`https://img.milktype.co/${Videos.KeycapSpinVid.src}`}
					sticky={false}
					full={false}
				/>
			</div>
			<div className="z-10 flex flex-col items-center md:-ml-8 gap-y-4 max-w-lg md:max-w-[30ch] xl:max-w-[40ch] text-balance text-center lg:text-left">
				<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120 -mt-16 lg:mt-0">
					built with premium
					<wbr /> <span className="text-shrub">pbt keycaps</span>
				</h2>
				<p className="mr-4 xs:text-lg xl:text-xl xs:font-medium">
					deliciously soft kca profile keycaps, dye-sublimated for text that never fades, and 1.6mm thick pbt
					plastic that never shines.
				</p>
			</div>
		</section>
	);
}
