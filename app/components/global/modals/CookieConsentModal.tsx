import { Button } from "~/components/elements/Button";
import { ConsentLevel } from "~/lib/util";
import { ModalBody, ModalHeader, useModal } from "~/lib/ModalContext";

export function CookieConsentModal({ setConsentLevel }: { setConsentLevel: (newLevel: ConsentLevel) => void }) {
	const { popModal } = useModal();

	const handleConsent = (level: ConsentLevel) => {
		setConsentLevel(level);
		popModal("CookieConsent");
	};

	return (
		<>
			<p className="text-cocoa-100 font-medium mb-6">
				hi there! we use cookies to help make our website better. you can read about it{" "}
				<a href="/terms#cookies" className="text-accent underline">
					here
				</a>
				.
			</p>
			<div className="flex flex-col items-center justify-center sm:flex-row gap-4">
				<Button
					color="accent"
					className="py-2 text-yogurt-100"
					onClick={() => handleConsent(ConsentLevel.NECESSARY_ONLY)}>
					accept necessary cookies only
				</Button>
				<Button
					color="accent"
					className="py-2 text-yogurt-100"
					onClick={() => handleConsent(ConsentLevel.FULL_CONSENT)}>
					accept all cookies
				</Button>
			</div>
		</>
	);
}

CookieConsentModal.title = "cookie consent";
