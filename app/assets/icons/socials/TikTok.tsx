import { twMerge } from "tailwind-merge";

export const TikTokIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 32 32" className={twMerge("fill-current", className)}>
		<path d="M22 9c-.8-1-1.3-2.2-1.3-3.5H17v15a3.1 3.1 0 0 1-6.3 0c0-2.2 2-3.7 4-3v-4a7 7 0 1 0 6 7v-7.7a9 9 0 0 0 5.2 1.7v-3.8s-2.2.1-3.9-1.8Z" />
	</svg>
);
