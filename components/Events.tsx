	import React from "react";
import { Event } from "../lib/types";
import Markdown from "./Markdown";


interface EventsProps {
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
const seasonSwitch = (thedate: any) => {
	var year = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var nthedate = thedate.split(" ");
	var nnthedate = year.indexOf(nthedate[0]);
	if (nnthedate == 2 || nnthedate == 3 || nnthedate == 4) {
		return "bg-[url('https://images.pexels.com/photos/72473/pexels-photo-72473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover";
	}
	else if (nnthedate == 5 || nnthedate == 6 || nnthedate == 7) {
		return "bg-[url('https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover";
	}
	else if(nnthedate == 8 || nnthedate == 9 || nnthedate == 10){
		return "bg-[url('https://images.freeimages.com/images/large-previews/470/fall-in-iran-1640635.jpg')] bg-cover";
	}
	else if (nnthedate == 11 || nnthedate == 0 || nnthedate == 1) {
		return "bg-[url('https://images.pexels.com/photos/813871/pexels-photo-813871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover";
	}
	else {
		console.log(nthedate[0]);
		return "bg-black";
	}
}
const handleChange = (event: any) => {
	console.log("hi");
}

export default function Events({ events }: EventsProps) {
	React.useEffect(() => {
		console.log(events);
	}, []);	
//"alternate colors and put gradient" suggestion from student
	return (
		<div className=" bg-gradient-to-r from-black to-red-500 pt-10 px-20 w-full md:w-100% min-h-screen lg:px-10">
			<h1 className="text-4xl font-bold text-center pb-10 text-white drop-shadow-lg">Upcoming Events</h1>
			<input autoFocus onChange={handleChange} className="focus:ring focus:ring-red-500 px-5 flex bg-white rounded-full w-full relative mb-10 p-3 text-2xl outline-none" placeholder="Search Events..."></input>
			<div className="flex flex-col flex-wrap gap-6 pb-10">
				{events.map(({ attributes: { title, description, startDate, startTime } }, i) => (
					<div
						className={`rounded-lg p-5 ${colorSwitch(i)} text-sm drop-shadow-md `}
						key={i}
					>
						<div className="flex items-center gap-3 mb-2">
							<div className={`${seasonSwitch(parseDate(startDate))} rounded-lg p-2 flex-none w-16 h-16`}>
								<p className="text-center font-semibold text-white text-base">
									{parseDate(startDate)}
								</p>
							</div>
							<div>
								<p className="font-semibold text-lg">{title}</p>
								<p className="text-sm">{startTime && parseTime(startTime)}</p>
							</div>
						</div>
						<Markdown className="w-full md:w-1/2">{description}</Markdown>
					</div>
				))}
			</div>
		</div>
	);
}
