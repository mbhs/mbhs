import Head from "next/head";
import Image from "next/image";
import Calendar from "../components/Calendar";

export default function Home() {
	return (
		<div>
			<h1 className="text-4xl text-center font-bold pt-5">
				Montgomery Blair High School
			</h1>
			<div className="flex flex-wrap justify-between p-5 md:px-20 gap-5">
				<div>
					<img
						src="https://mbhs.edu/carousel/img3.png"
						alt="MBHS"
						className="rounded-lg w-full md:h-72"
					/>
				</div>
				<Calendar />
			</div>
		</div>
	);
}
