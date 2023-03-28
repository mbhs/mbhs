import React from "react";
import Link from "next/link";
import { Resource } from "../lib/types";

export async function getStaticProps() {
	let student = await fetch(
		"https://strapi.mbhs.edu/api/student-resources"
	).then((res) => res.json());

	let staff = await fetch(
		"https://strapi.mbhs.edu/api/staff-resources"
	).then((res) => res.json());

	let parent = await fetch(
		"https://strapi.mbhs.edu/api/parent-resources"
	).then((res) => res.json());

	return {
		props: {
			students: student.data,
			staff: staff.data,
			parents: parent.data,
		},
	};
}

interface ResourcesProps {
	students: Resource[];
	staff: Resource[];
	parents: Resource[];
}

export default function Resources({ students, staff, parents }: ResourcesProps) {
	return (
		<div className="pb-10">
			<h1 className="text-xl sm:text-2xl md:text-4xl text-center font-bold pt-5 pb-3">
				Resources
			</h1>
			<div className="w-full flex flex-col md:flex-row px-12 space-y-4 md:space-y-0 md:space-x-4 justify-between text-md sm:text-lg md:text-xl">
				<div className="w-7/8 md:w-1/3 bg-black bg-opacity-10 rounded-lg text-black text-center p-2">
					<h2 className="text-lg sm:text-xl md:text-3xl font-bold md:pb-4">Students</h2>
					<div className="flex flex-row flex-wrap md:flex-col justify-around gap-1 gap-x-1 md:gap-0 md:space-x-0 md:space-y-3 mb-2">
						{students.map(({ attributes: { name, link, description } }, i) => (
							<div key={i}>
								<Link href={link} className="text-red-700 hover:text-red-800 font-semibold hover:underline">{name}</Link>
								<p className="text-sm sm:text-md md:text-base">{description}</p>
							</div>
						))}
					</div>
				</div>
				<div className="w-7/8 md:w-1/3 bg-black bg-opacity-10 rounded-lg text-black text-center p-2">
					<h2 className="text-lg sm:text-xl md:text-3xl font-bold md:pb-4">Staff</h2>
					<div className="flex flex-row flex-wrap md:flex-col justify-around gap-1 md:gap-0 md:space-x-0 md:space-y-3 mb-2">
						{staff.map(({ attributes: { name, link, description } }, i) => (
							<div key={i}>
								<Link href={link} className="text-red-700 hover:text-red-800 font-semibold hover:underline">{name}</Link>
								<p className="text-sm sm:text-md md:text-base">{description}</p>
							</div>
						))}
					</div>
				</div>
				<div className="w-7/8 md:w-1/3 bg-black bg-opacity-10 rounded-lg text-black text-center p-2">
					<h2 className="text-lg sm:text-xl md:text-3xl font-bold md:pb-4">Parents</h2>
					<div className="flex flex-row flex-wrap md:flex-col justify-around gap-1 md:gap-0 md:space-x-0 md:space-y-3 mb-2">
						{parents.map(({ attributes: { name, link, description } }, i) => (
							<div key={i}>
								<Link href={link} className="text-red-700 hover:text-red-800 font-semibold hover:underline">{name}</Link>
								<p className="text-sm sm:text-md md:text-base">{description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
