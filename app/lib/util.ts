import { useCookies } from "react-cookie";
import { useEffect, useRef } from "react";

export type Result<T> = { response: T; error?: never } | { response?: never; error: any };

export type Color =
	| "accent"
	| "yogurt"
	| `yogurt-${number}`
	| "cocoa"
	| `cocoa-${number}`
	| "shrub"
	| "blurple"
	| "lilac";

export type MakePropertiesOptional<T, K extends string> = T extends T
	? Omit<T, K> & Partial<Pick<T, K extends keyof T ? K : never>>
	: never;

export const ConsentLevel = {
	NOT_SET: "not_set",
	NECESSARY_ONLY: "necessary_only",
	FULL_CONSENT: "full_consent",
} as const;
export type ConsentLevel = (typeof ConsentLevel)[keyof typeof ConsentLevel];

export const useConsentLevel = (): [consentLevel: ConsentLevel, setConsentLevel: (newLevel: ConsentLevel) => void] => {
	const [{ cookieConsent }, setCookie] = useCookies(["cookieConsent"]);
	const consentLevel = cookieConsent || ConsentLevel.NOT_SET;
	return [consentLevel, (newLevel: ConsentLevel) => setCookie("cookieConsent", newLevel, { path: "/" })];
};

export const useHasAnalyticsConsent = (): boolean => {
	const [consentLevel] = useConsentLevel();
	return consentLevel === ConsentLevel.FULL_CONSENT;
};

export const usePrevious = <T>(value: T) => {
	const ref = useRef<T>(undefined);
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
};
