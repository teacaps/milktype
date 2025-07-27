import { useFetcher, useRouteLoaderData } from "react-router";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import { twJoin } from "tailwind-merge";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { Result } from "~/lib/util";
import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import type { RootLoader } from "~/root";

interface NotificationsSignupProps {
	fetcherKey: string;
	cta: string;
}

export function NotificationsSignup({ fetcherKey, cta }: NotificationsSignupProps) {
	const fetcher = useFetcher({ key: fetcherKey });
	const { response: { customerCreate: { customer = null } = {} } = {}, error = null } =
		(fetcher.data as Result<{ customerCreate: { customer: Pick<Customer, "email"> | null } }>) ?? {};
	const submitted = !!customer;
	const email = customer?.email || fetcher.formData?.get("email")?.toString() || "";
	const { turnstileSiteKey } = useRouteLoaderData<RootLoader>("root")!;
	const turnstileRef = useRef<TurnstileInstance | null>(null);
	const pendingForm = useRef<HTMLFormElement | null>(null);
	const [captchaError, setCaptchaError] = useState(false);

	return (
		<fetcher.Form
			action="/signup"
			method="POST"
			id="newsletter-signup"
			className="flex flex-col @xs:flex-row gap-2 xs:gap-3 items-start @xs:items-center justify-start rounded-2xl transition-colors delay-300 duration-700">
			<span className="font-medium text-center lg:text-start text-cocoa-120">
				{captchaError ? (
					<>
						uh oh, there was an error — feel free to email hi@milktype.co for your discount code (don't
						worry, we reply fast!)
					</>
				) : !submitted ? (
					<>
						let’s keep in touch — we’ll send a monthly newsletter to<span className="lg:hidden">:</span>
					</>
				) : (
					<>
						thanks for signing up! we’ll keep you updated
						{email ? (
							<>
								{" "}
								at <span className="font-semibold">{email}</span>
							</>
						) : null}
						.
					</>
				)}
			</span>
			{captchaError || submitted ? null : (
				<>
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<div className="flex flex-row">
						<Input
							type="email"
							name="email"
							placeholder="example@gmail.com"
							className="w-52 h-auto -mb-[3px] ml-1 px-1 py-0 text-cocoa-100 text-xl placeholder:text-center focus-visible:ring-0"
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
								ev.preventDefault();
								pendingForm.current = ev.currentTarget.form;
								setCaptchaError(false);
								turnstileRef.current?.execute();
							}}
						/>
					</div>
					<Turnstile
						ref={turnstileRef}
						siteKey={turnstileSiteKey}
						className="hidden"
						options={{ size: "invisible", execution: "execute" }}
						onSuccess={() => {
							const form = pendingForm.current;
							if (!form) return;
							const email = form.email.value;
							fetcher.submit(form);
							if (email) {
								sendShopifyAnalytics({
									eventName: "custom_newsletter_signup",
									payload: {
										// @ts-expect-error — custom payload
										email,
									},
								});
							}
						}}
						onError={() => setCaptchaError(true)}
					/>
				</>
			)}
		</fetcher.Form>
	);
}
