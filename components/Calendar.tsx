import React from "react";
import Link from "next/link";
import { Event } from "../lib/types";
import Markdown from "./Markdown";

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
	React.useEffect(() => {
		console.log(events);
	}, []);

	return (
		<div className="border-4 bg-neutral-200 rounded-lg p-2 w-full md:w-80">
			<h1 className="text-xl font-bold text-center pb-3">Upcoming Events</h1>
			<div className="flex flex-col flex-wrap">
				{events.map(
					({ attributes: { title, description, startDate, startTime } }, i) => (
						<div className="rounded-lg p-2 text-sm w-full break-words" key={i}>
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
							<p className="text-sm mb-2">{startTime && parseTime(startTime)}</p>
							<Markdown>{description}</Markdown>
							<hr className="h-px my-2 bg-black border-0" />
						</div>
					)
				)}
				<div className=" flex justify-center">
					<Link href="/events">
						<div className="px-4 py-2 bg-black rounded-xl text-white font-extrabold w-max duration-200 hover:bg-red-600 hover:shadow-md">
							View Full Calendar
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
