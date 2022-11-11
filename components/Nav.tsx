import React from "react";
import Link from "next/link";

export default function Nav() {
	return (
		<div className="bg-red-500 p-3 flex justify-between">
			<p>Montgomery Blair High School</p>
			<div className="flex gap-3">
				<Link href="/">Home</Link>
				<Link href="/academies">Academies</Link>
			</div>
		</div>
	);
}
