import React from "react";
import { Admin as AdminType } from "../../lib/types";

export async function getStaticProps() {
	//get the admin department
	let admin: { data: AdminType } = await fetch(
		`https://strapi.mbhs.edu/api/admin?populate[0]=admin.image&populate[1]=resources.image&populate[2]=other.image`
	).then((res) => res.json());

	// sort the staff alphabetically
	admin.data.attributes.admin.data.sort((a, b) => {
		if (a.attributes.name < b.attributes.name) {
			return -1;
		} else if (a.attributes.name > b.attributes.name) {
			return 1;
		} else {
			return 0;
		}
	});

	// sort the resource teachers alphabetically
	admin.data.attributes.resources.data.sort((a, b) => {
		if (a.attributes.name < b.attributes.name) {
			return -1;
		} else if (a.attributes.name > b.attributes.name) {
			return 1;
		} else {
			return 0;
		}
	});

	// sort the staff by rank
	admin.data.attributes.admin.data.sort((a, b) => {
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
			admin: admin.data,
		},
		revalidate: 60,
	};
}

interface AdminProps {
	admin: AdminType;
}

export default function Admin({ admin }: AdminProps) {
	return (
		<div className="pb-10 px-5 md:px-12 lg:px-24">
			<h1 className="text-2xl md:text-4xl font-bold text-center py-3 md:py-5 md:pb-3 dark:text-white">
				Administration
			</h1>
			<div className="flex gap-5 flex-wrap justify-center">
				{admin.attributes.admin.data.map((s, i) => (
					<div
						key={i}
						className="dark:text-white border border-neutral-300 rounded-lg p-3 bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-700 flex flex-col items-center w-72 mt-20 text-center"
					>
						<img
							src={
								s.attributes.image.data
									? s.attributes.image.data.attributes.url
									: "/assets/soon.jpg"
							}
							className="h-36 w-36 -mt-[84px] object-cover rounded-full inline-block mr-2 shadow-lg hover:scale-105 transition-all duration-300 origin-bottom"
						/>

						<h1 className="pt-5 font-bold text-lg">{s.attributes.name}</h1>
						<p>{s.attributes.title}</p>
						{s.attributes.phone && (
							<a
								className=" hover:underline underline-offset-2"
								href={`tel:${s.attributes.phone}`}
							>
								<p>{s.attributes.phone}</p>
							</a>
						)}
						<a
							className="text-red-500 hover:underline underline-offset-2 w-full"
							href={`mailto:${s.attributes.email}`}
						>
							<p className="break-words">{s.attributes.email}</p>
						</a>
					</div>
				))}
			</div>
			<h2 className="text-bold text-2xl dark:text-white font-bold pt-5 text-center">
				Resource Teachers and other School Leaders
			</h2>
			<div className="flex gap-5 flex-wrap justify-center">
				{admin.attributes.resources.data.map((s, i) => (
					<div
						key={i}
						className="dark:text-white border border-neutral-300 rounded-lg p-3 bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-700 flex flex-col items-center w-72 mt-20 text-center"
					>
						<img
							src={
								s.attributes.image.data
									? s.attributes.image.data.attributes.url
									: "/assets/soon.jpg"
							}
							className="h-36 w-36 -mt-[84px] object-cover rounded-full inline-block mr-2 shadow-lg hover:scale-105 transition-all duration-300 origin-bottom"
						/>
						<h1 className="pt-5 font-bold text-lg">{s.attributes.name}</h1>
						<p>{s.attributes.title}</p>
						{s.attributes.phone && (
							<a
								className=" hover:underline underline-offset-2"
								href={`tel:${s.attributes.phone}`}
							>
								<p>{s.attributes.phone}</p>
							</a>
						)}
						<a
							className="text-red-500 hover:underline underline-offset-2 w-full"
							href={`mailto:${s.attributes.email}`}
						>
							<p className="break-words">{s.attributes.email}</p>
						</a>
					</div>
				))}
			</div>
			{/* <h2 className="text-bold text-2xl dark:text-white font-bold pt-5 text-center">
				Other School Leaders
			</h2>
			<div className="flex gap-5 flex-wrap justify-center">
				{admin.attributes.other.data.map((s, i) => (
					<div
						key={i}
						className="dark:text-white border border-neutral-300 rounded-lg p-3 bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-700 flex flex-col items-center w-72 mt-20 text-center"
					>
						<img
							src={
								s.attributes.image.data
									? s.attributes.image.data.attributes.url
									: "/assets/soon.jpg"
							}
							className="h-36 w-36 -mt-[84px] object-cover rounded-full inline-block mr-2 shadow-lg hover:scale-105 transition-all duration-300 origin-bottom"
						/>
						<h1 className="pt-5 font-bold text-lg">{s.attributes.name}</h1>
						<p>{s.attributes.title}</p>
						{s.attributes.phone && (
							<a
								className=" hover:underline underline-offset-2"
								href={`tel:${s.attributes.phone}`}
							>
								<p>{s.attributes.phone}</p>
							</a>
						)}
						<a
							className="text-red-500 hover:underline underline-offset-2 w-full"
							href={`mailto:${s.attributes.email}`}
						>
							<p className="break-words">{s.attributes.email}</p>
						</a>
					</div>
				))}
			</div> */}
		</div>
	);
}
