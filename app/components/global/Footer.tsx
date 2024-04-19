import { Wordmark } from "~/assets/Wordmark";
import { Container } from "~/components/global/Container";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";

function NewsletterSignup() {
	return (
		<form
			className="flex w-full text-xl bg-yogurt-60 p-8 gap-y-4 flex-col md:flex-row items-center justify-center"
			style={{ viewTransitionName: "newsletter" }}>
			<span className="font-medium text-cocoa-120">
				let’s keep in touch — we’ll send a monthly newsletter to<span className="md:hidden">:</span>
			</span>
			<label htmlFor="email" className="sr-only">
				Email
			</label>
			<div className="flex flex-row">
				<Input
					name="email"
					placeholder="example@gmail.com"
					className="w-52 h-auto -mb-[3px] ml-1 px-1 py-0 text-cocoa-100 text-xl placeholder:text-center focus-visible:ring-0"
				/>
				<Button
					color="accent"
					icon={<ArrowRightIcon className="w-4 fill-yogurt-100" />}
					className="ml-3 h-8 w-8 p-2 rounded-lg mt-px"
				/>
			</div>
		</form>
	);
}

export function Footer() {
	return (
		<>
			<NewsletterSignup />
			<Container
				as="footer"
				className="!w-full !max-w-full !mx-0 font-medium text-yogurt-80 text-base h-auto bg-cocoa-100 flex flex-col py-8"
				style={{ viewTransitionName: "footer" }}>
				<Wordmark className="h-14 w-fit" />
				<div className="h-0.5 w-16 my-4 bg-yogurt-80"></div>
				<span className="mb-1">San Francisco, CA</span>
				<a
					className="inline hover:text-accent hover:underline focus-visible:text-accent focus-visible:underline focus-visible:outline-none"
					href="mailto:hi@milktype.co">
					hi@milktype.co
				</a>
			</Container>
		</>
	);
}
