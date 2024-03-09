import type { DetailedHTMLProps, ElementType, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type ContainerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	as?: ElementType;
};
export function Container({ children, className, as = "div", ...props }: ContainerProps) {
	const Component = as;
	return (
		<Component
			className={twMerge("px-8 sm:mx-auto sm:w-4/5 sm:px-12 lg:px-16 xl:max-w-screen-xl", className)}
			{...props}>
			{children}
		</Component>
	);
}
