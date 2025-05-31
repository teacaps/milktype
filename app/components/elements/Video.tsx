import { type VideoHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
	src: string;
	alt: string;
}

export function Video({ src, alt, className, ...props }: VideoProps) {
	return (
		<>
			<video
				src={`https://img.milktype.co/${src}`}
				aria-label={alt}
				className={twMerge("object-cover object-center", className)}
				{...props}
			/>
		</>
	);
}
