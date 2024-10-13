import type { HTMLAttributes } from "react";
import { Navigation } from "~/components/global/Navigation";
import { Footer } from "~/components/global/Footer";

export function Layout(props: Partial<HTMLAttributes<HTMLDivElement>> & { footer?: boolean }) {
	return (
		<div className="flex bg-yogurt-80 text-cocoa-120 min-h-screen min-w-screen flex-col items-center overflow-x-hidden">
			<Navigation />
			<div className="mb-auto w-full" {...props}></div>
			{props.footer === false ? null : <Footer />}
		</div>
	);
}
