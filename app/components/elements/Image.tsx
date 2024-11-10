import { twMerge } from "tailwind-merge";
import YARLightbox from "yet-another-react-lightbox";
import ZoomPlugin from "yet-another-react-lightbox/plugins/zoom";
import { type ButtonHTMLAttributes, type ImgHTMLAttributes, useState } from "react";

const IMAGE_URL_PREFIX = "https://img.milktype.co/cdn-cgi/image";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	big?: boolean;
}

export function Image({ src, alt, className, big, ...props }: ImageProps) {
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
				{...props}
			/>
		</>
	);
}

export function LightboxImage({
	button,
	...imageProps
}: ImageProps & { button?: ButtonHTMLAttributes<HTMLButtonElement> }) {
	const [open, setOpen] = useState(false);
	const { srcSmall, srcFull } = makeSrcs(imageProps.src);
	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label="Open image in full screen"
				{...button}
				className={twMerge("focus-visible:outline-none", button?.className)}>
				<Image {...imageProps} />
			</button>
			<YARLightbox
				open={open}
				close={() => setOpen(false)}
				plugins={[ZoomPlugin]}
				slides={[
					{
						src: srcFull,
						alt: imageProps.alt,
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
	const srcSmall = IMAGE_URL_PREFIX + "/width=768,format=auto,quality=65/" + path;
	const srcFull = IMAGE_URL_PREFIX + "/width=2000,format=auto/" + path;
	const srcset = `${srcSmall} 768w, ${srcFull} 2000w`;
	return { srcset, srcSmall, srcFull };
}
