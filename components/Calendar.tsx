import React from "react";
import Link from "next/link";

export default function Calendar() {
	const date = new Date();

	return (
		<div className="border-4 bg-neutral-200 rounded-lg p-2 w-full md:w-80">
			<h1 className="text-xl font-bold text-center pb-3">Calendar</h1>
			<p>{date.toDateString()}</p>
			<div className="flex flex-col flex-wrap gap-2">
				<div className="rounded-lg p-2 border-2 border-neutral-800 flex gap-2 items-center">
					<div className="bg-neutral-400 rounded-lg p-2 w-16 h-16">
						<p className="text-center font-semibold">Nov 11</p>
					</div>
					<div>
						<p className="font-semibold">6:30 PM</p>
						<p className="text-sm">Postseason Football: home versus einstein</p>
					</div>
				</div>
				<div className="rounded-lg p-2 border-2 border-neutral-800 flex gap-2 items-center">
					<div className="bg-neutral-400 rounded-lg p-2">
						<p className="text-center font-semibold">Nov 11</p>
					</div>
					<div>
						<p className="font-semibold">6:30 PM</p>
						<p className="text-sm">Postseason Football: home versus einstein</p>
					</div>
				</div>
				<div className="rounded-lg p-2 border-2 border-neutral-800 flex gap-2 items-center">
					<div className="bg-neutral-400 rounded-lg p-2">
						<p className="text-center font-semibold">Nov 11</p>
					</div>
					<div>
						<p className="font-semibold">6:30 PM</p>
						<p className="text-sm">Postseason Football: home versus einstein</p>
					</div>
				</div>
				<div>
					<Link href="/calender">
						<div className="px-4 py-2 bg-black rounded-xl text-white font-extrabold w-max m-auto">
							View All Events
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
