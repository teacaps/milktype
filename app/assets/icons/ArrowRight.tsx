import { twMerge } from "tailwind-merge";

export const ArrowRightIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="m10.085 2.26 5.656 5.656a.889.889 0 0 1 0 1.257l-5.656 5.656a.889.889 0 1 1-1.257-1.257l4.14-4.139H.89a.889.889 0 1 1 0-1.777h12.077L8.828 3.517a.889.889 0 0 1 1.257-1.257Z" />
	</svg>
);
