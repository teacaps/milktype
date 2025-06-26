import { Video } from "~/components/elements/Video";
import { Videos, Photos } from "./constants";

export function FeatureGrid() {
	return (
		<section className="mx-auto w-full mt-36 xs:mt-48 px-8 sm:px-12 md:px-16 grid grid-cols-1 gap-x-16 gap-y-20 md:gap-x-32 md:grid-cols-2 md:grid-rows-2 max-w-xl md:max-w-screen-xl">
			<div className="relative flex-col w-full">
				<Video
					{...Videos.RearWeightVid}
					className="w-full aspect-square rounded-3xl"
					autoPlay={true}
					loop={true}
					controls={false}
					muted={true}
					playsInline={true}
					poster={Photos.Photo2.src}
				/>
				<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
					<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
						polished mirror backpiece
					</h2>
					<p className="xs:text-lg xl:text-xl xs:font-medium">
						polished stainless steel, pvd coated for a flawless mirror shine. reflects your workspace, adds satisfying heft, and sounds great with every keystroke.
					</p>
				</div>
			</div>
			<div className="relative flex-col w-full">
				<Video
					{...Videos.SwitchVid}
					className="w-full aspect-square rounded-3xl"
					autoPlay={true}
					loop={true}
					controls={false}
					muted={true}
					playsInline={true}
					poster={Photos.Photo5.src}
				/>
				<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
					<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">fully customizable</h2>
					<p className="xs:text-lg xl:text-xl xs:font-medium">
						with standard cherry style keycaps and switches, every part is waiting to be made yours. try your own keycaps or switches with sprout's hotswap pcb.
					</p>
				</div>
			</div>
			<div className="relative flex-col w-full">
				<Video
					{...Videos.GasketMountVid}
					className="w-full aspect-square rounded-3xl"
					autoPlay={true}
					loop={true}
					controls={false}
					muted={true}
					playsInline={true}
					poster={Photos.Photo6.src}
				/>
				<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
					<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">
						tuned for perfection
					</h2>
					<p className="xs:text-lg xl:text-xl xs:font-medium">
						aluminum case, maximum flex construction, and acoustic foam included by default, all for the
						ideal sound and feel.
					</p>
				</div>
			</div>
			<div className="relative flex-col w-full">
				<Video
					{...Videos.DeskpadVid}
					className="w-full aspect-square rounded-3xl"
					autoPlay={true}
					loop={true}
					controls={false}
					muted={true}
					playsInline={true}
					poster={Photos.Photo1.src}
				/>
				<div className="mt-12 space-y-4 md:max-w-[30ch] xl:max-w-[40ch] text-balance">
					<h2 className="text-2xl xs:text-3xl xl:text-4xl font-medium text-cocoa-120">sweeten your setup</h2>
					<p className="xs:text-lg xl:text-xl xs:font-medium">
						with the matching <span className="text-[#A8593F]">brown sugar boba deskpad</span>, perfectly
						sized to fit all workspaces. available as a bundle for a discount.
					</p>
				</div>
			</div>
		</section>
	);
}
