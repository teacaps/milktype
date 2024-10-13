export function InfoBubble({ children }: { children: string }) {
	const [highlighted, rest] = children.split("|");
	return (
		<div className="flex items-center justify-center p-3 lg:px-5 lg:py-4 font-medium text-cocoa-100 bg-yogurt-60 rounded-xl lg:rounded-2xl">
			<span className="font-bold">{highlighted}</span>&nbsp;<span>{rest}</span>
		</div>
	);
}
