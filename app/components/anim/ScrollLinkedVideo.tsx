import { useScroll, useMotionValueEvent } from "motion/react";
import { Video, VideoProps } from "../elements/Video";
import { useEffect, useRef } from "react";

export function ScrollLinkedVideo(props: VideoProps) {
	const ref = useRef<HTMLVideoElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] });

	useMotionValueEvent(scrollYProgress, "change", () => {
		if (!ref.current?.readyState) return;
		const progress = scrollYProgress.get();
		const newTime = progress * ref.current!.duration;
		if (isNaN(newTime)) return;
		ref.current!.currentTime = newTime;
	});

	return <Video ref={ref} {...props} />;
}
