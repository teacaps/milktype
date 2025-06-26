import { LightboxImage, Image } from "~/components/elements/Image";
import { ArrowUpIcon } from "~/assets/icons/ArrowUp";
import { BluetoothIcon } from "~/assets/icons/Bluetooth";
import { BatteryIcon } from "~/assets/icons/Battery";
import { Photos, Renders } from "./constants";

export function UseCaseSections() {
	return (
		<>
			{/* Gaming */}
			<section className="w-full mt-36 xs:mt-48 flex flex-col items-center px-8 sm:px-0 md:px-16">
				<h3 className="text-center text-shrub text-4xl font-semibold mb-8 sm:mb-16">
					sprout for <span className="text-blurple italic">gaming</span>
				</h3>
				<div className="mx-auto w-full grid grid-cols-2 grid-rows-5 xs:grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 max-w-lg md:max-w-screen-lg">
					<LightboxImage
						{...Photos.SproutForGaming}
						button={{
							className: "col-span-full row-span-3 xs:row-span-2 md:col-span-2 md:row-span-full",
						}}
						className="h-full w-full rounded-3xl"
					/>
					<div className="bg-blurple min-h-32 flex flex-col items-center justify-center col-span-1 row-span-2 xs:row-span-1 rounded-3xl">
						<span className="inline-flex justify-end h-9 sm:h-11 text-yogurt-100 text-3xl sm:text-4xl italic tracking-wide">
							<span className="font-semibold">1000</span>hz
						</span>
						<span className="text-yogurt-100 text-base sm:text-lg font-medium">with usb receiver</span>
					</div>
					<div className="bg-shrub flex flex-col items-center justify-center col-span-1 row-span-2 xs:row-span-1 rounded-3xl">
						<div className="h-9 sm:h-11 flex flex-row gap-x-1.5 sm:gap-x-3 items-center">
							<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
								<ArrowUpIcon className="w-3 sm:w-4 h-auto" />
							</div>
							<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
								<ArrowUpIcon className="w-3 sm:w-4 h-auto" />
							</div>
							<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
								<ArrowUpIcon className="w-3 sm:w-4 h-auto rotate-180" />
							</div>
							<div className="flex items-center justify-center aspect-square p-1 sm:p-2 border-2 border-yogurt-100 rounded-lg text-yogurt-100">
								<ArrowUpIcon className="w-3 sm:w-4 h-auto rotate-180" />
							</div>
						</div>
						<span className="w-full px-1 sm:px-0 text-center text-yogurt-100 text-base sm:text-lg font-medium leading-tight">
							programmable macros
						</span>
					</div>
				</div>
				<p className="text-balance text-center text-cocoa-100 text-lg sm:text-xl font-medium max-w-lg md:max-w-[50ch] mx-auto mt-8 sm:mt-12">
					a 1000hz polling rate and buttery smooth switches mean pixel perfect actuation and zero fatigue
					during marathon sessions.
				</p>
			</section>

			{/* Creation */}
			<section className="w-full mt-24 xs:mt-36 flex flex-col items-center px-8 sm:px-0 md:px-16">
				<h3 className="text-center text-shrub text-4xl font-semibold mb-8 sm:mb-16">
					sprout for <span className="text-cherry italic">creation</span>
				</h3>
				<div className="mx-auto w-full grid grid-cols-2 grid-rows-5 xs:grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 max-w-lg md:max-w-screen-lg">
					<LightboxImage
						{...Photos.SproutForCreation}
						button={{
							className: "col-span-full row-span-3 xs:row-span-2 md:col-span-2 md:row-span-full",
						}}
						className="h-full w-full rounded-3xl"
					/>
					<div className="bg-cherry min-h-32 flex flex-col xs:flex-row md:flex-row-reverse px-4 md:px-8 lg:px-12 gap-x-2 items-center justify-center col-span-1 row-span-2 xs:row-span-1 rounded-3xl">
						<Image {...Renders.KnobTransparent} className="h-auto w-1/3" />
						<span className="w-full md:w-auto mx-2 xs:mr-1 sm:mr-2 text-yogurt-100 text-base sm:text-lg md:text-base lg:text-xl text-balance text-center xs:text-right font-medium !leading-snug">
							built for creative cloud, CAD, and more
						</span>
					</div>
					<div className="bg-blurple flex flex-col items-center justify-center gap-1.5 col-span-1 row-span-2 xs:row-span-1 rounded-3xl">
						<BatteryIcon className="h-7 text-yogurt-100" />
						<span className="mx-2 text-yogurt-100 text-base sm:text-lg md:text-base lg:text-xl text-balance text-center font-medium !leading-snug">
							a month of battery on a single charge
						</span>
					</div>
				</div>
				<p className="text-balance text-center text-cocoa-100 text-lg sm:text-xl font-medium max-w-lg md:max-w-[50ch] mx-auto mt-8 sm:mt-12">
					the programmable encoder knob lets you zoom timelines, scrub layers, and dial in brush size, all
					without ever leaving your keyboard.
				</p>
			</section>

			{/* Productivity */}
			<section className="w-full mt-24 xs:mt-36 flex flex-col items-center px-8 sm:px-0 md:px-16">
				<h3 className="text-center text-shrub text-4xl font-semibold mb-8 sm:mb-16">
					sprout for <span className="text-sky italic">productivity</span>
				</h3>
				<div className="mx-auto w-full grid grid-cols-2 grid-rows-5 xs:grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 max-w-lg md:max-w-screen-lg">
					<LightboxImage
						{...Photos.SproutForProductivity}
						button={{
							className: "col-span-full row-span-3 xs:row-span-2 md:col-span-2 md:row-span-full",
						}}
						className="h-full w-full rounded-3xl"
					/>
					<div className="bg-shrub flex flex-col items-center justify-center gap-1.5 col-span-1 row-span-2 xs:row-span-1 rounded-3xl">
						<BluetoothIcon className="h-7 text-yogurt-100" />
						<span className="text-yogurt-100 text-base sm:text-lg md:text-base lg:text-xl text-balance text-center font-medium !leading-snug">
							on-the-go ready
						</span>
					</div>
					<div className="p-4 bg-cherry flex flex-col items-center justify-center gap-y-1 sm:gap-y-2 col-span-1 row-span-2 xs:row-span-1 rounded-3xl">
						<div className="h-9 sm:h-11 flex flex-row gap-1 xs:gap-1.5 sm:gap-3 items-center">
							<div className="flex items-center justify-center h-full px-1.5 xs:px-2 sm:px-3 border-2 border-yogurt-100 rounded-xl text-yogurt-100">
								<span className="text-yogurt-100 font-medium text-lg sm:text-xl">ctrl</span>
							</div>
							<div className="flex items-center justify-center h-full px-1.5 xs:px-2 sm:px-3 border-2 border-yogurt-100 rounded-xl text-yogurt-100">
								<span className="text-yogurt-100 font-medium text-lg sm:text-xl">alt</span>
							</div>
							<div className="flex items-center justify-center h-full px-1.5 xs:px-2 sm:px-3 border-2 border-yogurt-100 rounded-xl text-yogurt-100">
								<span className="text-yogurt-100 font-medium text-lg sm:text-xl">v</span>
							</div>
						</div>
						<span className="mx-2 w-4/5 text-balance text-center text-yogurt-100 text-base sm:text-lg font-medium !leading-snug">
							custom keybinds for every key
						</span>
					</div>
				</div>
				<p className="text-balance text-center text-cocoa-100 text-lg sm:text-xl font-medium max-w-lg md:max-w-[50ch] mx-auto mt-8 sm:mt-12">
					map every key to your heart's desire with our web-based configuration tool,{" "}
					<a href="https://tweak.milktype.co" className="text-accent underline hover:no-underline">
						tweak
					</a>
					.
				</p>
			</section>
		</>
	);
}
