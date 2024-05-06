import { Layout } from "~/components/global/Layout";
import type { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { Container } from "~/components/global/Container";
import { HorizontalSpaghetti } from "~/assets/Spaghetti";

export async function loader({ context }: LoaderFunctionArgs) {
	return {
		seo: {
			title: "shipping and returns",
		},
	};
}

export default function Shipping() {
	return (
		<Layout>
			<Container className="prose prose-h2:mt-0 py-8 sm:py-16">
				<h1 className="sr-only">shipping and returns</h1>
				<div className="flex flex-col text-cocoa-120 text-lg">
					<h2 className="text-3xl text-cocoa-100 font-semibold">shipping</h2>
					<p>
						<span className="font-semibold">how much will shipping cost?</span>
						<br />
						shipping costs are determined by region. we ship with USPS for most countries, with a few
						exceptions.
					</p>
					<p>
						<span className="font-semibold">there are no shipping options for my country!</span>
						<br />
						if you don&#39;t see any shipping options listed at checkout, please{" "}
						<a href="mailto:hi@milktype.co" className="underline hover:no-underline hover:text-accent">
							send us a message
						</a>
						!
					</p>
				</div>
				<HorizontalSpaghetti className="w-[15ch] mt-8 mb-12 h-auto text-accent" />
				<div className="flex flex-col text-cocoa-120 text-lg">
					<h2 className="text-3xl text-cocoa-100 font-semibold">returns and exchanges</h2>
					<p>
						we don&#39;t accept returns or exchanges unless there is a significant flaw with the product you
						received. if so, we will do our best to ensure the issue is resolved, providing a refund or
						exchange if we deem it necessary.
						<br />
						<br />
						this policy lasts for 30 days. if 30 days have passed since the delivery of your product, we
						will not be able to offer you a refund or exchange.
						<br />
						<br />
						at milktype, your experience is our top priority. if you have any issues with your order, please
						don&#39;t hesitate to{" "}
						<a href="mailto:hi@milktype.co" className="underline hover:no-underline hover:text-accent">
							contact us
						</a>
						.
					</p>
				</div>
			</Container>
		</Layout>
	);
}
