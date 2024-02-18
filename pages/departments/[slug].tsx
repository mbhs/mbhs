import { GetStaticPropsContext } from "next";
import React from "react";
import { Department, Staff } from "../../lib/types";
import Markdown from "../../components/Markdown";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export const getStaticPaths: GetStaticPaths = async () => {
	//gets all departments
	let departmentsEN = await fetch(
		`https://strapi.mbhs.edu/api/departments?sort=rank:ASC&locale=en`
	).then((res) => res.json());

	// remove the Adminstration department
	departmentsEN.data = departmentsEN.data.filter(
		(d: Department) => d.attributes.name !== "Administration"
	);

	let paths = departmentsEN.data.map((d: Department) => ({
		params: { slug: d.attributes.slug },
		//locale: "en",
	}))

	if (process.env.NO_I18N) {
		let departmentsES = await fetch(
			`https://strapi.mbhs.edu/api/departments?sort=rank:ASC&locale=es`
		).then((res) => res.json());

		departmentsES.data = departmentsES.data.filter(
			(d: Department) => d.attributes.name !== "Administration"
		);

		paths = paths.concat(departmentsES.data.map((d: Department) => ({
			params: { slug: d.attributes.slug },
			locale: "es",
		})));
	}

	return {
		paths,
		fallback: false,
	};
};

export async function getStaticProps({ params, locale }: GetStaticPropsContext) {
	//gets all departments
	let departments = await fetch(process.env.NO_I18N ? 
		`https://strapi.mbhs.edu/api/departments?populate[0]=image&[populate][1]=resource.image&populate[2]=staff.image&pagination[pageSize]=1000` :
		`https://strapi.mbhs.edu/api/departments?populate[0]=image&[populate][1]=resource.image&populate[2]=staff.image&pagination[pageSize]=1000&locale=${locale}` 
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
	const [modal, setModal] = React.useState<boolean>(false);
	const [modalContent, setModalContent] = React.useState<Staff>();
	const [resource, setResource] = React.useState<boolean>(false);

	const openModal = (s: Staff, r: boolean = false) => {
		setModalContent(s);
		setModal(true);
		setResource(r);
	};

	const closeModal = (r: boolean = false) => {
		setModal(false);
		setResource(r);
	};

	return (
		<div>
			{modal && (
				<motion.div
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="fixed z-50 bg-black backdrop-blur-md bg-opacity-25 left-0 right-0 top-0 bottom-0 flex justify-center items-center"
					onClick={() => closeModal(false)}
				>
					<motion.div
						layoutId={
							resource
								? "resource-card"
								: `staff-card-${modalContent?.attributes.email}`
						}
						//layout="preserve-aspect"
						className="max-w-full w-auto min-h-max bg-neutral-100 dark:bg-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-md p-3 flex flex-col gap-2"
					>
						<IoClose
							className="w-6 h-6 mb-2 cursor-pointer"
							onClick={() => closeModal(false)}
						/>
						<div className="flex flex-col flex-wrap justify-left gap-5 items-center p-2 w-max">
							<motion.img
								layoutId={
									resource
										? "resource-image"
										: `staff-image-${modalContent?.attributes.email}`
								}
								src={
									modalContent?.attributes.image?.data?.attributes.url ??
									"/assets/soon.jpg"
								}
								className="h-48 rounded-full w-48 object-cover"
							/>

							<div className="max-w-full md:w-[252px] text-center">
								<motion.h3
									className="text-lg font-bold break-words"
									layoutId={
										resource
											? "resource-name"
											: `staff-name-${modalContent?.attributes.email}`
									}
								>
									{modalContent?.attributes.name}
								</motion.h3>
								<p className="text-neutral-600 dark:text-neutral-300 break-words">
									{modalContent?.attributes.title}
								</p>
								<motion.p
									layoutId={
										resource
											? "resource-email"
											: `staff-email-${modalContent?.attributes.email}`
									}
									className="text-red-500 hover:underline underline-offset-2 break-words"
								>
									<a href={`mailto:${modalContent?.attributes.email}`}>
										{modalContent?.attributes.email}
									</a>
								</motion.p>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}

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

				{department.attributes.phone && (
					<p>
						Phone:{" "}
						<a
							href={`tel:${department.attributes.phone}`}
							className="hover:underline underline-offset-2"
						>
							{department.attributes.phone}
						</a>
					</p>
				)}
				{department.attributes.resource.data && (
					<div className="flex flex-col md:flex-row gap-2 md:items-center break-words">
						Resource Teacher:{" "}
						<motion.div className="inline-block" layoutId={`resource-card`}>
							{department.attributes.resource.data.attributes.image.data && (
								<motion.img
									src={
										department.attributes.resource.data.attributes.image.data
											.attributes.url
									}
									layoutId={`resource-image`}
									onClick={() =>
										openModal(department.attributes.resource.data, true)
									}
									className="h-6 w-6 rounded-full inline-block object-cover cursor-pointer"
								/>
							)}
						</motion.div>
						<span>
							<motion.p
								layoutId={`resource-name`}
								onClick={() =>
									openModal(department.attributes.resource.data, true)
								}
								className="hover:underline underline-offset-2 cursor-pointer inline-block"
							>
								{department.attributes.resource.data.attributes.name}
							</motion.p>
							(
							<motion.p
								className="text-red-500 hover:underline underline-offset-2 inline-block"
								layoutId="resource-email"
							>
								<a
									href={`mailto:${department.attributes.resource.data.attributes.email}`}
								>
									{department.attributes.resource.data.attributes.email}
								</a>
							</motion.p>
							)
						</span>
					</div>
				)}

				<h2 className="pt-3 font-bold text-2xl hover:underline underline-offset-2">
					<Link
						href={`/directory#${department.attributes.name}`}
						className="max-w-max"
					>
						Staff
					</Link>
				</h2>

				<ul className="ml-3 py-3">
					{department.attributes.staff.data.map((s, i) => (
						<li>
							<motion.div
								className="inline-block"
								layoutId={`staff-card-${s.attributes.email}`}
							>
								{s.attributes.image.data && (
									<motion.img
										layoutId={`staff-image-${s.attributes.email}`}
										src={s.attributes.image.data.attributes.url}
										onClick={() => openModal(s)}
										className="h-6 w-6 object-cover rounded-full inline-block mr-2 cursor-pointer"
									/>
								)}
							</motion.div>
							<span>
								<motion.p
									layoutId={`staff-name-${s.attributes.email}`}
									onClick={() => openModal(s)}
									className="hover:underline underline-offset-2 cursor-pointer inline-block"
								>
									{s.attributes.name}
								</motion.p>{" "}
								(
								<motion.p
									className="text-red-500 hover:underline underline-offset-2 inline-block"
									layoutId={`staff-email-${s.attributes.email}`}
								>
									<a href={`mailto:${s.attributes.email}`}>
										{s.attributes.email}
									</a>
								</motion.p>
								)
							</span>
						</li>
					))}
				</ul>
				<div className="break-words">
					<Markdown>{department.attributes.content}</Markdown>
				</div>
			</div>
		</div>
	);
}
