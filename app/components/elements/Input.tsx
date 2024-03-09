import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Input({
	children,
	className,
	...props
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
	return (
		<input
			className={twMerge(
				"bg-transparent border-0 outline-none -mb-px text-cocoa-120 font-medium placeholder-cocoa-80 placeholder:font-medium border-b-2 border-b-cocoa-80 hover:border-b-accent active:border-b-accent focus:border-b-accent",
				className,
			)}
			{...props}>
			{children}
		</input>
	);
}
