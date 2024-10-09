import React from "react";
import { Department } from "../../lib/types";
import Markdown from "../../components/Markdown";
import Link from "next/link";

export async function getStaticProps() {
	//gets all departments
	let departments = await fetch(
		`https://strapi.mbhs.edu/api/departments?sort=rank:ASC&sort=name:ASC&populate=*&filters[page][$eq]=true&fields[0]=name&fields[1]=slug&fields[2]=overrideLink`
	).then((res) => res.json());

	return {
		props: {
			departments: departments.data,
		},
		revalidate: 60,
	};
}

interface DepartmentsProps {
	departments: Department[];
}

export default function Index({ departments }: DepartmentsProps) {
	return (
		<div className="pb-10 px-5 md:px-12 lg:px-24">
			<h1 className="text-2xl md:text-4xl font-bold text-center py-3 md:py-5 md:pb-3 dark:text-white">
				Departments
			</h1>
			<p className="dark:text-white text-black text-center font-semibold pb-5">
				View the{" "}
				<a
					className="text-red-500 hover:underline underline-offset-2"
					href="https://sites.google.com/a/mcpsmd.net/mbhs-academies"
				>
					Academies
				</a>{" "}
			</p>
			<div className="flex-col flex md:flex-row flex-wrap justify-center gap-5">
				{departments.map((d, i) => (
					<Link
						href={
							d.attributes.overrideLink
								? d.attributes.overrideLink
								: `/departments/${d.attributes.slug}`
						}
						key={i}
					>
						<div className="h-36 w-full md:w-96 light:hover:shadow-md transition-all duration-300 hover:scale-[1.001] relative bg-white border border-neutral-300 dark:border-neutral-700 bg-opacity-10 backdrop-blur-lg rounded-lg p-5 text-center object-cover before:opacity-20">
							{d.attributes.image.data && (
								<>
									<img
										src={d.attributes.image.data?.attributes.url}
										className="absolute inset-0 w-full h-full object-cover opacity-100 -z-20 rounded-lg"
									/>
								</>
							)}
							<div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-50 rounded-lg -z-10" />
							<h1 className="text-black dark:text-white font-bold text-2xl flex items-center justify-center h-full w-full">
								<p>{d.attributes.name}</p>
							</h1>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
