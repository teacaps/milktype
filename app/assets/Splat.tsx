import type { ReactNode } from "react";
import { twJoin, twMerge } from "tailwind-merge";

export const Splat = ({
	className,
	splatClasses,
	children,
}: {
	className?: string;
	splatClasses?: string;
	children?: ReactNode;
}) => (
	<div className={twJoin("relative aspect-square", className)}>
		<svg viewBox="0 0 253 257" className={twMerge("max-h-full max-w-full fill-current", splatClasses)}>
			<path d="m126.305.36 19.551 17.071 24.208-9.352L182.6 30.811l25.945-.505 4.009 25.65 24.553 8.404-5.002 25.475 20.2 16.298-13.41 22.227 13.41 22.227-20.2 16.298 5.002 25.475-24.553 8.403-4.009 25.651-25.945-.505-12.536 22.732-24.208-9.352-19.551 17.071-19.551-17.071-24.209 9.352-12.536-22.732-25.945.505-4.009-25.651-24.553-8.403 5.002-25.475-20.2-16.298 13.41-22.227-13.41-22.227 20.2-16.298-5.002-25.475 24.553-8.404 4.009-25.65 25.945.505L82.545 8.079l24.209 9.352L126.305.36Z" />
		</svg>
		<div className="absolute inset-0 flex items-center justify-center">{children}</div>
	</div>
);
