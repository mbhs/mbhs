import React from "react";
import Link from "next/link";
import { Event } from "../lib/types";
import Markdown from "../components/Markdown";
import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";

export async function getStaticProps() {
	//gets all events that are ending today or later and sorts them by date
	let today = new Date()
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");
	let events = await fetch(
		`https://strapi.mbhs.edu/api/events?filters[$or][0][endDate][$gte]=${today}&filters[$or][1][endDate][$null]=true&filters[$and][2][startDate][$gte]=${today}&sort=startDate:ASC`
	).then((res) => res.json());

	return {
		props: {
			events: events.data,
		},
	};
}

interface CalendarProps {
	events: Event[];
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

export default function Calendar({ events }: CalendarProps) {
	return (
		<div className="rounded-lg p-2 md:px-40 pb-10">
			<h1 className="text-xl md:text-4xl font-bold text-center pb-3">
				Calendar
			</h1>
			<div className="flex flex-col gap-5 flex-wrap">
				{events.map(
					(
						{
							attributes: { title, description, startDate, endDate, startTime },
						},
						i
					) => (
						<Link href="/calendar" className="w-full">
							<div className="bg-black flex gap-3 bg-opacity-10 w-full text-black backdrop-blur-lg rounded-lg transition-all duration-300 hover:bg-opacity-20 p-3">
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
								<div className="flex-1">
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
									{description && <Markdown>{description}</Markdown>}
								</div>
							</div>
						</Link>
					)
				)}
			</div>
		</div>
	);
}
