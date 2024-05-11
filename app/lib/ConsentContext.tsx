import useCookie from "react-use-cookie";
import { createContext, useContext, useState, type ReactNode } from "react";

export const ConsentLevel = {
	NOT_SET: "NOT_SET",
	NECESSARY_ONLY: "NECESSARY_ONLY",
	FULL_CONSENT: "FULL_CONSENT",
} as const;
export type ConsentLevel = (typeof ConsentLevel)[keyof typeof ConsentLevel];

export const ConsentContext = createContext<{
	consentLevel: ConsentLevel;
	setConsentLevel: (consentLevel: ConsentLevel) => void;
}>({
	consentLevel: ConsentLevel.NOT_SET,
	setConsentLevel: () => {},
});

export function ConsentProvider({ children }: { children: ReactNode }): ReactNode {
	const [consentCookie, setConsentCookie] = useCookie("cookieConsent", ConsentLevel.NOT_SET);
	const [consent, setConsent] = useState<ConsentLevel>(consentCookie as ConsentLevel);
	return (
		<ConsentContext.Provider
			value={{
				consentLevel: consent,
				setConsentLevel: (level: ConsentLevel) => {
					setConsentCookie(level, {
						days: 365,
					});
					setConsent(level);
				},
			}}>
			{children}
		</ConsentContext.Provider>
	);
}

export const useConsentLevel = (): [ConsentLevel, (consentLevel: ConsentLevel) => void] => {
	const ctx = useContext(ConsentContext);
	return [ctx.consentLevel, ctx.setConsentLevel];
};

export const useHasNecessaryConsent = (): boolean => {
	const [consentLevel] = useConsentLevel();
	return consentLevel === ConsentLevel.NECESSARY_ONLY || consentLevel === ConsentLevel.FULL_CONSENT;
};

export const useHasAnalyticsConsent = (): boolean => {
	const [consentLevel] = useConsentLevel();
	return consentLevel === ConsentLevel.FULL_CONSENT;
};
