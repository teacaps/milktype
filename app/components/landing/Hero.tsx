import { Container } from "~/components/global/Container";
import { HeartIcon } from "~/assets/icons/Heart";
import { VerticalSpaghetti } from "~/assets/Spaghetti";
import { Milkleaf } from "~/assets/Milkleaf";
import { Image } from "~/components/elements/Image";

export function Hero() {
	return (
		<Container className="py-8 md:py-16 flex flex-col items-center gap-y-16 md:flex-row">
			<div className="flex flex-col items-center md:items-start space-y-5 self-center text-3xl xl:text-4xl text-cocoa-120 leading-tight font-medium pr-8 w-3/5 lg:w-5/12">
				<h1 className="text-center md:text-left">
					<span className="whitespace-nowrap">adorable accessories</span>
					<br className="md:hidden" />{" "}
					<span className="whitespace-nowrap">
						for people we{" "}
						<HeartIcon className="inline-flex -mt-0.5 xl:-mt-1 ml-0.5 xl:ml-1 h-5 xl:h-6 fill-accent" />
					</span>
				</h1>
				<VerticalSpaghetti className="w-5 text-accent" />
				<h2 className="text-center md:text-left">hi,&nbsp;we&#39;re milktype</h2>
			</div>
			<div className="h-auto flex flex-row gap-5 md:ml-auto">
				<a
					aria-label="Sprout 75 product page"
					href="/sprout75"
					className="flex items-center justify-center w-32 lg:w-44 h-[17.25rem] lg:h-auto bg-accent rounded-full hover:motion-safe:animate-boogie hover:motion-reduce:bg-blurple">
					<Image
						src="web/KnobFloating.png"
						alt=""
						className="object-cover object-center w-full rounded-full h-fulls"
					/>
				</a>
				<div className="flex flex-col gap-5">
					<div className="group">
						<div className="h-32 w-32 lg:h-44 lg:w-44 bg-shrub rounded-t-full group-hover:motion-safe:animate-bounce group-hover:motion-reduce:bg-blurple">
							<Image
								src="web/FloatingKeycap.png"
								alt=""
								className="object-cover object-center w-full h-full rounded-t-full"
							/>
						</div>
					</div>
					<div className="flex items-center justify-center h-32 w-32 lg:h-44 lg:w-44 bg-lilac rounded-full hover:motion-safe:animate-spin">
						<Milkleaf className="w-8 h-8 lg:w-12 lg:h-12 text-yogurt-100" />
					</div>
				</div>
			</div>
		</Container>
	);
}
