import React, { useState } from "react";
import { Schedule as ScheduleType, BusRoute } from "../../lib/types";

export async function getStaticProps() {
	//gets all events that are ending today or later and sorts them by date
	let today = new Date()
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	let events = await fetch(
		`https://strapi.mbhs.edu/api/schedules?sort=rank:ASC&locale=es`
	).then((res) => res.json());

	let routes = await fetch(
		`https://strapi.mbhs.edu/api/bus-route?populate=*&locale=es`
	).then((res) => res.json());

	return {
		props: {
			schedules: events.data,
			routes: routes.data,
		},
		revalidate: 60,
	};
}

const selected = (val: boolean) => {
	if (val) {
		return "inline-block p-4 text-red-600 rounded-t-lg border-b-2 border-red-600 active cursor-pointer";
	} else {
		return "inline-block p-4 rounded-t-lg border-b-2 border-transparent dark:hover:text-neutral-300 hover:text-neutral-600 hover:border-neutral-300 dark:hover:border-neutral-600 cursor-pointer";
	}
};

export default function Schedule({
	schedules,
	routes,
}: {
	schedules: ScheduleType[];
	routes: BusRoute;
}) {
	const [tab, setTab] = useState<string>(schedules[0].attributes.name);

	React.useEffect(() => {
		console.log(routes);
	}, [routes]);

	return (
		<div className="px-5 sm:px-12 md:px-24 lg:px-36 xl:px-48 dark:text-white">
			<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5">
				Horarios de autobuses y Rutas + Dejar Información
			</h1>
			
			<p>
			
				Los horarios de los autobuses a menudo se actualizan ligeramente durante las primeras semanas de
clases y, ocasionalmente, durante el resto del año escolar.
Vuelva a consultar las actualizaciones. Más información sobre los autobuses está disponible en
inglés y en español.


			</p>
			<div className="flex flex-wrap gap-5 justify-between items-center py-5">
				<div className="flex flex-col gap-3">
					{routes.attributes.routes.data.map(
						({ attributes: { url, name } }, i) => (
							<a
								href={url}
								target="blank"
								key={i}
								className="font-extrabold bg-black transition-colors hover:bg-red-600 dark:hover:bg-red-600 dark:bg-neutral-200 dark:text-black text-white px-4 py-2 rounded-xl w-full md:w-max text-sm md:text-base"
							>
								{name}
							</a>
						)
					)}
				</div>
				<img
					className="w-full cursor-pointer md:w-96 rounded-lg"
					src={routes.attributes.image.data.attributes.url}
					alt="drop off diagram"
					onClick={() =>
						window.open(routes.attributes.image.data?.attributes.url)
					}
				/>
			</div>

			<h1 className="text-xl md:text-4xl text-center font-bold py-5">
				Horario escolar y Horario de campana
			</h1>
			<div className="text-sm font-medium text-center text-neutral-500 dark:text-white border-b dark:border-neutral-700 border-neutral-200">
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

			<div className="overflow-x-auto relative shadow-md rounded-lg my-5 bg-neutral-200 dark:bg-neutral-800">
				<table className="w-full text-sm text-left text-neutral-500">
					<thead className="text-xs text-neutral-700 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-800">
						<tr>
							<th scope="col" className="py-3 px-6">
								Hora 
							</th>
							<th scope="col" className="py-3 px-6">
								Hora de inicio 
							</th>
							<th scope="col" className="py-3 px-6">
								Hora de finalización
							</th>
						</tr>
					</thead>
					<tbody>
						{schedules
							.find((x) => x.attributes.name == tab)
							?.attributes.periods.map(({ name, startTime, endTime }, i) => (
								<tr
									className="bg-white text-neutral-800 dark:text-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 border-y dark:border-neutral-700 hover:bg-neutral-50"
									key={i}
								>
									<th
										scope="row"
										className="py-4 px-6 font-medium text-neutral-900 dark:text-neutral-200 whitespace-nowrap"
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
