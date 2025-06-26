import { InfoBubble } from "~/components/elements/InfoBubble";

export function SpecsSection() {
	return (
		<section className="mt-20 xl:mt-32 px-7 md:px-16 w-full lg:mx-auto lg:max-w-screen-lg">
			<h2 className="text-2xl xs:text-3xl font-medium mb-4 xs:mb-8">specs</h2>
			<div className="flex flex-row flex-wrap gap-3 md:gap-4 text-sm xs:text-base md:text-lg">
				<InfoBubble>75% | layout</InfoBubble>
				<InfoBubble>gasket | mount</InfoBubble>
				<InfoBubble>full aluminum | case</InfoBubble>
				<InfoBubble>silver pvd | weight (4lbs)</InfoBubble>
				<InfoBubble>silver anodized | volume knob</InfoBubble>
				<InfoBubble>plate mount | stabilizers</InfoBubble>
				<InfoBubble>bluetooth | enabled</InfoBubble>
				<InfoBubble>2.4ghz | usb receiver (1000hz)</InfoBubble>
				<InfoBubble>usb-c | charging</InfoBubble>
				<InfoBubble>mac/win | support</InfoBubble>
				<InfoBubble>backlight | effects</InfoBubble>
				<InfoBubble>south-facing | pcb</InfoBubble>
				<InfoBubble>5-pin hotswap | switches</InfoBubble>
				<InfoBubble>6 week | battery life</InfoBubble>
				<InfoBubble>qmk | compatible</InfoBubble>
				<InfoBubble>1.5mm pbt | keycaps</InfoBubble>
				<InfoBubble>kca | profile keycaps</InfoBubble>
			</div>
		</section>
	);
}
