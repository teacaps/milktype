import { Layout } from "~/components/global/Layout";
import type { MetaFunction } from "@shopify/remix-oxygen";
import { Container } from "~/components/global/Container";
import { HorizontalSpaghetti } from "~/assets/Spaghetti";

export const meta: MetaFunction = () => [
	{
		title: "shipping and returns",
	},
	{
		name: "description",
		content: "milktype shipping and returns information.",
	},
	{
		property: "og:title",
		content: "shipping and returns",
	},
	{
		property: "og:description",
		content: "milktype shipping and returns information.",
	},
	{
		property: "og:url",
		content: "https://milktype.co/shipping",
	},
	{
		property: "og:image",
		content: "https://milktype.co/og/main.png",
	},
	{
		property: "twitter:image",
		content: "https://milktype.co/og/main.png",
	},
];

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
						we accept returns or exchanges within 14 days of delivery. if you're not satisfied, or would prefer a different
						product, let us know by emailing us at hi@milktype.co

						return shipping costs are not covered by us. all original packaging elements must be included with the return.
						<br />
						<br />
						this policy lasts for 14 days. if 14 days have passed since the delivery of your product, we
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
