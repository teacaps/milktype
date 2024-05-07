import { useMemo } from "react";
import { useMatches } from "@remix-run/react";

const DEFAULT_LOCALE = {
	language: "en",
	currency: "USD",
};

export function usePageAnalytics({ hasUserConsent }: { hasUserConsent: boolean }) {
	// useMatches returns an array of nested routes
	const matches = useMatches();

	return useMemo(() => {
		const data = {};

		// For each nested route, get the `analytics` object returned
		// by its loader function and assign to `data`
		matches.forEach((event) => {
			const eventData = event?.data;
			if (eventData && typeof eventData === "object") {
				if ("analytics" in eventData) Object.assign(data, eventData["analytics"]);

				// @ts-expect-error
				const selectedLocale = eventData["selectedLocale"] ?? DEFAULT_LOCALE;
				Object.assign(data, {
					currency: selectedLocale.currency,
					acceptedLanguage: selectedLocale.language,
				});
			}
		});

		return { ...data, hasUserConsent };
	}, [hasUserConsent, matches]);
}
