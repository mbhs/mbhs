import React, { use } from "react";
import {
	AiOutlineSound,
	AiFillSound,
	AiOutlineClockCircle,
	AiOutlineCalendar,
} from "react-icons/ai";
import {
	BsFillPeopleFill,
	BsCalendar2WeekFill,
	BsFillVolumeUpFill,
	BsFillVolumeMuteFill,
} from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPlay, FaPause } from "react-icons/fa";
import { Event, New, HomePage } from "../lib/types";
import Markdown from "../components/Markdown";
import Link from "next/link";
import { makeDates, getEvenOdd } from "./calendar/evenodd";
import { TbMapPin } from "react-icons/tb";
import { FaRegEye, FaChevronLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { BsInstagram } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi";
import { MdLunchDining } from "react-icons/md";
import { BsCaretLeftFill } from "react-icons/bs";
import { BsCaretRightFill } from "react-icons/bs";

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
		`https://strapi.mbhs.edu/api/events?filters[$or][0][endDate][$gte]=${todayStr}&filters[$or][1][$and][0][endDate][$null]=true&filters[$or][1][$and][1][startDate][$gte]=${todayStr}&filters[$and][3][startDate][$lte]=${nextWeek}&sort=startDate:ASC&sort=startTime:ASC&filters[important]=true`
	).then((res) => res.json());

	if (events!.meta.pagination.total < 3) {
		events = await fetch(
			`https://strapi.mbhs.edu/api/events?filters[startDate][$gte]=${todayStr}&sort=startDate:ASC&sort=startTime:ASC&filters[important]=true&pagination[pageSize]=3`
		).then((res) => res.json());
	}

	console.log(events);

	let news = await fetch(
		`https://strapi.mbhs.edu/api/news?filters[$and][0][removeOn][$gte]=${todayStr}&filters[$and][1][$or][0][publishOn][$lte]=${todayStr}&filters[$and][1][$or][1][publishOn][$null]=true&populate=*&sort=rank:ASC`
	).then((res) => res.json());

	let meta = await fetch(
		"https://strapi.mbhs.edu/api/home-page?populate=*"
	).then((res) => res.json());

	let scheduleDays = await fetch(
		"https://strapi.mbhs.edu/api/evenodd?populate=*"
	).then((res) => res.json());

	const stored: { [key: string]: number } = makeDates(scheduleDays!.data);

	let scoMeta = await fetch("https://silverchips.mbhs.edu/mbhssite").then(
		(res) => res.json()
	);

	return {
		props: {
			events: events.data,
			news: news.data,
			meta: meta.data,
			dates: stored,
			scoMeta: scoMeta.data,
		},
		revalidate: 60,
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

function getEmbed(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return `https://www.youtube.com/embed/${
		match && match[2].length === 11 ? match[2] : null
	}`;
}

interface SCO {
	title: string;
	description: string;
	image: string;
	link: string;
}

interface IndexProps {
	events: Event[];
	news: New[];
	meta: HomePage;
	dates: { [key: string]: number };
	scoMeta: SCO[];
	dark: boolean;
}

export const useObserveElementWidth = <T extends HTMLElement>() => {
	const [width, setWidth] = React.useState(0);
	const ref = React.useRef<T>(null);

	React.useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			setWidth(entries[0].contentRect.width);
		});

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			ref.current && observer.unobserve(ref.current);
		};
	}, []);

	return {
		width,
		ref,
	};
};

export default function Home({
	events,
	news,
	meta,
	dates,
	scoMeta,
	dark,
}: IndexProps) {
	const [sound, setSound] = React.useState<boolean>(false);
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = React.useState<boolean>(true);
	const [sco, setSCO] = React.useState<boolean>(false);
	// const [seconds, setSeconds] = React.useState<number>(0);

	const { width, ref } = useObserveElementWidth<HTMLDivElement>();
	const scroll = width === 0 ? false : width < 330;
	const circlesRef = React.useRef<HTMLDivElement>(null);

	const togglePlayPause = () => {
		if (playing) {
			videoRef.current?.pause();
			setPlaying(false);
		} else {
			videoRef.current?.play();
			setPlaying(true);
		}
	};
	/* Puzzlepalooza time
	React.useEffect(() => {
		const interval = setInterval(() => {
		setSeconds((new Date("May 30, 2024 8:00:00")).getTime() - Date.now());

		},1);
		return () => clearInterval(interval);

	}, [seconds]); */
		
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
				<h1 className="font-extrabold text-center text-2xl sm:text-left sm:text-3xl lg:text-4xl 2xl:text-5xl">
					Montgomery Blair High School
				</h1>
				<h3 className="md:text-xl pt-3">
					{meta.attributes.principal}
				</h3>
				<h3 className="md:text-xl">Home of the Blazers</h3>
				<h3 className="md:text-xl italic">Crescens Scientia</h3>
				<div className="relative">
					{scroll && (
						<BsCaretLeftFill
							className="text-white w-6 h-6 absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer"
							onClick={() =>
								circlesRef.current &&
								circlesRef.current.scrollBy({ left: -78, behavior: "smooth" })
							}
						/>
					)}
					{scroll && (
						<BsCaretRightFill
							className="text-white w-6 h-6 absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer"
							onClick={() =>
								circlesRef.current &&
								circlesRef.current.scrollBy({ left: 78, behavior: "smooth" })
							}
						/>
					)}
					<div ref={ref}>
						<div className={`${scroll && "ml-6 mr-6"}`}>
							<div
								id="circles"
								ref={circlesRef}
								className="flex justify-start circles:justify-center pt-4 gap-10 text-black dark:text-white overflow-y-hidden overflow-x-auto circles:overflow-visible whitespace-nowrap scrollbehavior:smooth"
							>
								<div className="flex flex-col items-center" itemID="1">
									<Link href="/resources">
										<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-neutral-800 dark:hover:bg-white text-white hover:text-red-500 dark:hover:text-red-600 origin-bottom cursor-pointer w-12 h-12 p-[14px] md:w-16 md:h-16 md:p-[18px]">
											<BsFillPeopleFill className="h-full w-full" />
										</div>
									</Link>
									<p className="font-semibold pt-2 md:text-base text-xs">
										Resources
									</p>
								</div>
								<div className="flex flex-col items-center" itemID="2">
									<a
										target="blank"
										href="https://goo.gl/maps/M5DGpJECkjYnNpRK7"
									>
										<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-neutral-800 dark:hover:bg-white text-white hover:text-red-500 dark:hover:text-red-600 origin-bottom cursor-pointer w-12 h-12 p-[14px] md:w-16 md:h-16 md:p-[18px]">
											<FaMapMarkerAlt className="h-full w-full" />
										</div>
									</a>
									<p className="font-semibold pt-2 md:text-base text-xs">
										Directions
									</p>
								</div>
								<div className="flex flex-col items-center" itemID="3">
									<Link href="/calendar">
										<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-neutral-800 dark:hover:bg-white text-white hover:text-red-500 dark:hover:text-red-600 origin-bottom cursor-pointer w-12 h-12 p-[14px] md:w-16 md:h-16 md:p-[18px]">
											<BsCalendar2WeekFill className="h-full w-full" />
										</div>
									</Link>
									<p className="font-semibold pt-2 md:text-base text-xs">
										Calendar
									</p>
								</div>
								<div className="flex flex-col items-center" itemID="4">
									<Link href="https://lunch.mbhs.edu">
										<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-neutral-800 dark:hover:bg-white text-white hover:text-red-500 dark:hover:text-red-600 origin-bottom cursor-pointer w-12 h-12 p-[14px] md:w-16 md:h-16 md:p-[18px]">
											<MdLunchDining className="h-full w-full" />
										</div>
									</Link>
									<p className="font-semibold pt-2 md:text-base text-xs">
										Lunch
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-center pt-4 md:pt-6 gap-10 text-black dark:text-white">
					<p className="font-extrabold">{getEvenOdd(dates)}</p>
				</div>
				<div className="pt-4 flex flex-col items-center gap-3">
					{news
						.filter(({ attributes: { rank } }) => rank <= 5)
						.map(({ attributes: { title, description, image, link } }, i) => (
							<div
								className={`bg-black dark:bg-white border border-neutral-400 dark:border-neutral-700 bg-opacity-10 dark:bg-opacity-10 dark:hover:bg-opacity-5 w-full text-black dark:text-white backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-10 ${
									image.data || link
										? "flex flex-col md:flex-row p-0 gap-0"
										: "p-3"
								}`}
								key={i}
							>
								{link && (
									<iframe
										src={getEmbed(link)}
										allowFullScreen
										className="h-full w-auto md:flex-1 md:h-40 rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
									/>
								)}
								{image.data && !link && (
									<img
										src={image.data.attributes.url}
										className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-40 object-cover w-full md:w-80"
									/>
								)}
								<div className={`${(image.data || link) && "p-3"}`}>
									{title && <p className="font-bold text-xl pb-2">{title}</p>}
									<Markdown>{description}</Markdown>
								</div>
							</div>
						))}
					{events.map(
						(
							{
								attributes: {
									title,
									description,
									startDate,
									endDate,
									startTime,
									location,
								},
							},
							i
						) => (
							<div className="bg-black dark:bg-white border border-neutral-400 dark:border-neutral-700 dark:bg-opacity-10 bg-opacity-10 dark:hover:bg-opacity-5 flex gap-3 w-full text-white backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-10 p-3">
								<div
									className={`flex justify-center items-center text-center font-semibold bg-red-600 text-white p-2 ${
										endDate ? "w-32" : "w-16"
									}
										 h-16 rounded-full`}
								>
									<div>
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
									{endDate && (
										<>
											<p className="px-2 text-bold"> - </p>
											<div className="flex flex-col">
												<p className="text-md -mb-1">
													{new Date(endDate).toLocaleString("default", {
														timeZone: "UTC",
														month: "short",
													})}
												</p>
												<p className="text-xl">
													{new Date(endDate).toLocaleString("default", {
														timeZone: "UTC",
														day: "numeric",
													})}
												</p>
											</div>
										</>
									)}
								</div>

								<div className="flex-1 text-black dark:text-white">
									<div className="flex">
										{title && <p className="font-bold text-xl">{title}</p>}{" "}
									</div>
									<p className="flex gap-1 items-center">
										{startTime && (
											<>
												<AiOutlineClockCircle /> {parseTime(startTime)}
											</>
										)}
										{location && (
											<>
												<TbMapPin /> {location}
											</>
										)}
									</p>
									{description && <Markdown>{description}</Markdown>}
								</div>
							</div>
						)
					)}
					{/*
					<div className="bg-black dark:bg-white border border-neutral-400 dark:border-neutral-700 dark:bg-opacity-10 bg-opacity-10 dark:hover:bg-opacity-5 flex grid-cols-1 gap-3 w-full text-white backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-10 p-3">
				<div className="flex flex-col w-full text-puzzlepalooza" >
				<div className="flex items-center flex-col w-full text-5xl"> <b>{seconds}</b> </div>
				<div className="flex items-center flex-col w-full text-2xl">milliseconds until</div>
				<div className="flex items-center flex-col w-full text-2xl text-black dark:text-white"> <a href="https://puzzlepalooza.mbhs.edu">Puzzlepalooza!</a> </div>
				
				</div> 
				</div>
				*/}
					{news
						.filter(({ attributes: { rank } }) => rank > 5)
						.map(({ attributes: { title, description, image } }, i) => (
							<div
								className={`bg-black dark:bg-white border border-neutral-400 dark:border-neutral-700 bg-opacity-10 dark:bg-opacity-10 dark:hover:bg-opacity-5 w-full text-black dark:text-white backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-10 ${
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
			<div className="-z-10 absolute right-0 top-0 h-[80vh] animate-fadeIn">
				<div className="relative h-full">
					<div className="absolute inset-0 bg-black opacity-100 md:bg-opacity-0 md:opacity-100 md:bg-gradient-to-t from-white dark:from-black to-transparent h-full"></div>

					<video
						src={meta.attributes.video.data.attributes.url.replace(
							"http://",
							"https://"
						)}
						controls={false}
						autoPlay={true}
						ref={videoRef}
						loop={true}
						muted={!sound}
						onPlay={() => setPlaying(true)}
						onPause={() => setPlaying(false)}
						className="h-full w-full object-cover hidden md:block"
					/>

					<div className="absolute inset-0 md:bg-opacity-0 md:opacity-100 md:bg-gradient-to-r from-white dark:from-black to-transparent h-full" />
				</div>
			</div>
			{!sco && (
				<motion.div
					layoutId="bigdiv"
					onClick={() => setSCO(true)}
					className="cursor-pointer hidden gap-2 items-center w-max absolute md:top-5 scobl:top-16 top-32 scoh:flex right-0 p-3 bg-red-600 text-white bg-opacity-50 backdrop-blur-md rounded-l-lg"
				>
					<FaChevronLeft />{" "}
					<motion.span layoutId="title" layout="preserve-aspect">
						Silver Chips Online
					</motion.span>
				</motion.div>
			)}
			{sco && (
				<motion.div
					layoutId="bigdiv"
					className="w-full overflow-hidden md:w-max absolute left-0 md:left-auto md:top-5 top-16 right-0 p-3 bg-red-700 text-white bg-opacity-90 backdrop-blur-md rounded-l-lg"
				>
					<motion.span
						layoutId="title"
						layout="preserve-aspect"
						className="font-bold flex items-center justify-between"
					>
						<div className="flex items-center justify-center gap-2">
							<IoClose
								className="h-6 w-6 cursor-pointer"
								onClick={() => setSCO(false)}
							/>{" "}
							<Link href="https://silverchips.mbhs.edu">
								Silver Chips Online
							</Link>
						</div>

						<div className="flex items-center justify-center gap-2">
							<Link href="https://www.instagram.com/silverchips_online">
								<BsInstagram className="h-5 w-5" />
							</Link>
							<Link href="https://www.youtube.com/@SilverChipsOnline">
								<FiYoutube className="h-5 w-5" />
							</Link>
						</div>
					</motion.span>
					<div className="w-full flex flex-col items-center pt-3 gap-3">
						{scoMeta.map((s: SCO) => (
							<Link href={s.link} className="w-full">
								<div className="relative">
									<div className="cursor-pointer flex items-center gap-2 justify-center h-full w-full absolute hover:bg-black rounded-lg z-10 opacity-0 hover:opacity-30 duration-300 transition-all">
										<FaRegEye className="w-6 h-6" /> Read More
									</div>
									<img
										className="border-2 border-black w-full md:w-96 h-36 rounded-lg object-cover"
										src={s.image}
									/>
									<p className="absolute bottom-0 border-2 border-black text-sm p-3 left-0 right-0 text-center rounded-b-lg bg-black backdrop-blur-md bg-opacity-50">
										{s.title}
									</p>
								</div>
							</Link>
						))}
					</div>
				</motion.div>
			)}
			<div className="absolute right-0 top-0 h-[80vh]">
				<div className="relative h-full">
					<button
						className="hidden md:block absolute bottom-5 right-5 md:right-16 h-8 w-8 bg-red-700 text-white transition-all duration-300 hover:bg-neutral-800 dark:hover:bg-white hover:text-red-700 p-2 rounded-full"
						onClick={() => togglePlayPause()}
					>
						{playing ? <FaPause /> : <FaPlay />}
					</button>
					{meta.attributes.caption && (
						<div className="hidden md:block w-max absolute top-5 right-5 p-3 bg-black text-white bg-opacity-50 backdrop-blur-md rounded-lg">
							<Markdown>{meta.attributes.caption}</Markdown>
						</div>
					)}
					<button
						className="hidden md:block absolute bottom-5 right-5 h-8 w-8 bg-red-700 text-white transition-all duration-300 hover:bg-neutral-800 dark:hover:bg-white hover:text-red-700 p-2 rounded-full"
						onClick={() => setSound(!sound)}
					>
						{sound ? <AiOutlineSound /> : <AiFillSound />}
					</button>
				</div>
			</div>
		</div>
	);
}
