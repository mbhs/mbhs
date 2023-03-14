import React from "react";
import Typewriter from "typewriter-effect";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineLocationOn, MdEvent } from "react-icons/md";
import { AiOutlineSound, AiFillSound, AiOutlineClose } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";
import { Event, New, HomePage } from "../lib/types";
import Markdown from "../components/Markdown";
import Link from "next/link";

export async function getStaticProps() {
	//gets all events that are ending today or later and sorts them by date
	let today = new Date()
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");
	let events = await fetch(
		`https://strapi.mbhs.edu/api/events?filters[endDate][$gte]=${today}&sort=startDate:ASC`
	).then((res) => res.json());

	let news = await fetch(
		"https://strapi.mbhs.edu/api/news?populate=*&sort=rank:ASC"
	).then((res) => res.json());

	let meta = await fetch(
		"https://strapi.mbhs.edu/api/home-page?populate=*"
	).then((res) => res.json());

	return {
		props: {
			events: events.data,
			news: news.data,
			meta: meta.data,
		},
	};
}

interface IndexProps {
	events: Event[];
	news: New[];
	meta: HomePage;
}

export default function home({ events, news, meta }: IndexProps) {
	const [sound, setSound] = React.useState<boolean>(false);
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = React.useState<boolean>(true);
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
		<div className="relative w-full min-h-screen">
			{/* use gloabl styles so that the video is not covered by div background */}
			<style jsx global>{`
				body {
					background-color: black;
				}
			`}</style>
			{maps && (
				<div className="z-30 absolute backdrop-blur-lg h-screen w-full flex justify-center items-center">
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

			<div className="p-10 w-full sm:w-7/8 md:w-3/4 xl:w-8/12 2xl:w-7/12">
				<h1 className="text-white font-bold text-center text-xl sm:text-left sm:text-3xl lg:text-4xl 2xl:text-5xl">
					Montgomery Blair High School
				</h1>
				<h3 className="text-white text-xl pt-3">Principal Renay Johnson</h3>
				<h3 className="text-white text-xl">Home of the Blazers</h3>
				<h3 className="text-white text-xl">Crescens Scientia</h3>
				<div className="flex justify-center pt-10 gap-10">
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<HiOutlineDocumentText className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">Resources</p>
					</div>
					{/* <div className="flex flex-col items-center">
						<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<BsNewspaper className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">News</p>
					</div> */}
					<div className="flex flex-col items-center">
						<button onClick={() => setMaps(!maps)}>
							<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
								<MdOutlineLocationOn className="h-full w-full" />
							</div>
						</button>
						<p className="text-white font-semibold pt-2">Directions</p>
					</div>
					<div className="flex flex-col items-center">
						<Link href="/calendar">
							<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
								<MdEvent className="h-full w-full" />
							</div>
						</Link>
						<p className="text-white font-semibold pt-2">Calendar</p>
					</div>
				</div>
				<div className="pt-6 flex flex-col items-center gap-3">
					{news.map(({ attributes: { title, description, image } }, i) => (
						<div
							className={`bg-white bg-opacity-10 w-full text-white backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-5 ${
								image.data ? "flex flex-col md:flex-row p-0 gap-0" : "p-3"
							}`}
							key={i}
						>
							{image.data && (
								<img
									src={image.data.attributes.url}
									className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-40 object-cover w-full md:w-80"
								/>
							)}
							<div className={`${image.data && "p-3"}`}>
								{title && <p className="font-bold text-xl pb-2">{title}</p>}
								<Markdown>{description}</Markdown>
							</div>
						</div>
					))}
					{/* <Link
						href="/news"
						className="p-2 bg-opacity-10 text-white bg-white rounded-md font-bold max-w-max"
					>
						View all News
					</Link> */}
				</div>
			</div>
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
