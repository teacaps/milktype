import { Button } from "~/components/elements/Button";
import { ConsentLevel } from "~/lib/util";
import { useEffect, useState } from "react";

const displayDelay = 5000;

export function CookieConsentNotice({ setConsentLevel }: { setConsentLevel: (newLevel: ConsentLevel) => void }) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setShow(true), displayDelay);
		return () => clearTimeout(timeout);
	}, []);

	return show ? (
		<div className="fixed bottom-0 left-0 right-0 flex flex-col xl:flex-row items-center justify-center gap-4 z-50 p-4 bg-yogurt-60">
			<p className="text-center text-cocoa-120">
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
					onClick={() => setConsentLevel(ConsentLevel.NECESSARY_ONLY)}>
					accept necessary cookies only
				</Button>
				<Button
					color="accent"
					className="py-2 text-yogurt-100"
					onClick={() => setConsentLevel(ConsentLevel.FULL_CONSENT)}>
					accept all cookies
				</Button>
			</div>
		</div>
	) : null;
}
