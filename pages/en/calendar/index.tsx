import React from "react";
import Link from "next/link";
import { Event } from "../../../lib/types";
import Markdown from "../../../components/Markdown";
import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { TbMapPin } from "react-icons/tb";
import { useRouter } from "next/router";

export async function getStaticProps() {
	//gets all events that are ending today or later and sorts them by date
	let today = new Date()
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	let events = await fetch(
		`https://strapi.mbhs.edu/api/events?filters[$or][0][endDate][$gte]=${today}&filters[$or][1][$and][0][endDate][$null]=true&filters[$or][1][$and][1][startDate][$gte]=${today}&pagination[pageSize]=1000&sort=startDate:ASC&sort=startTime:ASC`
	).then((res) => res.json());

	return {
		props: {
			events: events.data,
		},
		revalidate: 60,
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
const changeSeason = (theMonth: string) => {
	let theSeason = "bg-red-600";
	// const seasons = {
	// 	spring:["Mar","Apr","May"],
	// 	summer:["Jun","Jul","Aug"],
	// 	fall:["Sep","Oct","Nov"],
	// 	winter:["Dec","Jan","Feb"]
	// };
	// seasons.spring.includes(theMonth) ? theSeason = "bg-green-600" : theSeason;
	// seasons.summer.includes(theMonth) ? theSeason = "bg-yellow-600" : theSeason;
	// seasons.fall.includes(theMonth) ? theSeason = "bg-red-600" : theSeason;
	// seasons.winter.includes(theMonth) ? theSeason = "bg-blue-600" : theSeason;
	return theSeason;
};
export default function Calendar({ events }: CalendarProps) {
	const { pathname } = useRouter();
	return (
		<div className="rounded-lg md:px-40 pb-10 dark:text-white">
			<h1 className="text-2xl md:text-4xl font-bold text-center py-3 md:py-5">
				Calendar
			</h1>
			<p className="text-center">A schedule of <a className="text-red-500 hover:underline underline-offset-2" href={`${pathname}/evenodd`}>odd/even days</a> is available here.</p>
			<p className="text-center">A more detailed PDF of the school year schedule is <a className="text-red-500 hover:underline underline-offset-2" href="https://old.mbhs.edu/newsevents/Announcements/Calendar%202023-2024.pdf">available here</a>.</p>
			<br/>
			<div className="flex flex-col gap-3 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
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
						<div
							key={i}
							className="bg-neutral-400 border border-neutral-300 dark:border-neutral-700 shadow-sm hover:shadow-md flex gap-3 bg-opacity-10 hover:bg-opacity-20 w-full text-black backdrop-blur-lg rounded-lg transition-all duration-300 p-3"
						>
							<div
								className={`flex justify-center items-center text-center font-semibold ${changeSeason(
									new Date(startDate).toLocaleString("default", {
										timeZone: "UTC",
										month: "short",
									})
								)} text-white p-2 h-16 ${
									endDate ? "w-32" : "w-16"
								} rounded-full`}
							>
								<div className="flex flex-col">
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
							<div className="flex-1 dark:text-white">
								{title && <p className="font-bold text-xl">{title}</p>}
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
									{/*endDate && (
										<>
											<AiOutlineCalendar /> Ends{" "}
											{new Date(endDate).toLocaleString("default", {
												timeZone: "UTC",
												month: "short",
												day: "numeric",
											})}
										</>
									)*/}
								</p>
								{description && <Markdown>{description}</Markdown>}
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
