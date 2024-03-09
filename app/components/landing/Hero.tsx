import { Container } from "~/components/global/Container";
import { HeartIcon } from "~/assets/icons/Heart";
import { Spaghetti } from "~/assets/Spaghetti";

export function Hero() {
	return (
		<Container className="py-24 flex flex-row">
			<div className="flex flex-col space-y-5 self-center text-5xl text-cocoa-120 leading-tight font-medium w-2/5">
				<h1>
					creations for people we <HeartIcon className="inline-flex ml-1 h-8 fill-accent" />
				</h1>
				<Spaghetti className="w-5 text-accent" />
				<h2>hi, we're milktype</h2>
			</div>
			<div className="h-auto flex flex-row gap-5 ml-auto">
				<div className="w-44 h-full bg-accent rounded-full"></div>
				<div className="flex flex-col gap-5">
					<div className="h-44 w-44 bg-lilac rounded-t-full"></div>
					<div className="h-44 w-44 bg-shrub rounded-full"></div>
				</div>
			</div>
		</Container>
	);
}
