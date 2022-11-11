import React from "react";

export default function Calendar() {
	const date = new Date();

	return (
		<div className="border-4 border-red-500 rounded-lg p-2 w-96">
			<h1 className="text-xl font-bold text-center pb-3">Calendar</h1>
			<p>{date.toDateString()}</p>
			<div className="flex flex-col flex-wrap gap-2">
				<div className="rounded-lg p-2 border-2 border-neutral-800 flex gap-2 items-center">
					<div className="bg-neutral-400 rounded-lg p-2">
						<p className="text-center font-semibold">Nov 11</p>
					</div>
					<div>
						<p className="font-semibold">6:30 PM</p>
						<p>Postseason Football: home versus einstein</p>
					</div>
				</div>
				<div className="rounded-lg p-2 border-2 border-neutral-800 flex gap-2 items-center">
					<div className="bg-neutral-400 rounded-lg p-2">
						<p className="text-center font-semibold">Nov 11</p>
					</div>
					<div>
						<p className="font-semibold">6:30 PM</p>
						<p>Postseason Football: home versus einstein</p>
					</div>
				</div>
				<div className="rounded-lg p-2 border-2 border-neutral-800 flex gap-2 items-center">
					<div className="bg-neutral-400 rounded-lg p-2">
						<p className="text-center font-semibold">Nov 11</p>
					</div>
					<div>
						<p className="font-semibold">6:30 PM</p>
						<p>Postseason Football: home versus einstein</p>
					</div>
				</div>
			</div>
		</div>
	);
}
