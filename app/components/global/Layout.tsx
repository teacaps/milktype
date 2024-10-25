import type { HTMLAttributes } from "react";
import { Navigation } from "~/components/global/Navigation";
import { Footer } from "~/components/global/Footer";

export function Layout({ footer, ...props }: Partial<HTMLAttributes<HTMLDivElement>> & { footer?: boolean }) {
	return (
		<div className="flex bg-yogurt-80 text-cocoa-120 min-h-screen min-w-screen flex-col items-center overflow-x-hidden">
			<SproutReservationNotice />
			<Navigation />
			<div className="mb-auto w-full" {...props}></div>
			{footer === false ? null : <Footer />}
		</div>
	);
}

const SproutReservationNotice = () => (
	<div className="w-full flex items-center justify-center bg-accent p-4 hover:first:bg-shrub">
		<a className="text-yogurt-100 text-base xs:text-lg font-medium text-center" href="/sprout75#deskpad">
			reserve sprout 75! free deskpad + behind the scenes →
		</a>
	</div>
);
