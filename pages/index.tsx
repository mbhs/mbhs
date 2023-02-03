import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Calendar from "../components/Calendar";
import { BsFillTelephoneFill, BsFillPersonFill } from "react-icons/bs";
import { GrTextAlignCenter } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { Event, New, Carousel } from "../lib/types";
import Markdown from "../components/Markdown";
import Link from "next/link";
import Gallery from "../components/Gallery";

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

	let news = await fetch("https://strapi.mbhs.edu/api/news").then((res) =>
		res.json()
	);

	let carousel = await fetch(
		"https://strapi.mbhs.edu/api/carousels?populate=*"
	).then((res) => res.json());

	return {
		props: {
			events: events.data,
			news: news.data,
			carousel: carousel.data,
		},
	};
}

interface IndexProps {
	events: Event[];
	news: New[];
	carousel: Carousel[];
}

export default function Home({ events, news, carousel }: IndexProps) {
	const [shortcuts, setShortcuts] = useState<boolean>(false);

	return (
		<div className="px-5 md:px-12 lg:px-24 xl:px-48">
			<div className="flex flex-wrap justify-between gap-5 pt-5">
				<div className="flex-1 mx-auto">
					<h1 className="text-xl md:text-4xl text-center font-bold mb-5">
						Montgomery Blair High School
					</h1>
					<div className="flex-1">
						<Gallery carousel={carousel} />
					</div>
					<h2 className="font-bold text-2xl text-center pt-5 pb-3">News</h2>
					<div className="flex flex-col gap-3">
						{news.map(({ attributes: { title, description } }, i) => (
							<div
								className="border-4 bg-neutral-200 rounded-lg p-2 transition-all duration-300 hover:bg-neutral-300"
								key={i}
							>
								{title && <p className="font-bold text-xl pb-2">{title}</p>}
								<Markdown>{description}</Markdown>
							</div>
						))}
					</div>
				</div>
				<div>
					<div className="border-4 bg-neutral-200 p-5 py-2 rounded-lg mb-3 w-full md:w-80">
						<h2 className="text-center font-bold text-xl">School Info</h2>
						<p className="flex gap-2 items-center duration-200 hover:text-red-600 cursor-pointer">
							<BsFillPersonFill />
							Principal Renay Johnson
						</p>
						<p className="flex gap-2 items-center duration-200 hover:text-red-600 cursor-pointer">
							<HiHome />
							Home of the Blazers
						</p>
						<p className="flex gap-2 items-center duration-200 hover:text-red-600 cursor-pointer">
							<GrTextAlignCenter />
							Crescens Scientia
						</p>
						<p className="flex gap-2 items-center duration-200 hover:text-red-600 cursor-pointer">
							<IoLocationSharp className="flex-none" />
							51 University Blvd East Silver Spring Maryland 20901-2451
						</p>
						<p className="flex gap-2 items-center duration-200 hover:text-red-600 cursor-pointer">
							<BsFillTelephoneFill /> (240) 740-7200
						</p>
					</div>
					<Calendar events={events} />
				</div>
			</div>
		</div>
	);
}
