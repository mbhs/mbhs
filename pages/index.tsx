import Head from "next/head";
import Image from "next/image";
import Calendar from "../components/Calendar";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

export default function Home() {
	return (
		<div className="px-5 md:px-10">
			<h1 className="text-xl md:text-4xl text-center font-bold pt-5">
				Montgomery Blair High School
			</h1>
			<div className="bg-neutral-200 rounded-lg p-2 my-5 w-max m-auto flex flex-wrap gap-5">
				<p className="flex gap-2 items-center">
					<IoLocationSharp />
					51 University Blvd East
				</p>
				<p className="flex gap-2 items-center">
					<BsFillTelephoneFill />
					(240) 740-7200
				</p>
			</div>
			{/* <div className="bg-neutral-200 rounded-lg p-2 my-5 w-max m-auto flex flex-wrap gap-5">
				<p>Principal Renay Johnson</p>
				<p>Home of the Blazers</p>
			</div> */}
			<div className="flex flex-wrap justify-between gap-5">
				<div className="flex-1">
					<div className="w-full">
						<img
							src="https://mbhs.edu/carousel/img3.png"
							alt="MBHS"
							className="rounded-lg w-full md:w-auto md:h-72 mx-auto"
						/>
					</div>
				</div>
				<Calendar />
			</div>
		</div>
	);
}
