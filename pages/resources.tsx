import React from "react";
import Link from "next/link";
import { Resource } from "../lib/types";
import { GetStaticPropsContext } from "next";

export async function getStaticProps({ locale }: GetStaticPropsContext) {
	let student = await fetch(process.env.I18N ? `https://strapi.mbhs.edu/api/resources?filters[student]=[$true]&sort=rank:ASC&sort=name:ASC&locale=${locale}` :
			`https://strapi.mbhs.edu/api/resources?filters[student]=[$true]&sort=rank:ASC&sort=name:ASC`
		).then((res) => res.json()
	);

	let staff = await fetch(process.env.I18N ? `https://strapi.mbhs.edu/api/resources?filters[staff]=[$true]&sort=rank:ASC&sort=name:ASC&locale=${locale}` :
			`https://strapi.mbhs.edu/api/resources?filters[staff]=[$true]&sort=rank:ASC&sort=name:ASC`
		).then((res) => res.json()
	);

	let parent = await fetch(process.env.I18N ? `https://strapi.mbhs.edu/api/resources?filters[parent]=[$true]&sort=rank:ASC&sort=name:ASC&locale=${locale}` :
			`https://strapi.mbhs.edu/api/resources?filters[parent]=[$true]&sort=rank:ASC&sort=name:ASC`
		).then((res) => res.json()
	);

	return {
		props: {
			students: student.data,
			staff: staff.data,
			parents: parent.data,
		},
		revalidate: 60,
	};
}

interface ResourcesProps {
	students: Resource[];
	staff: Resource[];
	parents: Resource[];
}

export default function Resources({
	students,
	staff,
	parents,
}: ResourcesProps) {
	return (
		<div className="pb-10 dark:text-white">
			<h1 className="text-2xl sm:text-2xl md:text-4xl text-center font-bold md:py-5 py-3">
				Resources
			</h1>
			<div className="w-full flex flex-col md:flex-row px-5 md:px-12 lg:px-24 space-y-4 lg:space-y-0 lg:space-x-4 justify-between text-md lg:text-lg">
				<div className="md:w-1/3 rounded-lg text-black dark:text-white text-center p-2">
					<h2 className="text-lg sm:text-xl md:text-3xl font-bold pb-4">
						Students
					</h2>
					<div className="flex flex-col justify-around gap-3 mb-2">
						{students.map(({ attributes: { name, link, description } }, i) => (
							<Link
								target={link.includes("http") ? "blank" : undefined}
								href={link}
								key={i}
							>
								<div className="bg-neutral-300 border hover:bg-neutral-400 border-neutral-300 dark:border-neutral-700 shadow-sm hover:shadow-md rounded-lg p-2 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
									<h2 className="text-red-700 dark:text-red-600 font-semibold">
										{name}
									</h2>
									<p className="text-sm sm:text-md md:text-base">
										{description}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div className="w-7/8 md:w-1/3 rounded-lg text-black dark:text-white text-center p-2">
					<h2 className="text-lg sm:text-xl md:text-3xl font-bold pb-4">
						Staff
					</h2>
					<div className="flex flex-col justify-around gap-3 mb-2">
						{staff.map(({ attributes: { name, link, description } }, i) => (
							<Link
								target={link.includes("http") ? "blank" : undefined}
								href={link}
								key={i}
							>
								<div className="bg-neutral-300 border hover:bg-neutral-400 border-neutral-300 dark:border-neutral-700 shadow-sm hover:shadow-md rounded-lg p-2 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
									<h2 className="text-red-700 dark:text-red-600 font-semibold">
										{name}
									</h2>
									<p className="text-sm sm:text-md md:text-base">
										{description}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div className="w-7/8 md:w-1/3 rounded-lg text-black dark:text-white text-center p-2">
					<h2 className="text-lg sm:text-xl md:text-3xl font-bold pb-4">
						Parents
					</h2>
					<div className="flex flex-col justify-around gap-3 mb-2">
						{parents.map(({ attributes: { name, link, description } }, i) => (
							<Link
								target={link.includes("http") ? "blank" : undefined}
								href={link}
								key={i}
							>
								<div className="bg-neutral-300 border hover:bg-neutral-400 border-neutral-300 dark:border-neutral-700 shadow-sm hover:shadow-md rounded-lg p-2 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300">
									<h2 className="text-red-700 dark:text-red-600 font-semibold">
										{name}
									</h2>
									<p className="text-sm sm:text-md md:text-base">
										{description}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
