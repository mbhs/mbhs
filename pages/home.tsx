import React from "react";
import Typewriter from "typewriter-effect";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineLocationOn, MdEvent } from "react-icons/md";
import { AiOutlineSound, AiFillSound } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";

export default function home() {
	const [sound, setSound] = React.useState<boolean>(false);
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = React.useState<boolean>(false);

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
		<div className="relative w-full bg-red-600 h-screen -mt-6">
			<div className="p-10 absolute z-10">
				<h1 className="text-white font-bold text-5xl">
					Montgomery Blair High School
				</h1>
				<h3 className="text-white text-2xl pt-5">
					<Typewriter
						options={{
							strings: [
								"Principal Renay Johnson",
								"Home of the Blazers!",
								"Crescens Scientia",
							],
							autoStart: true,
							loop: true,
							delay: 50,
						}}
					/>
				</h3>
				<div className="flex justify-center pt-10 gap-10">
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-800 transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<HiOutlineDocumentText className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">Resources</p>
					</div>
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-800 transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<BsNewspaper className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">News</p>
					</div>
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-800 transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<MdOutlineLocationOn className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">Directions</p>
					</div>
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-800 transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<MdEvent className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">Events</p>
					</div>
				</div>
			</div>
			<div className="absolute right-0 top-0 h-5/6">
				<div className="relative h-full">
					<video
						src="https://ia801509.us.archive.org/10/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4"
						controls={false}
						autoPlay={true}
						ref={videoRef}
						loop={true}
						muted={!sound}
						onPlay={() => setPlaying(true)}
						className="h-full"
					/>
					<div className="absolute inset-0 opacity-100 bg-gradient-to-r from-red-600 to-transparent h-full" />
					<button
						className="absolute bottom-5 right-16 h-8 w-8 bg-red-800 text-white transition-all duration-300 hover:bg-white hover:text-red-600 p-2 rounded-full"
						onClick={() => togglePlayPause()}
					>
						{playing ? <FaPause /> : <FaPlay />}
					</button>
					<button
						className="absolute bottom-5 right-5 h-8 w-8 bg-red-800 text-white transition-all duration-300 hover:bg-white hover:text-red-600 p-2 rounded-full"
						onClick={() => setSound(!sound)}
					>
						{sound ? <AiOutlineSound /> : <AiFillSound />}
					</button>
				</div>
			</div>
		</div>
	);
}
