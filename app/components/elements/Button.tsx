import { Link } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import type { Color, MakePropertiesOptional } from "~/lib/util";
import {
	ButtonHTMLAttributes,
	HTMLAttributes,
	ReactNode,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { useState } from "react";

const randomColor = (base?: string, current?: string): Color => {
	const colors = ["accent", "shrub", "blurple", "lilac"];
	const random = () => colors[Math.floor(Math.random() * colors.length)] as Color;
	let color = random();
	while ((base && color === base) || (current && color === current)) color = random();
	return color;
};

const BG_CLASSES: Record<Color, string> = {
	accent: "bg-accent active:bg-accent",
	shrub: "bg-shrub active:bg-shrub",
	blurple: "bg-blurple active:bg-blurple",
	lilac: "bg-lilac active:bg-lilac",
	yogurt: "bg-yogurt active:bg-yogurt",
	cocoa: "bg-cocoa active:bg-cocoa",
};

const HOVER_CLASSES: Record<Color, string> = {
	accent: "hover:enabled:bg-accent group-hover:enabled:bg-accent",
	shrub: "hover:enabled:bg-shrub group-hover:enabled:bg-shrub",
	blurple: "hover:enabled:bg-blurple group-hover:enabled:bg-blurple",
	lilac: "hover:enabled:bg-lilac group-hover:enabled:bg-lilac",
	yogurt: "hover:enabled:bg-yogurt group-hover:enabled:bg-yogurt",
	cocoa: "hover:enabled:bg-cocoa group-hover:enabled:bg-cocoa",
};

const LINK_HOVER_CLASSES: Record<Color, string> = {
	accent: "hover:bg-accent group-hover:bg-accent",
	shrub: "hover:bg-shrub group-hover:bg-shrub",
	blurple: "hover:bg-blurple group-hover:bg-blurple",
	lilac: "hover:bg-lilac group-hover:bg-lilac",
	yogurt: "hover:bg-yogurt group-hover:bg-yogurt",
	cocoa: "hover:bg-cocoa group-hover:bg-cocoa",
};

function useButtonColors({
	baseColor,
	rainbow = true,
	disabled = false,
	hoverRef,
	hoverClasses,
}: {
	baseColor: Color;
	rainbow?: boolean;
	disabled?: boolean;
	hoverRef?: RefObject<HTMLElement>;
	hoverClasses: Record<Color, string>;
}) {
	const bgClasses = disabled ? "bg-cocoa-80 active:bg-cocoa-80" : BG_CLASSES[baseColor];
	const [hoverColor, setHoverColor] = useState(rainbow ? randomColor(baseColor) : baseColor);
	const [nextHoverColor, setNextHoverColor] = useState(() =>
		rainbow ? randomColor(baseColor, hoverColor) : baseColor,
	);
	const hoverBgClasses = useMemo(() => hoverClasses[hoverColor], [hoverColor, hoverClasses]);

	const updateHoverColor = useCallback(() => {
		setHoverColor(nextHoverColor);
		setNextHoverColor(randomColor(baseColor, nextHoverColor));
	}, [baseColor, nextHoverColor]);

	const buttonRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const ref = hoverRef?.current ?? buttonRef.current;
		if (!ref) return;

		ref.addEventListener("mouseenter", updateHoverColor);
		ref.addEventListener("focus", updateHoverColor);
		return () => {
			ref.removeEventListener("mouseenter", updateHoverColor);
			ref.removeEventListener("focus", updateHoverColor);
		};
	}, [hoverRef, updateHoverColor]);

	return {
		bgClasses,
		hoverBgClasses,
		buttonRef,
	};
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color: Color;
	rainbow?: boolean;
	disabled?: boolean;
	icon?: ReactNode | undefined | null;
	type?: "button" | "submit" | "reset";
	hoverRef?: RefObject<HTMLElement>;
}
export function Button({
	color: baseColor,
	rainbow = true,
	disabled,
	icon,
	type = "button",
	hoverRef,
	className,
	children,
	...props
}: ButtonProps) {
	const { bgClasses, hoverBgClasses, buttonRef } = useButtonColors({
		baseColor,
		rainbow,
		disabled,
		hoverRef,
		hoverClasses: HOVER_CLASSES,
	});

	return (
		<button
			ref={buttonRef as RefObject<HTMLButtonElement>}
			className={twMerge(
				bgClasses,
				hoverBgClasses,
				`flex items-center justify-center gap-3 rounded-full p-7 w-fit font-medium text-nowrap focus-visible:scale-110 group-focus-visible:scale-110 focus-visible:outline-none group-focus-visible:outline-none disabled:cursor-not-allowed`,
				className,
			)}
			type={type}
			disabled={disabled}
			{...props}>
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

export interface ButtonLinkProps<External extends boolean>
	extends Pick<ButtonProps, "color" | "icon" | "rainbow" | "disabled" | "hoverRef"> {
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
	color: baseColor,
	rainbow = true,
	disabled,
	icon,
	hoverRef,
	url,
	external,
	className,
	children,
	...props
}: MakePropertiesOptional<ButtonLinkProps<External> & PassthroughProps, "to">) {
	const LinkElement = external ? "a" : Link;

	const { bgClasses, hoverBgClasses, buttonRef } = useButtonColors({
		baseColor,
		rainbow,
		disabled,
		hoverRef,
		hoverClasses: LINK_HOVER_CLASSES,
	});

	return (
		<LinkElement
			className={twMerge(
				bgClasses,
				hoverBgClasses,
				`flex items-center justify-center gap-3 rounded-full p-6 w-fit font-medium text-nowrap focus-visible:scale-110 focus-visible:outline-none`,
				className,
			)}
			href={external ? url : undefined}
			to={url}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			ref={buttonRef as RefObject<HTMLAnchorElement>}
			{...props}>
			{children}
			{icon || null}
		</LinkElement>
	);
}
