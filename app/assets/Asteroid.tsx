import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Asteroid = ({
	className,
	asteroidClasses,
	children,
}: {
	className?: string;
	asteroidClasses?: string;
	children?: ReactNode;
}) => (
	<div className={twMerge("relative aspect-square", className)}>
		<svg viewBox="0 0 107 107" className={twMerge("max-h-full max-w-full fill-current", asteroidClasses)}>
			<path d="M76.4 8c2.6-1 5.7.7 6 3.5L85 34c.2 1.2.8 2.3 1.7 3L105 50.5a4.3 4.3 0 0 1 0 7L86.7 71c-1 .7-1.5 1.8-1.7 3l-2.6 22.5a4.3 4.3 0 0 1-6 3.5l-20.8-9a4.3 4.3 0 0 0-3.5 0l-20.7 9a4.3 4.3 0 0 1-6-3.5L22.6 74a4.3 4.3 0 0 0-1.7-3L2.8 57.5a4.3 4.3 0 0 1 0-7L21 37a4 4 0 0 0 1.7-3l2.6-22.5a4.3 4.3 0 0 1 6-3.4l20.8 9c1.1.4 2.4.4 3.5 0l20.8-9Z" />
		</svg>
		<div className="absolute inset-0 flex items-center justify-center">{children}</div>
	</div>
);
