import { type VideoHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
	src: string;
	alt: string;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src, alt, poster, className, ...props }, ref) => {
	return (
		<>
			<video
				src={src.startsWith("http") ? src : `https://img.milktype.co/${src}`}
				aria-label={alt}
				poster={!poster || poster?.startsWith("http") ? poster : `https://img.milktype.co/${poster}`}
				className={twMerge("object-cover object-center", className)}
				ref={ref}
				{...props}
			/>
		</>
	);
});
