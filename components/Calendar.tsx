import React from "react";
import Link from "next/link";

export default function Calendar() {
	const date = new Date();

	return (
		<div className="border-4 bg-neutral-200 rounded-lg p-2 w-full md:w-80">
			<h1 className="text-xl font-bold text-center pb-3">Upcoming Events</h1>
			<div className="flex flex-col flex-wrap gap-2">
				<div className="rounded-lg p-2 bg-neutral-300">
					<div className="flex items-center gap-3 mb-2">
						<div className="bg-black rounded-lg p-2 flex-none w-16 h-16">
							<p className="text-center font-semibold text-white">Nov 11</p>
						</div>
						<div>
							<p className="font-semibold text-lg">Postseason Football</p>
							<p className="text-sm">6:30 PM</p>
						</div>
					</div>
					<p className="text-sm">home versus Einstein; tickets here</p>
				</div>
				<div className="rounded-lg p-2 bg-neutral-300">
					<div className="flex items-center gap-3 mb-2">
						<div className="bg-black rounded-lg p-2 flex-none w-16 h-16">
							<p className="text-center font-semibold text-white">Nov 11</p>
						</div>
						<div>
							<p className="font-semibold text-lg">Fall Play</p>
							<p className="text-sm">7:00 PM</p>
						</div>
					</div>
					<p className="text-sm">
						Hit and Myth: Tickets are $8 and are available here; please make
						sure you select the correct performance date/time when purchasing;
						Alumni Auditorium.
					</p>
				</div>
				<div className="mt-2">
					<Link href="/calender">
						<div className="px-4 py-2 bg-black rounded-xl text-white font-extrabold w-max m-auto">
							View Full Calendar
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
