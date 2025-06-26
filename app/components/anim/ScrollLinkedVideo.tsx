// Vendored https://github.com/dkaoster/scrolly-video/blob/main/src/ScrollyVideo.jsx
// MIT License, Copyright (c) 2022 Daniel Kao

import { useEffect, useState, useRef, useImperativeHandle, MutableRefObject } from "react";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo";

interface ScrollLinkedVideoProps {
	src: string;
	ref?: MutableRefObject<ScrollLinkedVideoRef | null>;
	transitionSpeed?: number;
	frameThreshold?: number;
	cover?: boolean;
	sticky?: boolean;
	full?: boolean;
	trackScroll?: boolean;
	lockScroll?: boolean;
	useWebCodecs?: boolean;
	videoPercentage?: number;
	debug?: boolean;
	onReady?: () => void;
	onChange?: (percentage: number) => void;
}

interface ScrollLinkedVideoRef {
	setVideoPercentage: (percentage: number) => void;
}

export function ScrollLinkedVideo({
	ref,
	src,
	transitionSpeed,
	frameThreshold,
	cover,
	sticky,
	full,
	trackScroll,
	lockScroll,
	useWebCodecs,
	videoPercentage,
	debug,
	onReady,
	onChange,
}: ScrollLinkedVideoProps) {
	const containerElement = useRef<HTMLDivElement>(null);
	const scrollyVideoRef = useRef<ScrollyVideo | null>(null);
	const [instance, setInstance] = useState<ScrollyVideo | null>(null);

	const videoPercentageRef = useRef(videoPercentage);
	videoPercentageRef.current = videoPercentage;

	const onReadyRef = useRef(onReady);
	onReadyRef.current = onReady;

	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	// effect for destroy and recreate on props change (except video percentage)
	useEffect(() => {
		if (!containerElement.current) return;

		// if scrollyVideo already exists and any parameter is updated, destroy and recreate.
		if (scrollyVideoRef.current && scrollyVideoRef.current.destroy) {
			scrollyVideoRef.current.destroy();
		}

		const scrollyVideo = new ScrollyVideo({
			scrollyVideoContainer: containerElement.current,
			src,
			transitionSpeed,
			frameThreshold,
			cover,
			sticky,
			full,
			trackScroll,
			lockScroll,
			useWebCodecs,
			debug,
			onReady: () => {
				scrollyVideoRef.current?.paintCanvasFrame(0);
				onReadyRef.current?.();
			},
			// @ts-expect-error — bad types
			onChange: onChangeRef.current,
			videoPercentage: videoPercentageRef.current,
		});

		setInstance(scrollyVideo);
		scrollyVideoRef.current = scrollyVideo;
	}, [src, transitionSpeed, frameThreshold, cover, sticky, full, trackScroll, lockScroll, useWebCodecs, debug]);

	// effect for video percentage change
	useEffect(() => {
		// If we need to update the target time percent
		if (
			scrollyVideoRef.current &&
			typeof videoPercentage === "number" &&
			videoPercentage >= 0 &&
			videoPercentage <= 1
		) {
			scrollyVideoRef.current.setVideoPercentage(videoPercentage);
		}
	}, [videoPercentage]);

	// effect for unmount
	useEffect(
		() => () => {
			if (scrollyVideoRef.current && scrollyVideoRef.current.destroy) {
				scrollyVideoRef.current.destroy();
			}
		},
		[],
	);

	// Preload video src
	useEffect(() => {
		fetch(src)
			.then((res) => res.blob())
			.then((blob) => URL.createObjectURL(blob))
			.then((url) => {
				src = url;
			});
	}, [src]);

	useImperativeHandle(
		ref,
		() => ({
			setVideoPercentage: scrollyVideoRef.current
				? scrollyVideoRef.current.setVideoPercentage.bind(instance)
				: () => {},
		}),
		[instance],
	);

	return <div ref={containerElement} data-scrolly-container />;
}
