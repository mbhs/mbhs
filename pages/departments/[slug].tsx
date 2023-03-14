import { GetStaticPropsContext } from "next";
import React from "react";
import { Department } from "../../lib/types";
import Markdown from "../../components/Markdown";
import { GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
	//gets all departments
	let departments = await fetch(
		`https://strapi.mbhs.edu/api/departments?sort=rank:ASC`
	).then((res) => res.json());

	return {
		paths: departments.data.map((d: Department) => ({
			params: { slug: d.attributes.slug },
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	//gets all departments
	let departments = await fetch(
		`https://strapi.mbhs.edu/api/departments?populate=*`
	).then((res) => res.json());

	let department = departments.data.find(
		(d: Department) => d.attributes.slug === params?.slug
	);

	return {
		props: {
			department: department,
		},
	};
}

interface DepartmentsProps {
	department: Department;
}

export default function department({ department }: DepartmentsProps) {
	return (
		<div className="px-5 md:px-12 lg:px-24 xl:px-48 2xl:px-72 relative">
			{department.attributes.image.data && (
				<>
					<img
						src={department.attributes.image.data?.attributes.url}
						className="absolute top-0 left-0 right-0 h-96 w-full object-cover -z-20"
					/>
					<div className="absolute top-0 left-0 right-0 h-96 w-full -z-20 bg-gradient-to-t backdrop-blur-sm from-white to-transparent" />
					<div className="absolute top-0 left-0 right-0 h-96 w-full -z-10 opacity-30 bg-white" />
				</>
			)}
			<h1 className="font-bold text-4xl text-center py-5">
				{department.attributes.name}
			</h1>
			<Markdown>{department.attributes.content}</Markdown>
		</div>
	);
}
