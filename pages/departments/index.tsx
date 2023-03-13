import React from "react";
import { Department } from "../../lib/types";
import Markdown from "../../components/Markdown";
import Link from "next/link";

export async function getStaticProps() {
	//gets all departments
	let departments = await fetch(
		`https://strapi.mbhs.edu/api/departments?sort=rank:ASC&populate=*`
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
				{departments.map((d, i) => (
					<Link href={`/departments/${d.attributes.slug}`} key={i}>
						<div className="hover:shadow-md transition-all duration-300 hover:scale-[1.001] relative bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-5 text-center object-cover before:opacity-20">
							{d.attributes.image.data && (
								<>
									<img
										src={d.attributes.image.data?.attributes.url}
										className="absolute inset-0 w-full h-full object-cover opacity-100 -z-20 rounded-lg"
									/>
								</>
							)}
							<div className="absolute inset-0 backdrop-blur-sm bg-white bg-opacity-30 rounded-lg -z-10" />
							<h1 className="text-black font-bold text-xl">
								{d.attributes.name}
							</h1>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
