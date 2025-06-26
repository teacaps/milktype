import { useRef, useEffect } from "react";
import { Video } from "~/components/elements/Video";
import { ButtonLink } from "~/components/elements/Button";
import { TweakWordmark } from "~/assets/sprout75/TweakWordmark";
import { Keymap } from "~/assets/sprout75/Keymap";
import { Pointer } from "~/assets/sprout75/Pointer";
import { BrowseToTweak } from "~/assets/sprout75/BrowseToTweak";
import { Videos } from "./constants";

export function TweakSection() {
	const knobSpinRef = useRef<HTMLVideoElement>(null);
	const knobUseCasesRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const syncVideos = () => {
			if (knobSpinRef.current && knobUseCasesRef.current) {
				const useCasesVideo = knobUseCasesRef.current;
				const spinVideo = knobSpinRef.current;

				const useCasesDuration = useCasesVideo.duration;
				const spinDuration = spinVideo.duration;

				if (useCasesDuration && spinDuration) {
					const ratio = spinDuration / useCasesDuration;

					const handleTimeUpdate = () => {
						const useCasesTime = useCasesVideo.currentTime;
						const expectedSpinTime = (useCasesTime * (1 / ratio)) % spinDuration;

						if (Math.abs(spinVideo.currentTime - expectedSpinTime) > 0.1) {
							spinVideo.currentTime = expectedSpinTime;
						}
					};

					useCasesVideo.addEventListener("timeupdate", handleTimeUpdate);

					Promise.all([spinVideo.play(), useCasesVideo.play()]).catch(console.error);

					return () => {
						useCasesVideo.removeEventListener("timeupdate", handleTimeUpdate);
					};
				}
			}
		};

		const onLoadedMetadata = () => {
			syncVideos();
		};

		if (knobUseCasesRef.current) {
			knobUseCasesRef.current.addEventListener("loadedmetadata", onLoadedMetadata);
		}

		return () => {
			if (knobUseCasesRef.current) {
				knobUseCasesRef.current.removeEventListener("loadedmetadata", onLoadedMetadata);
			}
		};
	}, []);

	return (
		<section className="w-full mt-32 lg:mt-20 flex flex-col items-center px-8 sm:px-0 md:px-16">
			<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120 text-center text-balance max-w-[20ch]">
				customize the <span className="text-nowrap italic text-[#A9593F]">boba knob</span> for any workflow
			</h2>
			<Video
				{...Videos.KnobSpinVid}
				ref={knobSpinRef}
				className="w-full mt-8 aspect-square max-w-lg rounded-2xl"
				autoPlay={false}
				loop={true}
				controls={false}
				muted={true}
				playsInline={true}
			/>
			<Video
				{...Videos.KnobUseCasesVid}
				ref={knobUseCasesRef}
				className="w-full mt-8 aspect-video max-w-lg rounded-2xl"
				autoPlay={false}
				loop={true}
				controls={false}
				muted={true}
				playsInline={true}
			/>
			<span className="mt-8 text-xl text-cocoa-80 italic font-medium">configure with</span>
			<TweakWordmark className="w-full max-w-64" />
			<div className="mt-10 grid grid-cols-2 grid-rows-3 gap-4 w-full max-w-lg md:max-w-screen-lg">
				<div className="col-span-1 row-span-1 flex items-center justify-center aspect-[4/5] sm:aspect-square md:aspect-[2/1] bg-blurple rounded-xl">
					<span className="text-yogurt-100 xs:text-lg lg:text-xl font-medium text-center w-4/5 max-w-[30ch] text-balance">
						make sprout 75 yours with our simple to use keyboard customization tool. intuitive and browser-based for quick adjustments.
						<br className="hidden xs:block" />
						<br />
						powered by via
					</span>
				</div>
				<div className="col-span-1 row-span-1 flex items-center justify-center aspect-[4/5] sm:aspect-square md:aspect-[2/1] bg-[#F4B499] rounded-xl relative overflow-clip">
					<Keymap className="absolute top-0 md:top-unset md:bottom-0 left-0 h-full md:w-[120%] md:h-unset" />
				</div>
				<div className="col-span-2 row-span-1 flex flex-col gap-3 xs:gap-6 lg:gap-12 items-center justify-center bg-yogurt-60 rounded-xl">
					<span className="text-cocoa-100 xs:text-lg lg:text-xl font-medium text-center w-full sm:w-4/5 max-w-[30ch] text-balance">
						advanced users — customize it all with <span className="text-blurple">tweak</span>. from lighting to macros, we've
						got you covered.
					</span>
					<div className="w-4/5 py-4 grid grid-cols-3 grid-rows-2 md:grid-cols-6 md:grid-rows-1 gap-2 xs:gap-3 text-base lg:text-lg">
						<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
							basic
						</div>
						<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
							media
						</div>
						<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
							macro
						</div>
						<div className="relative flex items-center justify-center px-5 py-1 rounded-xl font-semibold bg-accent text-yogurt-100">
							layers
							<Pointer className="absolute -bottom-2 -right-1 w-7" />
						</div>
						<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
							special
						</div>
						<div className="flex items-center justify-center px-5 py-1 text-cocoa-100 bg-yogurt-60 rounded-xl font-semibold border border-cocoa-100">
							lighting
						</div>
					</div>
				</div>
				<div className="col-span-1 row-span-1 flex flex-col pt-5 items-center bg-yogurt-60 aspect-[4/5] sm:aspect-square md:aspect-[2/1] rounded-xl relative overflow-clip">
					<span className="text-cocoa-100 text-xl lg:text-2xl font-medium text-center w-full sm:w-4/5 text-balance">
						no <span className="text-blurple italic">installation</span>.<br />
						no <span className="text-shrub">hassle</span>.
					</span>
					<BrowseToTweak className="absolute -bottom-12 xs:-bottom-6 -right-32 md:-bottom-20 md:-right-12 xl:-bottom-40 xl:-right-48 h-3/4 md:w-full md:h-unset xl:w-[120%]" />
				</div>
				<ButtonLink
					url="https://tweak.milktype.co"
					color="shrub"
					className="col-span-1 row-span-1 flex items-center justify-center aspect-[4/5] sm:aspect-square md:aspect-[2/1] rounded-xl">
					<span className="text-yogurt-100 text-xl lg:text-2xl font-medium text-center w-full sm:w-4/5 text-balance">
						open tweak in your browser ↗
					</span>
				</ButtonLink>
			</div>
		</section>
	);
}
