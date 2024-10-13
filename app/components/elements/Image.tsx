import { twMerge } from "tailwind-merge";
import YARLightbox from "yet-another-react-lightbox";
import ZoomPlugin from "yet-another-react-lightbox/plugins/zoom";
import { type ButtonHTMLAttributes, useState } from "react";

const CLOUDINARY_ID = "dpfhkaxk7";
const CLOUDINARY_URL_PREFIX = "https://res.cloudinary.com/" + CLOUDINARY_ID + "/image/upload";

export interface ImageProps {
	src: string;
	alt: string;
	className?: string;
	big?: boolean;
}

export function Image({ src, alt, className, big }: ImageProps) {
	const { srcset, srcFull } = makeSrcs(src);
	const sizes = big ? "(max-width: 768px) 768px, 2000px" : "768px";
	return (
		<>
			<img
				srcSet={srcset}
				sizes={sizes}
				src={srcFull}
				alt={alt}
				className={twMerge("object-cover object-center", className)}
			/>
		</>
	);
}

export function LightboxImage({
	src,
	alt,
	className,
	big,
	button,
}: ImageProps & { button?: ButtonHTMLAttributes<HTMLButtonElement> }) {
	const [open, setOpen] = useState(false);
	const { srcSmall, srcFull } = makeSrcs(src);
	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label="Open image in full screen"
				{...button}
				className={twMerge("focus-visible:outline-none", button?.className)}>
				<Image src={src} alt={alt} className={className} big={big} />
			</button>
			<YARLightbox
				open={open}
				close={() => setOpen(false)}
				plugins={[ZoomPlugin]}
				slides={[
					{
						src: srcFull,
						alt,
						srcSet: [
							{ src: srcSmall, width: 768, height: 768 },
							{ src: srcFull, width: 2000, height: 2000 },
						],
					},
				]}
				controller={{ closeOnPullUp: true, closeOnPullDown: true, closeOnBackdropClick: true }}
				carousel={{ finite: true }}
				render={{ buttonPrev: () => null, buttonNext: () => null }}
			/>
		</>
	);
}

function makeSrcs(path: string) {
	const srcSmall = CLOUDINARY_URL_PREFIX + "/f_auto,q_auto:best,w_768/" + path;
	const srcFull = CLOUDINARY_URL_PREFIX + "/f_auto,q_auto:best,w_2000/" + path;
	const srcset = `${srcSmall} 768w, ${srcFull} 2000w`;
	return { srcset, srcSmall, srcFull };
}
