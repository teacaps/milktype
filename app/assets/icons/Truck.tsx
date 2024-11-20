import { twMerge } from "tailwind-merge";

export const TruckIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 16 16" className={twMerge("fill-current", className)}>
		<path d="M0 3v1h9.5v7.5h-3a2 2 0 0 0-2-1.5 2 2 0 0 0-2 1.5H2V9H1v3.5h1.6A2 2 0 0 0 4.5 14a2 2 0 0 0 2-1.5h4a2 2 0 0 0 2 1.5 2 2 0 0 0 2-1.5H16V8.3l-1-3-.1-.3h-4.4V3H0Zm.5 2v1H5V5H.5Zm10 1h3.6l.9 2.6v2.9h-.6a2 2 0 0 0-1.9-1.5 2 2 0 0 0-2 1.5V6ZM1 7v1h3V7H1Zm3.5 4c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1Zm8 0c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1-1-1c0-.6.4-1 1-1Z" />
	</svg>
);
