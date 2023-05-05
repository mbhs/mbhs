import { GetStaticPropsContext } from "next";
import React from "react";
import { Department, Staff } from "../../lib/types";
import Markdown from "../../components/Markdown";
import { GetStaticPaths } from "next";
import Link from "next/link";

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
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
	//gets all departments
	let departments = await fetch(
		`https://strapi.mbhs.edu/api/departments?populate[0]=image&[populate][1]=resource.image&populate[2]=staff.image`
	).then((res) => res.json());

	let department = departments.data.find(
		(d: Department) => d.attributes.slug === params?.slug
	);

	// sort the staff alphabetically
	department.attributes.staff.data.sort((a: Staff, b: Staff) => {
		if (a.attributes.name < b.attributes.name) {
			return -1;
		} else if (a.attributes.name > b.attributes.name) {
			return 1;
		} else {
			return 0;
		}
	});

	// sort the staff by rank
	department.attributes.staff.data.sort((a: Staff, b: Staff) => {
		if (a.attributes.rank != null && b.attributes.rank == null) {
			return -1;
		} else if (a.attributes.rank == null && b.attributes.rank != null) {
			return 1;
		}
		if (a.attributes.rank < b.attributes.rank) {
			return -1;
		} else if (a.attributes.rank > b.attributes.rank) {
			return 1;
		} else {
			return 0;
		}
	});

	return {
		props: {
			department: department,
		},
		revalidate: 60,
	};
}

interface DepartmentsProps {
	department: Department;
}

export default function department({ department }: DepartmentsProps) {
	return (
		<div className="px-5 pb-10 md:px-12 lg:px-24 xl:px-48 2xl:px-72 relative dark:text-white">
			{department.attributes.image.data && (
				<>
					<img
						src={department.attributes.image.data?.attributes.url}
						className="absolute top-0 left-0 right-0 h-96 w-full object-cover -z-20"
					/>
					<div className="absolute top-0 left-0 right-0 h-96 w-full -z-20 bg-gradient-to-t dark:bg-gradient-to-t backdrop-blur-sm from-white dark:from-[#0a0a0a] to-transparent" />
					<div className="absolute top-0 left-0 right-0 h-96 w-full -z-10 opacity-50 bg-white dark:bg-[#0a0a0a]" />
				</>
			)}
			<h1 className="font-bold text-xl md:text-4xl text-center py-5 dark:text-white">
				{department.attributes.name}
			</h1>
			<h2 className="font-bold text-2xl">Staff</h2>
			{department.attributes.resource.data && (
				<p className="flex flex-col md:flex-row gap-2 md:items-center break-words">
					Resource Teacher:{" "}
					{department.attributes.resource.data.attributes.image.data && (
						<img
							src={
								department.attributes.resource.data.attributes.image.data
									.attributes.url
							}
							className="h-6 w-6 rounded-full inline-block"
						/>
					)}
					<span>
						{department.attributes.resource.data.attributes.name} (
						<Link
							className="text-red-500 hover:underline"
							href={`mailto:${department.attributes.resource.data.attributes.email}`}
						>
							{department.attributes.resource.data.attributes.email}
						</Link>
						)
					</span>
				</p>
			)}
			{department.attributes.phone && (
				<p>Phone: {department.attributes.phone}</p>
			)}
			<ul className="list-disc list-inside py-5">
				{department.attributes.staff.data.map((s) => (
					<li className="">
						{s.attributes.image.data && (
							<img
								src={s.attributes.image.data.attributes.url}
								className="h-6 w-6 object-cover rounded-full inline-block mr-2"
							/>
						)}
						<span>
							{s.attributes.name} (
							<Link
								className="text-red-500 hover:underline"
								href={`mailto:${s.attributes.email}`}
							>
								{s.attributes.email}
							</Link>
							)
						</span>
					</li>
				))}
			</ul>
			<div className="break-words">
				<Markdown>{department.attributes.content}</Markdown>
			</div>
		</div>
	);
}
