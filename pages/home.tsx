import React from "react";
import Typewriter from "typewriter-effect";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineLocationOn, MdEvent } from "react-icons/md";
import { AiOutlineSound, AiFillSound, AiOutlineClose } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";

export default function home() {
	const [sound, setSound] = React.useState<boolean>(false);
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = React.useState<boolean>(false);
	const [maps, setMaps] = React.useState<boolean>(false);

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
		<div className="relative w-full bg-red-700 h-screen">
			{maps && (
				<div className="z-30 backdrop-blur-lg absolute h-screen w-full flex justify-center items-center">
					<motion.div
						initial={{ scale: 0.1, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.1, opacity: 0 }}
						className="z-30 md:h-2/3 md:w-1/3 bg-white rounded-lg p-6"
					>
						<div className="flex justify-between pb-4">
							<h1 className="text-red-600 text-2xl font-bold">Directions</h1>
							<button
								onClick={() => setMaps(false)}
								className="bg-red-600 rounded-lg p-2 text-white"
							>
								<AiOutlineClose />
							</button>
						</div>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3099.8565552833993!2d-77.01425218481354!3d39.01858557955217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7cf586f9b73d5%3A0xc227c473fffb50c7!2sMontgomery%20Blair%20High%20School!5e0!3m2!1sen!2sus!4v1677519194208!5m2!1sen!2sus"
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className="rounded-lg border-0 w-full h-full"
						></iframe>
					</motion.div>
				</div>
			)}

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
						<div className="rounded-full bg-red-900 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<HiOutlineDocumentText className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">Resources</p>
					</div>
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-900 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<BsNewspaper className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">News</p>
					</div>
					<div className="flex flex-col items-center">
						<button onClick={() => setMaps(!maps)}>
							<div className="rounded-full bg-red-900 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
								<MdOutlineLocationOn className="h-full w-full" />
							</div>
						</button>
						<p className="text-white font-semibold pt-2">Directions</p>
					</div>
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-900 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
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
					<div className="absolute inset-0 opacity-100 bg-gradient-to-r from-red-700 to-transparent h-full" />
					<button
						className="absolute bottom-5 right-16 h-8 w-8 bg-red-700 text-white transition-all duration-300 hover:bg-white hover:text-red-700 p-2 rounded-full"
						onClick={() => togglePlayPause()}
					>
						{playing ? <FaPause /> : <FaPlay />}
					</button>
					<button
						className="absolute bottom-5 right-5 h-8 w-8 bg-red-700 text-white transition-all duration-300 hover:bg-white hover:text-red-700 p-2 rounded-full"
						onClick={() => setSound(!sound)}
					>
						{sound ? <AiOutlineSound /> : <AiFillSound />}
					</button>
				</div>
			</div>
		</div>
	);
}
