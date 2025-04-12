import { twMerge } from "tailwind-merge";

export const ChevronUpIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="M3.528 10.471c.26.26.683.26.943 0L8 6.943l3.528 3.528a.667.667 0 1 0 .943-.943l-4-4a.667.667 0 0 0-.943 0l-4 4a.667.667 0 0 0 0 .943Z" />
	</svg>
);
