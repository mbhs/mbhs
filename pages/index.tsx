import React from "react";
import Typewriter from "typewriter-effect";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsNewspaper } from "react-icons/bs";
import { MdOutlineLocationOn, MdEvent } from "react-icons/md";
import {
	AiOutlineSound,
	AiFillSound,
	AiOutlineClose,
	AiOutlineClockCircle,
	AiOutlineCalendar,
} from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { Event, New, HomePage } from "../lib/types";
import Markdown from "../components/Markdown";
import Link from "next/link";

export async function getStaticProps() {
	//gets all events that are ending today or later and sorts them by date
	let today = new Date();

	// generate a date for one week from now
	let days = 14;
	var nextWeek = new Date(today.getTime() + days * 24 * 60 * 60 * 1000)
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	let todayStr = today
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	console.log(todayStr, nextWeek);
	let events = await fetch(
		`https://strapi.mbhs.edu/api/events?filters[$or][0][endDate][$gte]=${todayStr}&filters[$or][1][endDate][$null]=true&filters[$and][2][startDate][$gte]=${todayStr}&filters[$and][3][startDate][$lte]=${nextWeek}&sort=startDate:ASC&filters[important]=true`
	).then((res) => res.json());

	console.log(events);

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
		revalidate: 60
	};
}

const parseTime = (time: string) => {
	let timeArr = time.split(":");
	let hours = parseInt(timeArr[0]);
	let minutes = parseInt(timeArr[1]);
	let ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	if (hours == 0) {
		hours = 12;
	}
	return `${hours < 10 ? "0" + hours : hours}:${
		minutes < 10 ? "0" + minutes : minutes
	} ${ampm}`;
};

function trunc(text: string, max: number): string {
	return text.substring(0, max - 1) + (text.length > max ? "&hellip;" : "");
}

interface IndexProps {
	events: Event[];
	news: New[];
	meta: HomePage;
	dark: boolean;
}

export default function home({ events, news, meta, dark }: IndexProps) {
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
		<div className="relative w-full min-h-screen">
			{/* use gloabl styles so that the video is not covered by div background */}
			{dark && (
				<style jsx global>{`
					body {
						background-color: black;
					}
				`}</style>
			)}

			<div className="text-black dark:text-white md:p-10 p-5 w-full sm:w-7/8 md:w-3/4 xl:w-8/12 2xl:w-7/12">
				<h1 className="font-bold text-center text-xl sm:text-left sm:text-3xl lg:text-4xl 2xl:text-5xl">
					Montgomery Blair High School
				</h1>
				<h3 className="md:text-xl pt-3">
					Principal {meta.attributes.principal}
				</h3>
				<h3 className="md:text-xl">Home of the Blazers</h3>
				<h3 className="md:text-xl">Crescens Scientia</h3>
				<div className="flex justify-center pt-10 gap-10 text-black dark:text-white">
					<div className="flex flex-col items-center">
						<Link href="/resources">
							<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-black dark:hover:bg-white text-white hover:text-red-500 dark:hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
								<HiOutlineDocumentText className="h-full w-full" />
							</div>
						</Link>
						<p className="font-semibold pt-2">Resources</p>
					</div>
					{/* <div className="flex flex-col items-center">
						<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<BsNewspaper className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">News</p>
					</div> */}
					<div className="flex flex-col items-center">
						<a target="blank" href="https://goo.gl/maps/M5DGpJECkjYnNpRK7">
							<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-black dark:hover:bg-white text-white hover:text-red-500 dark:hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
								<MdOutlineLocationOn className="h-full w-full" />
							</div>
						</a>
						<p className="font-semibold pt-2">Directions</p>
					</div>
					<div className="flex flex-col items-center">
						<Link href="/calendar">
							<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-black dark:hover:bg-white text-white hover:text-red-500 dark:hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
								<MdEvent className="h-full w-full" />
							</div>
						</Link>
						<p className="font-semibold pt-2">Calendar</p>
					</div>
				</div>
				<div className="pt-6 flex flex-col items-center gap-3">
					{events.map(
						(
							{
								attributes: {
									title,
									description,
									startDate,
									endDate,
									startTime,
								},
							},
							i
						) => (
							<Link href="/calendar" className="w-full" key={i}>
								<div className="bg-black dark:bg-white border border-neutral-400 dark:border-neutral-700 dark:bg-opacity-10 bg-opacity-20 dark:hover:bg-opacity-5 flex gap-3 w-full text-white backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-10 p-3">
									<div className="flex flex-col justify-center items-center text-center font-semibold bg-red-600 text-white p-2 h-16 w-16 rounded-full">
										<p className="text-md -mb-1">
											{new Date(startDate).toLocaleString("default", {
												timeZone: "UTC",
												month: "short",
											})}
										</p>
										<p className="text-xl">
											{new Date(startDate).toLocaleString("default", {
												timeZone: "UTC",
												day: "numeric",
											})}
										</p>
									</div>
									<div className="flex-1 text-black dark:text-white">
										{title && <p className="font-bold text-xl">{title}</p>}
										<p className="flex gap-1 items-center">
											{startTime && (
												<>
													<AiOutlineClockCircle /> {parseTime(startTime)}
												</>
											)}
											{endDate && (
												<>
													<AiOutlineCalendar /> Ends{" "}
													{new Date(endDate).toLocaleString("default", {
														timeZone: "UTC",
														month: "short",
														day: "numeric",
													})}
												</>
											)}
										</p>
										{description && (
											<Markdown>{trunc(description, 90)}</Markdown>
										)}
									</div>
								</div>
							</Link>
						)
					)}
					{news.map(({ attributes: { title, description, image } }, i) => (
						<div
							className={`bg-black dark:bg-white border border-neutral-400 dark:border-neutral-700 bg-opacity-20 dark:bg-opacity-10 dark:hover:bg-opacity-5 w-full text-black dark:text-white backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-10 ${
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
			<div className="-z-10 absolute right-0 top-0 h-5/6 animate-fadeIn">
				<div className="relative h-full">
					<div className="absolute inset-0 md:bg-opacity-0 md:opacity-100 md:bg-gradient-to-t from-white dark:from-black to-transparent h-full"></div>
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

					<div className="absolute inset-0 md:bg-opacity-0 md:opacity-100 md:bg-gradient-to-r from-white dark:from-black to-transparent h-full" />
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
					{meta.attributes.caption && (
						<div className="w-max absolute top-5 right-5 p-3 bg-black text-white bg-opacity-50 backdrop-blur-md rounded-lg">
							<Markdown>{meta.attributes.caption}</Markdown>
						</div>
					)}
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
