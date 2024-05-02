import { twMerge } from "tailwind-merge";

export const InstagramIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 32 32" className={twMerge("fill-current", className)}>
		<path d="M16.7 5.7h3.1c1 0 1.8.2 2.4.5a5 5 0 0 1 3 3c.2.5.3 1.3.4 2.3v8.3c0 1-.2 1.8-.5 2.4-.2.7-.6 1.3-1.1 1.8a5 5 0 0 1-1.8 1.1c-.6.3-1.4.4-2.4.5h-8.3c-1 0-1.8-.2-2.4-.5a4.9 4.9 0 0 1-3-3c-.2-.5-.3-1.3-.4-2.3v-8.3c0-1 .2-1.8.5-2.4a4.9 4.9 0 0 1 3-3c.5-.2 1.3-.3 2.3-.4h5.1Zm-1 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6m5.2-3.5a1.3 1.3 0 1 0 0 2.5 1.3 1.3 0 0 0 0-2.5Z" />
	</svg>
);
