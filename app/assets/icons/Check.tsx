import { twMerge } from "tailwind-merge";

export const CheckIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="M11.5 5.1c.2.2.2.5 0 .7l-4.3 4.4c-.2.2-.6.2-.7 0l-2-2a.5.5 0 1 1 .7-.7l1.6 1.6 4-4c.2-.2.5-.2.7 0Z" />
	</svg>
);
