import Head from "next/head";
import Image from "next/image";
import Calendar from "../components/Calendar";

export default function Home() {
	return (
		<div>
			<h1 className="text-4xl text-center font-bold pt-5">
				Montgomery Blair High School
			</h1>
			<Calendar />
		</div>
	);
}
