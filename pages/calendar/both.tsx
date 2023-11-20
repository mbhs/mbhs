import React from "react";
import Link from "next/link";
import { Event } from "../../lib/types";
import Markdown from "../../components/Markdown";
import { AiOutlineClockCircle, AiOutlineCalendar } from "react-icons/ai";
import { Calendar as reactCalendar } from 'react-calendar';
import { makeDates, dayType, returnCalendar, getEvenOdd } from "./evenodd";

export async function getStaticProps() {
	//gets all events that are ending today or later and sorts them by date
	let today = new Date()
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	let events = await fetch(
		`https://strapi.mbhs.edu/api/events?filters[$or][0][endDate][$gte]=${today}&filters[$or][1][$and][0][endDate][$null]=true&filters[$or][1][$and][1][startDate][$gte]=${today}&sort=startDate:ASC&sort=startTime:ASC`
	).then((res) => res.json());

    let scheduleDays = await fetch(
        "https://strapi.mbhs.edu/api/evenodd?populate=*"
    ).then((res) => res.json());

    const stored: { [key: string]: number } = makeDates(scheduleDays!.data)

	return {
		props: {
			events: events.data,
            dates: stored,
		},
		revalidate: 60,
	};
}

interface CalendarProps {
	events: Event[];
    dates: {
        [key: string]: number;
    }
}

interface DayProps {
    date: Date;
    view: string;
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
	return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
	} ${ampm}`;
};

export default function Calendar({ events, dates }: CalendarProps) {

    function eo({ date, view }: DayProps) {
        if (view === "month") {
            if (date.getDay() === 0 || date.getDay() === 6) return null

            if (dates[date.toDateString()] == dayType["even"]) return <p>EVEN</p>
            else if (dates[date.toDateString()] == dayType["odd"]) return <p>ODD</p>
            else if (dates[date.toDateString()] == dayType["no-school"]) return <p>NO SCHOOL</p>
            else if (dates[date.toDateString()] == dayType["all-period"]) return <p>ALL PERIOD</p>
            else if (dates[date.toDateString()] == dayType["special-schedule"]) return <p>OTHER</p>
            else return <p></p>
        }
        return null
    }

	return (
		<div className="rounded-lg md:px-40 pb-10 dark:text-white">
			<h1 className="text-2xl md:text-4xl font-bold text-center py-3 md:py-5">
				Calendar
			</h1>
			<p className="text-center">A PDF of schedule for the school year <a className="text-red-500 hover:underline underline-offset-2" href="https://old.mbhs.edu/newsevents/Announcements/Calendar%202023-2024.pdf">is available here</a></p>
			<br/>
            {/*<div className="w-full ml-8 md:ml-0 pt-2 pb-4 text-black dark:text-white font-extrabold">
                <p className="text-center">{getEvenOdd(dates)}</p>
            </div> */}
            <div className="flex flex-col">
                {returnCalendar(eo)}
            </div>
			<div className="flex flex-col gap-3 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
				{events.map(
					(
						{
							attributes: { title, description, startDate, endDate, startTime },
						},
						i
					) => (
						<div
							key={i}
							className="bg-neutral-400 border border-neutral-300 dark:border-neutral-700 shadow-sm hover:shadow-md flex gap-3 bg-opacity-10 hover:bg-opacity-20 w-full text-black backdrop-blur-lg rounded-lg transition-all duration-300 p-3"
						>
							<div className={`flex justify-center items-center text-center font-semibold bg-red-600 text-white p-2 h-16 ${endDate ? "w-32" : "w-16"} rounded-full`}>
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
								{endDate && <>
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
								</>}
							</div>
							<div className="flex-1 dark:text-white">
								{title && <p className="font-bold text-xl">{title}</p>}
								<p className="flex gap-1 items-center">
									{startTime && (
										<>
											<AiOutlineClockCircle /> {parseTime(startTime)}
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
