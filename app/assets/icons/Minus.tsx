import { twMerge } from "tailwind-merge";

export const MinusIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="M5 8c0-.3.2-.5.5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 5 8Z" />
	</svg>
);
