import { Link } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import type { Color, MakePropertiesOptional } from "~/lib/util";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { useState } from "react";

const randomColor = (base?: string, current?: string): Color => {
	const colors = ["accent", "shrub", "blurple", "lilac"];
	const random = () => colors[Math.floor(Math.random() * colors.length)] as Color;
	let color = random();
	while ((base && color === base) || (current && color === current)) color = random();
	return color;
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color: Color;
	disabled?: boolean;
	icon?: ReactNode | undefined | null;
	type?: "button" | "submit" | "reset";
}
export function Button({
	color: baseColor,
	disabled,
	icon,
	type = "button",
	className,
	children,
	...props
}: ButtonProps) {
	const color = disabled ? "cocoa-80" : `${baseColor}`;
	const [hoverColor, setHoverColor] = useState(randomColor(color));
	return (
		<button
			className={twMerge(
				`bg-${color} hover:enabled:bg-${hoverColor} active:bg-${color}`,
				`flex items-center justify-center gap-3 rounded-full p-7 w-fit font-medium disabled:cursor-not-allowed`,
				className,
			)}
			type={type}
			disabled={disabled}
			{...props}
			onMouseEnter={(ev) => {
				props.onMouseEnter?.(ev);
				if (!disabled) setHoverColor(randomColor(color, hoverColor));
			}}
			onFocus={(ev) => {
				props.onFocus?.(ev);
				if (!disabled) setHoverColor(randomColor(color, hoverColor));
			}}>
			{children}
			{icon || null}
		</button>
	);
}

export function UnstyledButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={twMerge(
				"border-0 border-none bg-transparent p-0 outline-none hover:font-medium active:font-bold disabled:cursor-not-allowed disabled:font-bold",
				className,
			)}
			{...props}>
			{children}
		</button>
	);
}

export interface ButtonLinkProps<External extends boolean> extends Pick<ButtonProps, "color" | "icon"> {
	url: string;
	external?: External;
}
export function ButtonLink<
	External extends boolean,
	PassthroughProps extends External extends true
		? HTMLAttributes<HTMLAnchorElement>
		: Parameters<typeof Link>[0] = External extends true
		? HTMLAttributes<HTMLAnchorElement>
		: Parameters<typeof Link>[0],
>({
	color,
	icon,
	url,
	external,
	className,
	children,
	...props
}: MakePropertiesOptional<ButtonLinkProps<External> & PassthroughProps, "to">) {
	const LinkElement = external ? "a" : Link;
	const [hoverColor, setHoverColor] = useState(randomColor(color));
	return (
		<LinkElement
			className={twMerge(
				`bg-${color} hover:bg-${hoverColor} active:bg-${color}`,
				`flex items-center justify-center gap-3 rounded-full p-7 w-fit font-medium`,
				className,
			)}
			href={external ? url : undefined}
			to={url}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			{...props}
			onMouseEnter={(ev) => {
				props.onMouseEnter?.(ev);
				setHoverColor(randomColor(color, hoverColor));
			}}
			onFocus={(ev) => {
				props.onFocus?.(ev);
				setHoverColor(randomColor(color, hoverColor));
			}}>
			{children}
			{icon || null}
		</LinkElement>
	);
}
