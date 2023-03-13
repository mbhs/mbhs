import React from "react";
import Typewriter from "typewriter-effect";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlineLocationOn, MdEvent } from "react-icons/md";
import { AiOutlineSound, AiFillSound, AiOutlineClose } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";
import { Event, New, HomePage } from "../lib/types";
import Markdown from "../components/Markdown";
import Link from "next/link";
import Video from "../components/Video";
import { use } from "react";

const fetchData = async () => {
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
			events: events.data as Event[],
			news: news.data as New[],
			meta: meta.data as HomePage,
		},
	};
};

export default function home() {
	const {
		props: { events, news, meta },
	} = use(fetchData());

	return (
		<div className="relative w-full min-h-screen">
			<div className="p-10 w-full sm:w-7/8 md:w-3/4 xl:w-8/12 2xl:w-7/12">
				<h1 className="text-white font-bold text-center text-xl sm:text-left sm:text-3xl lg:text-4xl 2xl:text-5xl">
					Montgomery Blair High School School
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
						<button>
							<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
								<MdOutlineLocationOn className="h-full w-full" />
							</div>
						</button>
						<p className="text-white font-semibold pt-2">Directions</p>
					</div>
					<div className="flex flex-col items-center">
						<div className="rounded-full bg-red-600 hover:shadow-md transition-all duration-300 hover:scale-125 hover:bg-white text-white hover:text-red-600 origin-bottom cursor-pointer w-16 h-16 p-4">
							<MdEvent className="h-full w-full" />
						</div>
						<p className="text-white font-semibold pt-2">Events</p>
					</div>
				</div>
				<Video meta={meta} />
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
					<Link
						href="/news"
						className="p-2 bg-opacity-10 text-white bg-white rounded-md font-bold max-w-max"
					>
						View all News
					</Link>
				</div>
			</div>
		</div>
	);
}
