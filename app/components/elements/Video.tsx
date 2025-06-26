import { type VideoHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
	src: string;
	alt: string;
}

export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src, alt, className, ...props }, ref) => {
	return (
		<>
			<video
				src={`https://img.milktype.co/${src}`}
				aria-label={alt}
				className={twMerge("object-cover object-center", className)}
				ref={ref}
				{...props}
			/>
		</>
	);
});
