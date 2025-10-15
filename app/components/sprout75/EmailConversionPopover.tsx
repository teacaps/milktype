import { useSearchParams, useFetcher, useRouteLoaderData } from "react-router";
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, UnstyledButton } from "~/components/elements/Button";
import { Image } from "~/components/elements/Image";
import { Renders } from "~/components/sprout75/constants";
import { Result, useHasAnalyticsConsent } from "~/lib/util";
import type { Customer } from "@shopify/hydrogen/storefront-api-types";
import type { RootLoader } from "~/root";
import { sendShopifyAnalytics } from "@shopify/hydrogen-react";
import { Input } from "~/components/elements/Input";
import { Turnstile } from "~/lib/Turnstile";

type InnerProps = {
	setStep: Dispatch<SetStateAction<number | null>>;
	name: string;
	turnstileStatus: string | null;
};

const steps = [Step0, Step1, Step2, Step3];

export function EmailConversionPopover() {
	const [params, setSearchParams] = useSearchParams();
	const popover = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState<number | null>(null);

	const fetcher = useFetcher({ key: "newsletter-signup" });
	const hasAnalyticsConsent = useHasAnalyticsConsent();
	const [name, setName] = useState("friend");
	const [errored, setErrored] = useState(false);

	const { response: { customerCreate: { customer = null } = {} } = {} } =
		(fetcher.data as Result<{ customerCreate: { customer: Pick<Customer, "email" | "firstName"> | null } }>) ?? {};

	const submitted = !!customer;

	useEffect(() => {
		setName(customer?.firstName || fetcher.formData?.get("first_name")?.toString() || "friend");
		if (errored) setStep(0);
		else if (submitted) setStep(3);
	}, [submitted, errored]);

	useLayoutEffect(() => {
		if (!params.has("close_friends")) return;
		setStep(parseInt(params.get("close_friends") || "1", 10));
		setSearchParams((prev) => (prev.delete("close_friends"), prev), { replace: true });
		popover.current?.showPopover();
	}, [params]);

	const { turnstileSiteKey } = useRouteLoaderData<RootLoader>("root")!;
	const [turnstileStatus, setTurnstileStatus] = useState<"loading" | "success" | "error" | null>("loading");

	if (step === null) return null;

	const Step = steps[step];
	const stepProps = { setStep, name, turnstileStatus };

	return (
		<div
			ref={popover}
			popover="auto"
			className="z-10 px-0 py-2 w-full xs:w-4/5 max-w-xl h-full xs:h-2/3 xs:max-h-[36rem] overflow-y-hidden xs:rounded-2xl xs:shadow-2xl bg-yogurt-80 xs:bg-yogurt-60 flex flex-col">
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
				<button
					className="p-3 mr-4 hover:bg-yogurt-100/20 rounded-xl self-end"
					onClick={() => setStep(null)}
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
				<div className="px-8 w-full max-w-sm mx-auto flex flex-col items-center">
					<Step {...stepProps} />
				</div>
				<Turnstile
					id="footer-turnstile"
					siteKey={turnstileSiteKey}
					onSuccess={() => setTurnstileStatus("success")}
					onError={() => setTurnstileStatus("error")}
				/>
			</fetcher.Form>
			<Image {...Renders.DeskpadCloseUp} className="w-4/5 h-auto mt-auto self-end -mb-16" />
		</div>
	);
}

function Step1({ setStep }: InnerProps) {
	return (
		<>
			<h3 className="mt-4 mb-8 text-cocoa-100 text-xl font-semibold text-center">
				join our close friends list, and we’ll send you a <span className="italic">free deskpad!</span>
			</h3>
			<Button
				color="shrub"
				className="w-full rounded-xl py-3 text-yogurt-100"
				style={{ viewTransitionName: "claim-deskpad" }}
				onClick={() => setStep(2)}>
				claim your free deskpad!
			</Button>
			<UnstyledButton className="mt-4 px-8 py-3 text-cocoa-120 underline" onClick={() => setStep(null)}>
				no thanks
			</UnstyledButton>
		</>
	);
}

function Step2({ turnstileStatus }: InnerProps) {
	const fetcher = useFetcher({ key: "newsletter-signup" });

	const disabled = fetcher.state !== "idle" || turnstileStatus === "loading";

	let title = <>welcome to milktype close friends. we’re so glad you’re here!</>;

	return (
		<>
			<h3 className="mt-4 mb-8 text-cocoa-100 text-xl font-semibold text-center">{title}</h3>
			<div className="w-full flex flex-col gap-y-4">
				<label htmlFor="first_name" className="sr-only">
					First name
				</label>
				<Input
					type="text"
					name="first_name"
					placeholder="what's your first name?"
					className="w-full h-auto px-3 py-3 text-cocoa-100 text-center placeholder:text-center placeholder:font-semibold focus-visible:ring-0 border-0 hover:border-0 bg-yogurt-60 xs:bg-yogurt-70 placeholder:disabled:text-cocoa-80/50 rounded-xl"
				/>
				<label htmlFor="email" className="sr-only">
					Email
				</label>
				<Input
					type="email"
					name="email"
					placeholder="what's your email?"
					className="w-full h-auto px-3 py-3 text-cocoa-100 text-center placeholder:text-center placeholder:font-semibold focus-visible:ring-0 border-0 hover:border-0 bg-yogurt-60 xs:bg-yogurt-70 placeholder:disabled:text-cocoa-80/50 rounded-xl"
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
		</>
	);
}

function Step3({ setStep, name }: InnerProps) {
	return (
		<>
			<h3 className="mt-4 mb-8 text-cocoa-100 text-xl font-semibold text-center">
				you're in, {name}! we'll email you with more info soon.
			</h3>
			<Button
				color="shrub"
				className="w-full rounded-xl py-3 text-yogurt-100"
				style={{ viewTransitionName: "claim-deskpad" }}
				onClick={() => setStep(null)}>
				okay!
			</Button>
		</>
	);
}

function Step0({ setStep }: InnerProps) {
	return (
		<>
			<h3 className="mt-4 mb-8 text-cocoa-100 text-xl font-semibold text-center">
				uh oh, there was an error — feel free to email{" "}
				<a className="text-accent underline" href="mailto:hi@milktype.co">
					hi@milktype.co
				</a>{" "}
				for your free deskpad (don't worry, we reply fast!)
			</h3>
			<Button
				color="shrub"
				className="w-full rounded-xl py-3 text-yogurt-100"
				style={{ viewTransitionName: "claim-deskpad" }}
				onClick={() => setStep(null)}>
				exit
			</Button>
		</>
	);
}
