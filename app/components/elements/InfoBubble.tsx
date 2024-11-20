import { twMerge } from "tailwind-merge";

export function InfoBubble({ children, className }: { children: string; className?: string }) {
	const [highlighted, rest] = children.split("|");
	return (
		<div
			className={twMerge(
				"flex items-center justify-center p-3 lg:px-5 lg:py-4 font-medium text-cocoa-100 bg-yogurt-60 rounded-xl lg:rounded-2xl",
				className,
			)}>
			<span className="font-bold">{highlighted}</span>&nbsp;<span>{rest}</span>
		</div>
	);
}
