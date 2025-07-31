import { useCallback, useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";
import { RenderParameters, type Turnstile } from "./turnstile-types";
import { twJoin } from "tailwind-merge";

declare global {
	interface Window {
		turnstile?: Turnstile;
	}
}

export interface TurnstileProps extends HTMLAttributes<HTMLDivElement> {
	siteKey: string;
	onSuccess: () => void;
	onError: () => void;
}

export function Turnstile({ siteKey, onSuccess, onError, ...props }: TurnstileProps) {
	const ref = useRef<HTMLDivElement>(null);

	const [turnstileLoaded, setTurnstileLoaded] = useState(false);
	const [interactive, setInteractive] = useState(false);

	const renderParams = useMemo(
		(): RenderParameters => ({
			"sitekey": siteKey,
			"callback": onSuccess,
			"error-callback": onError,
			"before-interactive-callback": () => setInteractive(true),
			"theme": "light",
			"size": "compact",
			"appearance": "interaction-only",
			"feedback-enabled": false,
		}),
		[siteKey, onSuccess, onError],
	);

	const renderTurnstile = useCallback(() => {
		if (ref.current && !ref.current.children.length) {
			window.turnstile!.render(ref.current, renderParams);
			setTurnstileLoaded(true);
		}
	}, [ref, renderParams]);

	useEffect(() => {
		if (turnstileLoaded) return;
		if (window.turnstile) {
			renderTurnstile();
		}
	}, [turnstileLoaded, renderTurnstile]);

	useEffect(() => {
		if (document.getElementById("cf-turnstile")) return;
		const script = document.createElement("script");
		script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
		script.id = "cf-turnstile";
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
		script.onload = () => {
			renderTurnstile();
		};
	});

	return (
		<div
			data-sitekey={siteKey}
			ref={ref}
			className={twJoin("cf-turnstile", !interactive && "hidden", props.className)}
			{...props}></div>
	);
}
