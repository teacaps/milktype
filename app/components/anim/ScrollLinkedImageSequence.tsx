import { motion, useScroll, type MotionProps, useMotionValueEvent, useAnimationFrame } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Image as ImageComponent, ImageProps, makeSrcs } from "~/components/elements/Image";

export function ScrollLinkedImageSequence({
	images,
	className,
	...props
}: {
	images: Array<Pick<ImageProps, "src" | "alt">>;
	className?: string;
} & Omit<ImageProps, "src"> &
	MotionProps) {
	const ref = useRef<HTMLImageElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] });
	const [imageIndex, setImageIndex] = useState(0);

	useMotionValueEvent(scrollYProgress, "change", (progress) => {
		setImageIndex(Math.min(images.length - 1, Math.floor(progress * images.length)));
	});

	useAnimationFrame(() => {
		if (!ref.current) return;
		ref.current.src = images[imageIndex].src;
		ref.current.alt = images[imageIndex].alt ?? "";
	});

	useEffect(() => {
		void Promise.all(
			images.map((image) => {
				return new Promise<void>((resolve) => {
					const img = new Image();
					img.onload = () => {
						resolve();
					};
					const { srcSmall, srcFull } = makeSrcs(image.src);
					img.src = props.big ? srcFull : srcSmall;
				});
			}),
		).then(() => {
			console.log("all images loaded");
		});
	}, [images]);

	return <ImageComponent {...(images[imageIndex] ?? images[0])} className={className} ref={ref} {...props} />;
}
