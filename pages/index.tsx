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
import { Event, New } from "../lib/types";
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

	let news = await fetch("https://strapi.mbhs.edu/api/news").then((res) =>
		res.json()
	);

	return {
		props: {
			events: events.data,
			news: news.data,
		},
	};
}

interface IndexProps {
	events: Event[];
	news: New[];
}

export default function Home({ events, news }: IndexProps) {
	const [shortcuts, setShortcuts] = useState<boolean>(false);

	return (
		<div className="px-5 md:px-10">
			{/* {shortcuts && (
				<div className="absolute top-0 left-0 min-h-screen z-50 bg-neutral-200 p-2 flex flex-col items-end gap-2 w-full md:w-1/3">
					<CgClose
						size="1.5rem"
						className="cursor-pointer"
						onClick={() => setShortcuts(false)}
					/>
					<Link
						href="/schedule"
						className="font-extrabold bg-black text-center hover:bg-red-600 duration-300  text-white px-4 py-2 rounded-xl w-full text-xs md:text-base"
					>
						Bell Schedule & Buses
					</Link>
					{new Array(10).fill(0).map((x, i) => (
						<Link
							href="/events"
							key={i}
							className="font-extrabold bg-black text-center hover:bg-red-600 duration-300  text-white px-4 py-2 rounded-xl w-full text-xs md:text-base"
						>
							Events
						</Link>
					))}
				</div>
			)} */}
			<div className="flex flex-wrap justify-between gap-5 pt-5">
				{/* <div
					className="xl:hidden cursor-pointer absolute bg-neutral-200 border-2 border-neutral-300 rounded-lg p-2"
					onClick={() => setShortcuts(!shortcuts)}
				>
					<AiOutlineMenu />
				</div> */}

				{/* <div className="xl:block hidden">
					<div className="bg-neutral-200 p-5 py-2 rounded-lg mb-3 w-full md:w-80">
						<h2 className="text-center font-bold text-xl pb-3">Shortcuts</h2>
						<div className="flex flex-col gap-3 justify-center">
							<Link
								href="/schedule"
								className="font-extrabold bg-black text-center hover:bg-red-600 duration-300  text-white px-4 py-2 rounded-xl w-full text-xs md:text-base"
							>
								Bell Schedule & Buses
							</Link>
							{new Array(10).fill(0).map((x, i) => (
								<Link
									key={i}
									href="/events"
									className="font-extrabold bg-black text-center hover:bg-red-600 duration-300  text-white px-4 py-2 rounded-xl w-full text-xs md:text-base"
								>
									Events
								</Link>
							))}
						</div>
					</div>
				</div> */}
				<div className="flex-1 mx-auto">
					<h1 className="text-xl md:text-4xl text-center font-bold mb-5">
						Montgomery Blair High School
					</h1>
					<div className="flex-1">
						<div className="mx-auto md:w-max">
							<img
								src="https://mbhs.edu/carousel/img3.png"
								alt="MBHS"
								className="rounded-lg md:w-full md:h-96"
							/>
						</div>
					</div>
					<h2 className="font-bold text-2xl text-center pt-5 pb-3">News</h2>
					<div className="flex flex-col gap-3">
						{news.map(({ attributes: { title, description } }, i) => (
							<div
								className="bg-white shadow-md rounded-lg p-2 transition-all duration-300 hover:bg-neutral-300"
								key={i}
							>
								{title && <p className="font-bold text-xl pb-2">{title}</p>}
								<Markdown>{description}</Markdown>
							</div>
						))}
					</div>
				</div>
				<div>
					<div className="bg-white shadow-md p-5 py-2 rounded-lg mb-3 w-full md:w-80">
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
