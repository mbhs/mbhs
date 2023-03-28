import React, { useState } from "react";

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
	const staffData = await import("../data/staff.json");
	const departments = Object.keys(staffData.default);

	return {
		props: {
			departments,
			staffData: staffData.default,
		},
	};
}

function StaffCard({ name, email, position }) {
	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
			<h3 className="text-lg font-bold">{name}</h3>
			<p className="text-gray-600">{position}</p>
			<a href={`mailto:${email}`} className="text-blue-500 hover:underline">
				{email}
			</a>
		</div>
	);
}

export default function StaffDirectory({ departments, staffData }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDepartment, setSelectedDepartment] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleDepartmentChange = (event) => {
		setSelectedDepartment(event.target.value);
	};

	const filteredStaff = departments.reduce((acc, department) => {
		if (selectedDepartment && selectedDepartment !== department) {
			return acc;
		}

		const staff = staffData[department].filter((person) =>
			person.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return [...acc, ...staff];
	}, []);

	const staffByDepartment = departments.reduce((acc, department) => {
		const staff = staffData[department];

		if (!staff || staff.length === 0) {
			return acc;
		}

		const filteredStaff = staff.filter((person) =>
			person.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return [
			...acc,
			{
				department,
				staff: filteredStaff,
			},
		];
	}, []);

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
						onChange={handleDepartmentChange}
						className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					>
						<option value="">All departments</option>
						{departments.map((department) => (
							<option key={department} value={department}>
								{department}
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
						onChange={handleSearchChange}
						className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					/>
				</div>
			</div>
			{staffByDepartment.map(({ department, staff }) => (
				<div key={department} className="mb-8">
					<h2 className="text-lg font-bold mb-2">{department}</h2>
					{staff.length === 0 ? (
						<p className="text-gray-600">No staff members found.</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{staff.map(({ name, email, position }, index) => (
								<StaffCard
									key={index}
									name={name}
									email={email}
									position={position}
								/>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
