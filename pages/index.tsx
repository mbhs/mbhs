import Head from "next/head";
import Image from "next/image";
import Calendar from "../components/Calendar";
import { BsFillTelephoneFill, BsFillPersonFill } from "react-icons/bs";
import { GrTextAlignCenter } from "react-icons/gr";
import { IoLocationSharp } from "react-icons/io5";
import { HiHome } from "react-icons/hi";

export default function Home() {
	return (
		<div className="px-5 md:px-10">
			{/* <div className="bg-neutral-200 rounded-lg p-2 my-5 w-max m-auto flex flex-wrap gap-5">
				<p>Principal Renay Johnson</p>
				<p>Home of the Blazers</p>
			</div> */}
			<div className="flex flex-wrap justify-between gap-5 pt-5">
				<div className="flex-1 mx-auto">
					<h1 className="text-xl md:text-4xl text-center font-bold">
						Montgomery Blair High School
					</h1>
					<div className="flex flex-wrap gap-3 justify-center my-5">
						<a href="https://goo.gl/maps/xWzmWbCvaTaGV6eE8" target="blank">
							<p className="bg-neutral-200 rounded-full px-2 py-1 flex gap-2 items-center">
								<IoLocationSharp />
								51 University Blvd East
							</p>
						</a>
						<p className="bg-neutral-200 rounded-full px-2 py-1 flex gap-2 items-center">
							<BsFillTelephoneFill />
							(240) 740-7200
						</p>
					</div>
					<div className="flex-1">
						<div className="mx-auto md:w-max">
							<div className="grid relative grid-cols-12">
								<img
									src="https://mbhs.edu/carousel/img3.png"
									alt="MBHS"
									className="rounded-lg md:w-auto md:h-72 col-span-8 row-span-1 z-10"
								/>
								<img
									src="https://mbhs.edu/carousel/img4.png"
									alt="MBHS"
									className="rounded-lg md:w-auto md:h-72 col-span-8 mt-[-10%] ml-[50%] z-20"
								/>
							</div>
						</div>
					</div>
					<h2 className="font-bold text-2xl text-center pt-5 pb-3">News</h2>
					<div className="flex flex-col gap-3">
						<div className="bg-neutral-200 rounded-lg p-2">
							The November Principal's Newsletter from Ms. Johnson is now
							available!
						</div>
						<div className="bg-neutral-200 rounded-lg p-2">
							Senior families! You can pay for your Cap & Gown and other
							Graduation items here through 12/16. You can also support our
							Graduation Fund for needy Blair families here. If you have
							questions about MCPS's new online payment system, please contact
							Donna Franklin.
						</div>
						<div className="bg-neutral-200 rounded-lg p-2">
							Parents/guardians! Instructions for the county's new online
							payment system are available here. These will be used to provide
							online payment options for field trips, event tickets,
							obligations, and other school-related payments.
						</div>
					</div>
				</div>
				<div>
					<div className="bg-neutral-200 p-2 rounded-lg mb-5 w-full md:w-80">
						<h2 className="text-center font-bold text-xl">School Info</h2>
						<p className="flex gap-2 items-center">
							<BsFillPersonFill />
							Principal Renay Johnson
						</p>
						<p className="flex gap-2 items-center">
							<HiHome />
							Home of the Blazers
						</p>
						<p className="flex gap-2 items-center">
							<GrTextAlignCenter />
							Crescens Scientia
						</p>
						<p className="flex gap-2 items-center">
							<IoLocationSharp className="flex-none" />
							51 University Blvd East Silver Spring Maryland 20901-2451
						</p>
						<p className="flex gap-2 items-center">
							<BsFillTelephoneFill /> (240) 740-7200
						</p>
					</div>
					<Calendar />
				</div>
			</div>
		</div>
	);
}
