import { Container } from "~/components/global/Container";
import { Button } from "~/components/elements/Button";

export function Intro() {
	return (
		<Container className="pb-24 flex flex-col gap-8 items-center">
			<p className="text-2xl text-cocoa-120 font-medium leading-8 w-5/6 sm:w-2/3 text-center">
				hi, we’re milktype — a fresh take on fully built mechanical keyboards.
			</p>
			<Button color="lilac" className="text-yogurt-100 text-xl">
				more about us
			</Button>
		</Container>
	);
}
