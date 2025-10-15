import { useSearchParams, type SetURLSearchParams, useFetcher, useRouteLoaderData } from "react-router";
import { useLayoutEffect, useRef, useState } from "react";
import { Button, UnstyledButton } from "~/components/elements/Button";
import { Image } from "~/components/elements/Image";
import { Renders } from "~/components/sprout75/constants";
import { Result, useHasAnalyticsConsent } from "~/lib/util";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import type { RootLoader } from "~/root";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import { Input } from "~/components/elements/Input";
import { Turnstile } from "~/lib/Turnstile";

type InnerProps = { params: URLSearchParams; setSearchParams: SetURLSearchParams };

export function EmailConversionPopover() {
	const [params, setSearchParams] = useSearchParams();
	if (!params.has("close_friends")) return null;
	return <EmailConversionPopoverInner params={params} setSearchParams={setSearchParams} />;
}

function EmailConversionPopoverInner({ params, setSearchParams }: InnerProps) {
	const popover = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => popover.current?.showPopover(), []);

	const { turnstileSiteKey } = useRouteLoaderData<RootLoader>("root")!;
	const [turnstileStatus, setTurnstileStatus] = useState<"loading" | "success" | "error" | null>("loading");

	const stepProps = { params, setSearchParams, turnstileStatus };
	const Step = params.get("close_friends") === "2" ? Step2 : Step1;

	return (
		<div ref={popover} popover="auto" className="px-0 py-2 w-full h-full flex flex-col bg-yogurt-80">
			<button
				className="p-3 pr-8 hover:bg-cocoa-60 rounded self-end"
				onClick={() => setSearchParams((prev) => (prev.delete("close_friends"), prev), { replace: true })}
				aria-label="Close modal">
				<svg
					className="w-6 h-6 stroke-cocoa-80"
					fill="none"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>
			<div className="px-8 w-full flex flex-col items-center">
				<Step {...stepProps} />
			</div>
			<Turnstile
				id="footer-turnstile"
				siteKey={turnstileSiteKey}
				onSuccess={() => setTurnstileStatus("success")}
				onError={() => setTurnstileStatus("error")}
			/>
			<Image {...Renders.DeskpadCloseUp} className="w-4/5 h-auto mt-auto self-end -mb-16" />
		</div>
	);
}

function Step1({ setSearchParams }: InnerProps) {
	return (
		<>
			<h3 className="mt-4 mb-8 text-cocoa-100 text-xl font-semibold text-center">
				join our close friends list, and we’ll send you a <span className="italic">free deskpad!</span>
			</h3>
			<Button
				color="shrub"
				className="w-full rounded-xl py-3 text-yogurt-100"
				style={{ viewTransitionName: "claim-deskpad" }}
				onClick={() => setSearchParams((prev) => (prev.set("close_friends", "2"), prev), { replace: true })}>
				claim your free deskpad!
			</Button>
			<UnstyledButton
				className="mt-4 px-8 py-3 text-cocoa-120 underline"
				onClick={() => setSearchParams((prev) => (prev.delete("close_friends"), prev), { replace: true })}>
				no thanks
			</UnstyledButton>
		</>
	);
}

function Step2({ params, setSearchParams, turnstileStatus }: InnerProps & { turnstileStatus: string | null }) {
	const fetcher = useFetcher({ key: "newsletter" });
	const { response: { customerCreate: { customer = null } = {} } = {}, error = null } =
		(fetcher.data as Result<{ customerCreate: { customer: Pick<Customer, "email" | "firstName"> | null } }>) ?? {};

	const submitted = !!customer;

	const hasAnalyticsConsent = useHasAnalyticsConsent();

	const [errored, setErrored] = useState(false);
	const disabled = fetcher.state !== "idle" || turnstileStatus === "loading" || submitted;

	let title = <>welcome to milktype close friends. we’re so glad you’re here!</>;
	if (errored) {
		title = (
			<>
				uh oh, there was an error — feel free to email{" "}
				<a className="text-accent underline" href="mailto:hi@milktype.co">
					hi@milktype.co
				</a>{" "}
				for your free deskpad (don't worry, we reply fast!)
			</>
		);
	}

	return (
		<>
			<h3 className="mt-4 mb-8 text-cocoa-100 text-xl font-semibold text-center">{title}</h3>
			<fetcher.Form
				action="/signup"
				method="POST"
				id="newsletter-signup"
				className="flex flex-col w-full items-center justify-center"
				onSubmit={(ev) => {
					ev.preventDefault();

					if (turnstileStatus === "error") return setErrored(true);

					const form = ev.currentTarget;
					if (!form) return;

					const email = form.email.value;
					fetcher.submit(form);

					setSearchParams((prev) => (prev.delete("close_friends"), prev), { replace: true });

					if (hasAnalyticsConsent && email) {
						sendShopifyAnalytics({
							eventName: "custom_newsletter_signup",
							payload: {
								// @ts-expect-error — custom payload
								email,
							},
						});
					}
				}}>
				<div className="w-full flex flex-col gap-y-4">
					<label htmlFor="first_name" className="sr-only">
						First name
					</label>
					<Input
						disabled={errored}
						type="text"
						name="first_name"
						placeholder="what's your first name?"
						className="w-full h-auto px-3 py-3 text-cocoa-100 text-center placeholder:text-center placeholder:font-semibold focus-visible:ring-0 border-0 hover:border-0 bg-yogurt-60 placeholder:disabled:text-cocoa-80/50 rounded-xl"
					/>
					<label htmlFor="email" className="sr-only">
						Email
					</label>
					<Input
						disabled={errored}
						type="email"
						name="email"
						placeholder="what's your email?"
						className="w-full h-auto px-3 py-3 text-cocoa-100 text-center placeholder:text-center placeholder:font-semibold focus-visible:ring-0 border-0 hover:border-0 bg-yogurt-60 placeholder:disabled:text-cocoa-80/50 rounded-xl"
					/>
					<Button
						disabled={disabled}
						color="shrub"
						className="w-full rounded-xl py-3 text-yogurt-100"
						style={{ viewTransitionName: "claim-deskpad" }}
						type="submit">
						{disabled ? "loading..." : "claim your free deskpad!"}
					</Button>
					<span className="font-medium text-sm text-center text-cocoa-80 text-balance leading-tight">
						we send one monthly newsletter, and occasional freebies. no spam,{" "}
						<span className="font-bold">ever</span>.
					</span>
				</div>
			</fetcher.Form>
		</>
	);
}
