import { useFetcher } from "@remix-run/react";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import { ModalBody, ModalHeader } from "~/lib/ModalContext";
import { twJoin } from "tailwind-merge";
import { Result, useHasAnalyticsConsent } from "~/lib/util";
import { sendShopifyAnalytics, useCart } from "@shopify/hydrogen-react";
import { CartForm } from "@shopify/hydrogen";
import { Image } from "~/components/elements/Image";
import { BSB_DESKPAD_MERCHANDISE_ID } from "~/routes/sprout75._index";
import { useCartVisibility } from "~/components/global/Cart";
import { CartActionInput, CartActions } from "~/routes/cart";
import { ReactNode } from "react";

export function DeskpadDiscountModal({ children }: { children?: ReactNode }) {
	const cart = useCart();
	const { setCartVisible } = useCartVisibility();

	const hasAnalyticsConsent = useHasAnalyticsConsent();

	const fetcher = useFetcher({ key: "deskpad-modal" });
	const cartFetcher = useFetcher({ key: "discount-code" });

	const { response: { customerCreate: { customer = null } = {} } = {}, error = null } =
		(fetcher.data as Result<{ customerCreate: { customer: Pick<Customer, "email"> | null } }>) ?? {};
	const submitted = !!customer;
	const email = customer?.email || fetcher.formData?.get("email")?.toString() || "";

	return (
		<>
			<Image src="web/DeskpadFocus.png" className="w-auto max-w-full mb-4 h-auto aspect-[2/1] rounded-lg" />
			<ModalHeader title="save $10 on a deskpad" />
			<ModalBody>
				{children || error ? (
					ErrorMessage
				) : !submitted ? (
					children || (
						<>
							<p className="text-cocoa-100 font-medium mb-4">
								join our mailing list to get <span className="font-bold">$10 off</span> on a brown sugar
								boba deskpad!
							</p>

							<fetcher.Form
								method="post"
								action="/signup"
								className="flex flex-col sm:flex-row gap-2 w-full">
								<label htmlFor="email" className="sr-only">
									Email
								</label>
								<div className="flex flex-row w-full items-center">
									<Input
										type="email"
										name="email"
										placeholder="example@gmail.com"
										className="w-full h-auto text-cocoa-100 border-b border-b-cocoa-80 text-lg focus-visible:ring-0"
									/>
									<Button
										color={submitted ? "shrub" : "accent"}
										icon={<ArrowRightIcon className="w-4 fill-yogurt-100" />}
										className={twJoin(
											"ml-3 h-8 w-8 p-2 rounded-lg mt-px",
											submitted && "bg-shrub cursor-default pointer-events-none",
										)}
										disabled={fetcher.state !== "idle" || submitted}
										type="submit"
										onClick={(ev) => {
											const email = ev.currentTarget.form?.email.value;

											fetcher.submit(ev.currentTarget.form);

											cartFetcher.submit(
												{
													[CartForm.INPUT_NAME]: JSON.stringify({
														action: CartActions.DiscountCodesUpdate,
														inputs: { discountCodes: ["WELCOMEFRIEND"] },
													} satisfies CartActionInput),
												},
												{ method: "POST", action: "/cart", preventScrollReset: true },
											);
											if (
												!cart.lines?.some(
													(line) => line?.merchandise?.id === BSB_DESKPAD_MERCHANDISE_ID,
												)
											) {
												cartFetcher.submit(
													{
														[CartForm.INPUT_NAME]: JSON.stringify({
															action: CartActions.LinesUpsert,
															inputs: {
																lines: [
																	{
																		merchandiseId: BSB_DESKPAD_MERCHANDISE_ID,
																		quantity: 1,
																	},
																],
															},
														} satisfies CartActionInput),
													},
													{ method: "POST", action: "/cart", preventScrollReset: true },
												);
											}
											setCartVisible(true);

											if (hasAnalyticsConsent && email) {
												sendShopifyAnalytics({
													eventName: "custom_newsletter_signup",
													payload: {
														// @ts-expect-error — custom payload
														email,
													},
												});
											}
										}}
									/>
								</div>
							</fetcher.Form>
						</>
					)
				) : (
					<p className="text-cocoa-100 text-balance">
						thanks for signing up! check out with <span className="font-semibold">{email}</span> and code{" "}
						<span className="font-semibold">welcomefriend</span> to get $10 off on a deskpad!
					</p>
				)}
			</ModalBody>
		</>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);
	return (
		<>
			<DeskpadDiscountModal>{ErrorMessage}</DeskpadDiscountModal>
		</>
	);
}

const ErrorMessage = (
	<p className="text-cocoa-100 text-balance">
		sorry, something went wrong. double check your email, or reach out to us at{" "}
		<a href="mailto:hi@milktype.co" className="text-cocoa-100 underline">
			hi@milktype.co
		</a>{" "}
		and we'll get you sorted out!
	</p>
);
