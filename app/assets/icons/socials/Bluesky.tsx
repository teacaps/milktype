import { twMerge } from "tailwind-merge";

export const BlueskyIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 32 32" className={twMerge("fill-current", className)}>
		<path d="M10 7.8c2.5 1.9 5.2 5.7 6.2 7.8 1-2 3.7-6 6.2-7.8 1.8-1.4 4.8-2.5 4.8.9 0 .7-.4 5.7-.6 6.5-.8 2.8-3.7 3.5-6.2 3 4.4.8 5.6 3.4 3.1 5.9-4.6 4.7-6.7-1.2-7.2-2.8l-.1-.3-.2.3c-.5 1.6-2.5 7.5-7.2 2.8-2.4-2.5-1.3-5 3.2-5.8-2.6.4-5.4-.3-6.2-3.1-.2-.8-.6-5.8-.6-6.5 0-3.4 3-2.3 4.7-1Z" />
	</svg>
);
