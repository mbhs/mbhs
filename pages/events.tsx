import React from "react";
import Eventss from "../components/Events";
import { Event } from "../lib/types";
import ReactMarkdown from "react-markdown";


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
			events: events.data
		},
	};
}

interface EventsProps {
	events: Event[];
}

export default function Events({ events }: EventsProps) {
	return (
		<div className="px-5 md:px-10 min-h-screen">
					<Eventss events={events} />
		</div>
	);
}
