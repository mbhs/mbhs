import React from "react";
import Link from "next/link";

export default function Nav() {
	return (
		<div className="bg-red-600 p-3 flex text-white justify-between">
			<p>Montgomery Blair High School</p>
			<div className="flex gap-3">
				<Link href="/">Home</Link>
				<Link href="/academies">Academies</Link>
				<Link href="/news">News</Link>
				<Link href="/schedule">Bell Schedule & Buses</Link>
			</div>
		</div>
	);
}
