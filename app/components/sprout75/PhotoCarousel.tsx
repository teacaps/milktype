import { LightboxImage } from "~/components/elements/Image";
import { carouselImages } from "./constants";

export function PhotoCarousel() {
	return (
		<section className="w-full flex flex-col xl:flex-row my-16 lg:my-24 lg:mx-auto xl:justify-between xl:gap-x-24">
			<div className="w-full my-4 lg:mx-auto pr-8 pl-0 xs:px-8 md:px-16 lg:px-12 scroll-px-8 md:scroll-px-16 xl:scroll-px-64 snap-x snap-mandatory flex flex-row lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-8 overflow-x-scroll lg:overflow-auto">
				{carouselImages.map((image) => (
					<LightboxImage
						key={image.src}
						className="xl:flex-1 h-44 xs:h-44 sm:h-56 lg:h-auto lg:w-full flex items-center justify-center bg-yogurt-60 rounded-2xl"
						{...image}></LightboxImage>
				))}
			</div>
		</section>
	);
}
