import { twMerge } from "tailwind-merge";

export const ShoppingBagIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="M3.467.933A.667.667 0 0 1 4 .667h8c.21 0 .407.098.533.266l2 2.667a.666.666 0 0 1 .134.4v9.333a2 2 0 0 1-2 2H3.333a2 2 0 0 1-2-2V4c0-.144.047-.285.134-.4l2-2.667ZM4.333 2l-1 1.333h9.334l-1-1.333H4.333Zm9 2.667H2.667v8.666a.667.667 0 0 0 .666.667h9.334a.667.667 0 0 0 .666-.667V4.667Z" />
		<path d="M5.333 6c.368 0 .667.298.667.667a2 2 0 1 0 4 0 .667.667 0 1 1 1.333 0 3.333 3.333 0 0 1-6.666 0c0-.369.298-.667.666-.667Z" />
	</svg>
);
