import React from "react";
import { Department } from "../../lib/types";
import Markdown from "../../components/Markdown";
import Link from "next/link";

export async function getStaticProps() {
	//gets all departments
	let departments = await fetch(
		`https://strapi.mbhs.edu/api/departments?sort=rank:ASC`
	).then((res) => res.json());
	return {
		props: {
			departments: departments.data,
		},
	};
}

interface DepartmentsProps {
	departments: Department[];
}

export default function index({ departments }: DepartmentsProps) {
	return (
		<div className="px-5 md:px-12 lg:px-24 xl:px-48 2xl:px-72">
			<h1 className="text-4xl font-bold text-center py-5">Departments</h1>
			<div className="flex flex-col gap-5">
				{departments.map((d) => (
					<Link href={`/departments/${d.attributes.slug}`}>
						<div className="bg-black bg-opacity-20 backdrop-blur-lg rounded-lg p-5 text-center">
							<h1 className="text-black">{d.attributes.name}</h1>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
