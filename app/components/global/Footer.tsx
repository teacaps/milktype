import { Wordmark } from "~/assets/Wordmark";
import { Container } from "~/components/global/Container";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";

function NewsletterSignup() {
	return (
		<Container as="form" className="flex text-xl bg-yogurt-60 p-8 flex-row items-center justify-center">
			<span className="font-medium text-cocoa-120">let’s keep in touch — we’ll send a monthly newsletter to</span>
			<label htmlFor="email" className="sr-only">
				Email
			</label>
			<Input name="email" placeholder="example@gmail.com" className="w-48 h-auto ml-[0.375rem] text-cocoa-100" />
			<Button
				color="accent"
				icon={<ArrowRightIcon className="w-4 fill-yogurt-100" />}
				className="ml-3 h-8 w-8 p-2 rounded-lg mt-px"
			/>
		</Container>
	);
}

export function Footer() {
	return (
		<>
			<NewsletterSignup />
			<Container
				as="footer"
				className="w-full font-medium text-yogurt-80 text-base h-auto bg-cocoa-100 flex flex-col py-8">
				<Wordmark className="h-14 w-fit" />
				<div className="h-0.5 w-16 my-4 bg-yogurt-80"></div>
				<span className="mb-1">San Francisco, CA</span>
				<span>milktype.co</span>
			</Container>
		</>
	);
}
