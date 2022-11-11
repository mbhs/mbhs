import Head from "next/head";
import Image from "next/image";
import Events from "../components/Calender";

export default function Home() {
	return (
		<div>
			<h1 className="text-4xl text-center font-bold pt-5">
				Montgomery Blair High School
			</h1>
			<Events />
		</div>
	);
}
