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
			<div className="flex flex-col flex-wrap gap-2">
				{events.map(
					({ attributes: { title, description, startDate, startTime } }, i) => (
						<div
							className="rounded-lg p-2 bg-neutral-300 text-sm w-full break-words"
							key={i}
						>
							<div className="flex items-center gap-3 mb-2">
								<div className="bg-black rounded-lg p-2 flex-none w-16 h-16">
									<p className="text-center font-semibold text-white text-base">
										{new Date(startDate).toLocaleString("default", {
											timeZone: "UTC",
											month: "short",
											day: "numeric",
										})}
									</p>
								</div>
								<div>
									<p className="font-semibold text-lg">{title}</p>
									<p className="text-sm">{startTime && parseTime(startTime)}</p>
								</div>
							</div>
							<Markdown>{description}</Markdown>
						</div>
					)
				)}
				<div className="mt-2 flex justify-center">
					<Link href="/events">
						<div className="px-4 py-2 bg-black rounded-xl text-white font-extrabold w-max">
							View Full Calendar
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
