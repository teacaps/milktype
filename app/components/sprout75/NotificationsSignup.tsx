import { useFetcher, useRouteLoaderData } from "react-router";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import { twJoin } from "tailwind-merge";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import { Input } from "~/components/elements/Input";
import { Button } from "~/components/elements/Button";
import { ArrowRightIcon } from "~/assets/icons/ArrowRight";
import { Result } from "~/lib/util";
import { useState } from "react";
import { Turnstile } from "~/lib/Turnstile";
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
	const [turnstileStatus, setTurnstileStatus] = useState<"loading" | "success" | "error" | null>("loading");
	const [errored, setErrored] = useState(false);

	const disabled = fetcher.state !== "idle" || turnstileStatus === "loading" || submitted;

	return (
		<fetcher.Form
			action="/signup"
			method="POST"
			id="newsletter-signup"
			className="flex flex-col @xs:flex-row gap-2 xs:gap-3 items-start @xs:items-center justify-start rounded-2xl transition-colors delay-300 duration-700"
			onSubmit={(ev) => {
				ev.preventDefault();

				if (turnstileStatus === "error") return setErrored(true);

				const form = ev.currentTarget;
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
			}}>
			<span className="font-medium text-center lg:text-start text-cocoa-120">
				{errored ? (
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
			{errored || submitted ? null : (
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
							disabled={disabled}
							type="submit"
							title={disabled ? "making sure you're human..." : undefined}
						/>
					</div>
					<Turnstile
						id="newsletter-signup-turnstile"
						siteKey={turnstileSiteKey}
						onSuccess={() => setTurnstileStatus("success")}
						onError={() => setTurnstileStatus("error")}
					/>
				</>
			)}
		</fetcher.Form>
	);
}
