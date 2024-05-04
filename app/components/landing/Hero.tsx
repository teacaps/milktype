import { Container } from "~/components/global/Container";
import { HeartIcon } from "~/assets/icons/Heart";
import { Spaghetti } from "~/assets/Spaghetti";

export function Hero() {
	return (
		<Container className="py-8 md:py-16 flex flex-col items-center gap-y-16 md:flex-row">
			<div className="flex flex-col items-center md:items-start space-y-5 self-center text-3xl xl:text-5xl text-cocoa-120 leading-tight font-medium pr-8 w-3/5 lg:w-5/12">
				<h1 className="text-center md:text-left">
					<span className="whitespace-nowrap">adorable accessories</span>
					<br className="md:hidden" />{" "}
					<span className="whitespace-nowrap">
						for people we <HeartIcon className="inline-flex ml-1 h-6 lg:h-8 fill-accent" />
					</span>
				</h1>
				<Spaghetti className="w-5 text-accent" />
				<h2 className="text-center md:text-left">hi,&nbsp;we&#39;re milktype</h2>
			</div>
			<div className="h-auto flex flex-row gap-5 md:ml-auto">
				<div className="w-32 lg:w-44 h-[17.25rem] lg:h-auto bg-accent rounded-full"></div>
				<div className="flex flex-col gap-5">
					<div className="h-32 w-32 lg:h-44 lg:w-44 bg-lilac rounded-t-full"></div>
					<div className="h-32 w-32 lg:h-44 lg:w-44 bg-shrub rounded-full"></div>
				</div>
			</div>
		</Container>
	);
}
