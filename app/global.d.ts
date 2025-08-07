declare global {
	interface Window {
		TriplePixel(event: string, data: Record<string, unknown>): void;
	}
}

declare module "scrolly-video/dist/ScrollyVideo.esm" {
	export default function ScrollyVideo(props: {
		src: string;
		transitionSpeed?: number;
		frameThreshold?: number;
		sticky?: boolean;
		full?: boolean;
	}): JSX.Element;
}
