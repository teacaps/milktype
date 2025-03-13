import { twMerge } from "tailwind-merge";

export const TruckIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={twMerge("fill-current", className)}>
		<path
			fillRule="evenodd"
			d="M18.521 7.813a1.998 1.998 0 0 1 1.56.751l3.506 4.383c.267.347.412.774.413 1.216v3.65a2 2 0 0 1-2 2h-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2H8a1 1 0 1 0 0-2 1 1 0 0 0 0 2H4a2 2 0 0 1-2-2v-11a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v1h2.521Zm-.002 2 3.48 4.352.001 3.648h-1.17a3.001 3.001 0 0 0-5.66 0H10.83a3.001 3.001 0 0 0-5.658 0H4v-11a1.001 1.001 0 0 1 1-1h8c.265 0 .52.105.707.293v3.706h4.812Z"
			clipRule="evenodd"
		/>
		<path d="M16 9.812h-2.293v8h1.464c.17-.48.458-.903.829-1.236V9.812Z" />
		<path
			fillRule="evenodd"
			d="M18 17.813a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM8 17.813a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-3 1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
			clipRule="evenodd"
		/>
	</svg>
);
