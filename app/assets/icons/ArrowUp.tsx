import { twMerge } from "tailwind-merge";

export const ArrowUpIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="M2.3 6 7.9.2a.9.9 0 0 1 1.3 0l5.6 5.6a.9.9 0 1 1-1.2 1.3L9.4 3v12.1a.9.9 0 1 1-1.7 0v-12L3.5 7a.9.9 0 0 1-1.2-1Z" />
	</svg>
);
