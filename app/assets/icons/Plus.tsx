import { twMerge } from "tailwind-merge";

export const PlusIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="M8 5c.3 0 .5.2.5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2c0-.3.2-.5.5-.5Z" />
	</svg>
);
