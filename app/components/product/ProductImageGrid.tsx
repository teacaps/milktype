import { useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

const makeSquareAtIndexTakeUpWholeGrid = [
	"grid-cols-[1fr,0fr,0fr] grid-rows-[1fr,0fr,0fr]", // 0 1 2
	"grid-cols-[0fr,1fr,0fr] grid-rows-[1fr,0fr,0fr]", // 3   4
	"grid-cols-[0fr,0fr,1fr] grid-rows-[1fr,0fr,0fr]", //     5
	"grid-cols-[1fr,0fr,0fr] grid-rows-[0fr,1fr,0fr]",
	"grid-cols-[0fr,0fr,1fr] grid-rows-[0fr,1fr,0fr]",
	"grid-cols-[0fr,0fr,1fr] grid-rows-[0fr,0fr,1fr]",
];

export function ProductImageGrid({ images }: { images: Array<string> }) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const onHover = (index: number) => setHoveredIndex(index);
	const onLeave = () => setHoveredIndex(null);
	const onClick = (index: number) => (hoveredIndex === null ? onHover(index) : onLeave());

	return (
		<div
			className={twJoin(
				"aspect-square rounded-2xl sm:rounded-3xl grid transition-all duration-700 ease-in-out",
				hoveredIndex !== null
					? makeSquareAtIndexTakeUpWholeGrid[hoveredIndex] + " gap-0"
					: "grid-cols-[1fr,1fr,1fr] grid-rows-[1fr,1fr,1fr] gap-3",
			)}
			onMouseLeave={onLeave}>
			{images.map((url, i) => (
				<div
					key={url}
					className={twMerge(
						`col-span-1 row-span-1 min-h-0 min-w-0 bg-shrub rounded-2xl sm:rounded-3xl opacity-100 transition-opacity duration-700 ease-in-out focus-visible:scale-110 focus-visible:outline-none focus-visible:ring focus-visible:ring-accent`,
						i === 3 && "col-span-2 row-span-2",
						hoveredIndex !== null && hoveredIndex !== i && "opacity-0",
					)}
					onMouseEnter={() => onHover(i)}
					onMouseLeave={onLeave}
					onClick={() => onClick(i)}
					onKeyDown={(ev) => ev.key === "Enter" && onClick(i)}
					role="button"
					tabIndex={0}
					aria-label={`Expand image ${i + 1}`}>
					<img
						src={url}
						alt={`Image ${i + 1}`}
						className="object-cover object-center w-full h-full rounded-2xl sm:rounded-3xl"
					/>
				</div>
			))}
		</div>
	);
}
