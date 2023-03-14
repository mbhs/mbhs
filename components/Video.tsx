"use client";

import React from "react";
import { AiOutlineSound, AiFillSound } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { HomePage } from "../lib/types";

interface VideoProps {
	meta: HomePage;
}

export default function Video({ meta }: VideoProps) {
	const [sound, setSound] = React.useState<boolean>(false);
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = React.useState<boolean>(true);

	const togglePlayPause = () => {
		if (playing) {
			videoRef.current?.pause();
			setPlaying(false);
		} else {
			videoRef.current?.play();
			setPlaying(true);
		}
	};
	return (
		<div>
			<div className="-z-10 absolute right-0 top-0 h-5/6">
				<div className="relative h-full">
					<video
						src={meta.attributes.video.data.attributes.url}
						controls={false}
						autoPlay={true}
						ref={videoRef}
						loop={true}
						muted={!sound}
						onPlay={() => setPlaying(true)}
						onPause={() => setPlaying(false)}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-black bg-opacity-80 md:bg-opacity-0 md:opacity-100 md:bg-gradient-to-r from-black to-transparent h-full" />
				</div>
			</div>
			<div className="absolute right-0 top-0 h-5/6">
				<div className="relative h-full">
					<button
						className="fixed md:absolute z-50 bottom-5 right-5 md:right-16 h-8 w-8 bg-red-700 text-white transition-all duration-300 hover:bg-white hover:text-red-700 p-2 rounded-full"
						onClick={() => togglePlayPause()}
					>
						{playing ? <FaPause /> : <FaPlay />}
					</button>
					<button
						className="hidden md:block absolute z-50 bottom-5 right-5 h-8 w-8 bg-red-700 text-white transition-all duration-300 hover:bg-white hover:text-red-700 p-2 rounded-full"
						onClick={() => setSound(!sound)}
					>
						{sound ? <AiOutlineSound /> : <AiFillSound />}
					</button>
				</div>
			</div>
		</div>
	);
}
