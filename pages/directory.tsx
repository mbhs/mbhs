import React, { useState, useEffect } from "react";
import { Staff, Department } from "../lib/types";
import Link from "next/link";

interface StaffMember {
	name: string;
	email: string;
	position: string;
}

interface StaffData {
	[department: string]: StaffMember[];
}

interface StaffByDepartment {
	department: string;
	staff: StaffMember[];
}

interface StaffDirectoryProps {
	departments: string[];
	staffData: StaffData;
}

export async function getStaticProps() {
	let departments = await fetch(
		`https://strapi.mbhs.edu/api/departments?sort=rank:ASC&fields[0]=name&fields[1]=slug&fields[2]=overrideLink&fields[3]=phone`
	).then((res) => res.json());

	let staff = await fetch(
		`https://strapi.mbhs.edu/api/directory?populate[departments][fields]=name&populate=image&pagination[limit]=1000&sort[0]=rank:ASC&sort[1]=name:ASC&fields[0]=name&fields[1]=email&fields[2]=title`
	).then((res) => res.json());

	return {
		props: {
			departments: departments.data,
			staff: staff.data,
		},
		revalidate: 60,
	};
}

interface DirectoryProps {
	departments: Department[];
	staff: Staff[];
}

export default function Directory({ departments, staff }: DirectoryProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState<number>();
	const [filteredStaff, setFilteredStaff] = useState<Staff[]>(staff);
	const [filteredDepartments, setFilteredDepartments] =
		useState<Department[]>(departments);

	useEffect(() => {
		if (selectedDepartment) {
			let temp = departments.filter((d) => d.id === selectedDepartment);
			setFilteredDepartments(temp);
		} else {
			setFilteredDepartments(departments);
		}
	}, [selectedDepartment]);

	useEffect(() => {
		if (searchTerm) {
			let temp = staff.filter(
				(s) =>
					s.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					s.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredStaff(temp);
		} else {
			setFilteredStaff(staff);
		}
	}, [searchTerm]);

	return (
		<div className="w-full px-5 sm:px-6 md:px-12 lg:px-24 xl:px-24">
			<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5 dark:text-white">
				Staff Directory
			</h1>
			<p className="dark:text-white">
				View the{" "}
				<a
					href="https://ww2.montgomeryschoolsmd.org/directory/directory_Boxschool.aspx?processlevel=04757"
					className="text-red-500 hover:underline underline-offset-2"
				>
					MCPS Directory
				</a>
			</p>
			<div className="flex gap-3 flex-wrap justify-between items-center pb-5 pt-3">
				<div className="flex-1">
					<select
						id="department-select"
						name="department-select"
						value={selectedDepartment}
						onChange={(e) => setSelectedDepartment(parseInt(e.target.value))}
						className="block w-full bg-neutral-200 bg-opacity-20 dark:bg-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm"
					>
						<option value="">All departments</option>
						{departments.map(({ attributes: { name }, id }, i) => (
							<option key={i} value={id}>
								{name}
							</option>
						))}
					</select>
				</div>
				<div className="w-full md:w-1/2 lg:w-2/3 flex items-center">
					<label htmlFor="search-input" className="sr-only">
						Search staff by name or title
					</label>
					<input
						id="search-input"
						type="text"
						placeholder="Search staff by name or title"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="block w-full border bg-neutral-200 bg-opacity-20 dark:bg-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm"
					/>
				</div>
			</div>
			<div className="w-full flex gap-10">
				{/* <div className="min-w-max hidden xl:block sticky top-12 h-full px-3 py-4 overflow-y-auto bg-gray-200 rounded-lg border border-gray-300 bg-opacity-10">
					<ul className="space-y-2 font-medium">
						{departments.map(({ attributes: { name }, id }, i) => (
							<li>
								<Link
									href={`#${name}`}
									className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
								>
									<span className="ml-3">{name}</span>
								</Link>
							</li>
						))}
					</ul>
				</div> */}
				<div className="w-full">
					{filteredDepartments.map(
						({ attributes: { name, phone, slug, overrideLink }, id }, i) => (
							<div
								key={i}
								className={
									filteredStaff.filter(
										(s) =>
											s.attributes.departments.data.filter((d) => d.id === id)
												.length > 0
									).length > 0
										? "pb-8"
										: ""
								}
							>
								{filteredStaff.filter(
									(s) =>
										s.attributes.departments.data.filter((d) => d.id === id)
											.length > 0
								).length > 0 && (
									<h2
										className="text-lg font-bold mb-2 dark:text-white"
										id={name}
									>
										<Link
											href={overrideLink || `/departments/${slug}`}
											className="hover:underline underline-offset-2"
										>
											{name}
										</Link>
										{phone && ` - `}
										{phone && (
											<a
												href={`tel:${phone}`}
												className="hover:underline underline-offset-2"
											>
												{phone}
											</a>
										)}
									</h2>
								)}

								<div className="w-full flex flex-wrap flex-col md:flex-row gap-5">
									{filteredStaff
										.filter(
											(s) =>
												s.attributes.departments.data.filter((d) => d.id === id)
													.length > 0
										)
										.map(({ attributes: { name, email, title, image } }, i) => (
											<div className="w-full md:w-auto bg-white dark:bg-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-md p-6 flex flex-wrap justify-left gap-5 items-center">
												{image.data && (
													<img
														src={image?.data?.attributes.url}
														className="h-20 rounded-full w-20 object-cover"
													/>
												)}
												<div className="max-w-full">
													<h3 className="text-lg font-bold break-words">
														{name}
													</h3>
													<p className="text-neutral-600 dark:text-neutral-300 break-words">
														{title}
													</p>
													<a
														href={`mailto:${email}`}
														className="text-red-500 hover:underline underline-offset-2 break-words"
													>
														{email}
													</a>
												</div>
											</div>
										))}
								</div>
							</div>
						)
					)}
					{filteredStaff.filter(
						(s) => s.attributes.departments.data.length === 0
					).length > 0 &&
						!selectedDepartment && (
							<div className="pb-8">
								<h2 className="text-lg font-bold mb-2 dark:text-white">
									Other
								</h2>
								<div className="w-full flex flex-wrap flex-col md:flex-row gap-5">
									{filteredStaff
										.filter((s) => s.attributes.departments.data.length === 0)
										.map(({ attributes: { name, email, title, image } }, i) => (
											<div className="w-full md:w-auto bg-white dark:bg-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-md p-6 flex gap-5 items-center">
												{image.data && (
													<img
														src={image?.data?.attributes.url}
														className="h-20 rounded-full w-20 object-cover"
													/>
												)}
												<div className="max-w-full">
													<h3 className="text-lg font-bold break-words">
														{name}
													</h3>
													<p className="text-neutral-600 dark:text-neutral-300 break-words">
														{title}
													</p>
													<a
														href={`mailto:${email}`}
														className="text-red-500 hover:underline underline-offset-2 break-words"
													>
														{email}
													</a>
												</div>
											</div>
										))}
								</div>
							</div>
						)}
				</div>
			</div>
		</div>
	);
}
