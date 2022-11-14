import React, { useState } from "react";

const selected = (val: boolean) => {
	if (val) {
		return "inline-block p-4 text-red-600 rounded-t-lg border-b-2 border-red-600 active cursor-pointer";
	} else {
		return "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 cursor-pointer";
	}
};

export default function schedule() {
	const [tab, setTab] = useState<string>("today");

	return (
		<div className="px-5 md:px-48">
			<h1 className="text-xl md:text-4xl text-center font-bold py-5">
				Bus Schedule & Routes
			</h1>
			<p>
				Bus schedules are often updated slightly during the first weeks of
				school, and occasionally during the rest of the school year. Please
				check back for any updates. Futher information about buses is availabe
				in English and en español.
			</p>

			<h1 className="text-xl md:text-4xl text-center font-bold py-5">
				School Hours & Bell Schedule
			</h1>
			<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
				<ul className="flex flex-wrap -mb-px">
					<li className="mr-2">
						<a
							className={selected(tab === "today")}
							onClick={() => setTab("today")}
						>
							Today
						</a>
					</li>
					<li className="mr-2">
						<a
							className={selected(tab === "early")}
							onClick={() => setTab("early")}
						>
							Early (2.5 Hour) Dismissal
						</a>
					</li>
					<li className="mr-2">
						<a
							className={selected(tab === "late")}
							onClick={() => setTab("late")}
						>
							Late (2 Hour) Opening
						</a>
					</li>
					<li className="mr-2">
						<a
							className={selected(tab === "innovation")}
							onClick={() => setTab("innovation")}
						>
							Innovation Day
						</a>
					</li>
					<li className="mr-2">
						<a
							className={selected(tab === "all")}
							onClick={() => setTab("all")}
						>
							All Period Day
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
