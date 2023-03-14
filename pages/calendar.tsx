import React from "react";
import Link from "next/link";
import { Event } from "../lib/types";
import Markdown from "../components/Markdown";

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
		<div className="rounded-lg p-2 md:px-40">
			<h1 className="text-xl md:text-4xl font-bold text-center pb-3">
				Calendar
			</h1>
			<div className="flex flex-col flex-wrap">
				{events.map(
					({ attributes: { title, description, startDate, startTime } }, i) => (
						<div className="rounded-lg bg-black bg-opacity-25 backdrop-blur-md p-3 text-sm w-full break-words" key={i}>
							<div className="flex gap-2">
								<p className="text-center font-semibold text-red-600 text-lg">
									{new Date(startDate).toLocaleString("default", {
										timeZone: "UTC",
										month: "numeric",
										day: "numeric",
									})}
								</p>

								<div>
									<p className="font-semibold text-lg">{title}</p>
								</div>
							</div>
							<p className="text-sm mb-2">
								{startTime && parseTime(startTime)}
							</p>
							<Markdown>{description}</Markdown>
						</div>
					)
				)}
			</div>
		</div>
	);
}
