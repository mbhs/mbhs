import React, { useState, useEffect } from "react";
import { Staff, Department } from "../lib/types";
import department from "./departments/[slug]";

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
		`https://strapi.mbhs.edu/api/departments?sort=rank:ASC`
	).then((res) => res.json());

	let staff = await fetch(
		`https://strapi.mbhs.edu/api/directory?populate=*`
	).then((res) => res.json());

	console.log(staff);

	return {
		props: {
			departments: departments.data,
			staff: staff.data,
		},
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
			let temp = staff.filter((s) =>
				s.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredStaff(temp);
		} else {
			setFilteredStaff(staff);
		}
	}, [searchTerm]);

	// const filteredStaff = departments.reduce((acc, department) => {
	// 	if (selectedDepartment && selectedDepartment !== department) {
	// 		return acc;
	// 	}

	// 	const staff = staffData[department].filter((person) =>
	// 		person.name.toLowerCase().includes(searchTerm.toLowerCase())
	// 	);

	// 	return [...acc, ...staff];
	// }, []);

	// const staffByDepartment = departments.reduce((acc, department) => {
	// 	const staff = staffData[department];

	// 	if (!staff || staff.length === 0) {
	// 		return acc;
	// 	}

	// 	const filteredStaff = staff.filter((person) =>
	// 		person.name.toLowerCase().includes(searchTerm.toLowerCase())
	// 	);

	// 	return [
	// 		...acc,
	// 		{
	// 			department,
	// 			staff: filteredStaff,
	// 		},
	// 	];
	// }, []);

	return (
		<div className="px-5 sm:px-12 md:px-24 lg:px-36 xl:px-48">
			<h1 className="text-xl md:text-4xl text-center font-bold py-5">
				Staff Directory
			</h1>
			<div className="flex gap-3 flex-wrap justify-between items-center py-5">
				<div className="flex-1">
					<label htmlFor="department-select" className="sr-only">
						Select department
					</label>
					<select
						id="department-select"
						name="department-select"
						value={selectedDepartment}
						onChange={(e) => setSelectedDepartment(parseInt(e.target.value))}
						className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
						Search staff by name
					</label>
					<input
						id="search-input"
						type="text"
						placeholder="Search staff by name"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
			</div>
			{filteredDepartments.map(({ attributes: { name }, id }, i) => (
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
							s.attributes.departments.data.filter((d) => d.id === id).length >
							0
					).length > 0 && <h2 className="text-lg font-bold mb-2">{name}</h2>}

					<div className="flex flex-wrap gap-5">
						{filteredStaff
							.filter(
								(s) =>
									s.attributes.departments.data.filter((d) => d.id === id)
										.length > 0
							)
							.map(({ attributes: { name, email, title, image } }, i) => (
								<div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex gap-5 items-center">
									{image.data && (
										<img
											src={image?.data?.attributes.url}
											className="h-20 rounded-full w-20 object-cover"
										/>
									)}
									<div>
										<h3 className="text-lg font-bold">{name}</h3>
										<p className="text-gray-600">{title}</p>
										<a
											href={`mailto:${email}`}
											className="text-blue-500 hover:underline"
										>
											{email}
										</a>
									</div>
								</div>
							))}
					</div>
				</div>
			))}
		</div>
	);
}
