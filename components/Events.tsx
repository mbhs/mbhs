	import React from "react";
import { Event } from "../lib/types";
import Markdown from "./Markdown";


interface EventsProps {
	events: Event[];
}

const parseDate = (date: string): string => {
	let dateObj = new Date(date);
	return dateObj.toLocaleString("default", {
		timeZone: "UTC",
		month: "short",
		day: "numeric",
	});
};
const colorSwitch = (interation: any) => {
	if (parseInt(interation) % 2 == 0) {
		return "bg-neutral-300";
	}
	else {
		return "bg-white";
	}
}

export default function Events({ events }: EventsProps) {
	React.useEffect(() => {
		console.log(events);
	}, []);
//"alternate colors and put gradient" suggestion from student
	return (
		<div className=" bg-gradient-to-r from-black to-red-500 pt-10 px-20 w-full md:w-100% min-h-screen lg:px-10">
			<h1 className="text-4xl font-bold text-center pb-10 text-white drop-shadow-lg">Upcoming Events</h1>
			<div className="flex flex-col flex-wrap gap-6">
				{events.map(({ attributes: { title, description, startDate } }, i) => (
					<div
						className={`rounded-lg p-5 ${colorSwitch(i)} text-sm drop-shadow-md`}
						key={i}
					>
						<div className="flex items-center gap-3 mb-2">
							<div className="bg-black rounded-lg p-2 flex-none w-16 h-16">
								<p className="text-center font-semibold text-white text-base">
									{parseDate(startDate)}
								</p>
							</div>
							<div>
								<p className="font-semibold text-lg">{title}</p>
								<p className="text-sm">6:30 PM</p>
							</div>
						</div>
						<Markdown className="w-full md:w-1/2">{description}</Markdown>
					</div>
				))}
			</div>
		</div>
	);
}
