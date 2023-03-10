import React, { useState } from "react";
import { Schedule, BusRoute } from "../lib/types";

export async function getStaticProps() {
	//gets all events that are ending today or later and sorts them by date
	let today = new Date()
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	let events = await fetch(
		`https://strapi.mbhs.edu/api/schedules?sort=rank:ASC`
	).then((res) => res.json());

	let routes = await fetch(
		`https://strapi.mbhs.edu/api/bus-route?populate=*`
	).then((res) => res.json());

	return {
		props: {
			schedules: events.data,
			routes: routes.data,
		},
	};
}

const selected = (val: boolean) => {
	if (val) {
		return "inline-block p-4 text-red-600 rounded-t-lg border-b-2 border-red-600 active cursor-pointer";
	} else {
		return "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer";
	}
};

export default function schedule({
	schedules,
	routes,
}: {
	schedules: Schedule[];
	routes: BusRoute;
}) {
	const [tab, setTab] = useState<string>(schedules[0].attributes.name);

	React.useEffect(() => {
		console.log(routes);
	}, [routes]);

	return (
		<div className="px-5 sm:px-12 md:px-24 lg:px-36 xl:px-48">
			<h1 className="text-xl md:text-4xl text-center font-bold py-5">
				Bus Schedule & Routes + Drop Off Info
			</h1>
			<p>
				Bus schedules are often updated slightly during the first weeks of
				school, and occasionally during the rest of the school year. Please
				check back for any updates. Futher information about buses is availabe
				in English and en español.
			</p>
			<div className="flex flex-wrap justify-between items-center py-5">
				<div className="flex flex-col gap-3">
					{routes.attributes.routes.data.map(
						({ attributes: { url, name } }, i) => (
							<a
								href={url}
								target="blank"
								key={i}
								className="font-extrabold bg-black text-white px-4 py-2 rounded-xl w-full md:w-max text-xs md:text-base"
							>
								{name}
							</a>
						)
					)}
				</div>
				<img
					className="w-full cursor-pointer md:w-96"
					src={routes.attributes.image.data.attributes.url}
					alt="drop off diagram"
					onClick={() =>
						window.open(routes.attributes.image.data.attributes.url)
					}
				/>
			</div>

			<h1 className="text-xl md:text-4xl text-center font-bold py-5">
				School Hours & Bell Schedule
			</h1>
			<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
				<ul className="flex flex-wrap -mb-px">
					{schedules.map(({ attributes: { name } }, i) => (
						<li className="mr-2" key={i}>
							<a
								className={selected(tab === name)}
								onClick={() => setTab(name)}
							>
								{name}
							</a>
						</li>
					))}
				</ul>
			</div>

			<div className="overflow-x-auto relative shadow-md rounded-lg my-5 bg-gray-200">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 bg-gray-50">
						<tr>
							<th scope="col" className="py-3 px-6">
								Period
							</th>
							<th scope="col" className="py-3 px-6">
								Start Time
							</th>
							<th scope="col" className="py-3 px-6">
								End Time
							</th>
						</tr>
					</thead>
					<tbody>
						{schedules
							.find((x) => x.attributes.name == tab)
							?.attributes.periods.map(({ name, startTime, endTime }, i) => (
								<tr className="bg-white border-y hover:bg-gray-50" key={i}>
									<th
										scope="row"
										className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
									>
										{name}
									</th>
									<td className="py-4 px-6">{startTime}</td>
									<td className="py-4 px-6">{endTime}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
