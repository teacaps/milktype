import { Image } from "~/components/elements/Image";
import { Photos } from "./constants";

export function NoveltiesSection() {
	return (
		<section className="w-full mt-24 xs:mt-36 lg:mt-16 flex flex-col-reverse items-center lg:flex-row lg:items-end lg:justify-end px-8 xl:pl-0 xl:pr-32">
			<div className="mt-8 lg:mb-8 space-y-4 lg:flex-shrink-0 w-4/5 max-w-lg lg:max-w-[30ch] xl:max-w-[50ch] text-balance">
				<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
					included <span className="text-blurple">novelty</span> keycaps
				</h2>
				<p className="xs:text-lg xl:text-xl xs:font-medium">
					every board comes with a 6-pack of novelty keycaps, inspired by furry friends and cozy
					vibes.
					warm brown and cream tones bring brown sugar boba to life in sprout.
				</p>
			</div>
			<div className="relative lg:self-end w-4/5 max-w-lg lg:w-full lg:max-w-xl 2xl:max-w-2xl lg:h-unset">
				<Image {...Photos.NoveltiesCloseUp} className="w-full rounded-3xl" />
			</div>
		</section>
	);
}
