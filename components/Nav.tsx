import React from "react";
import Link from "next/link";

export default function Nav() {
	return (
		<div className="h-16 flex justify-between items-center">
			<div className="w-full fixed z-10 bg-red-600 p-3 flex text-white justify-between items-center">
				<Link href="/">
					<img alt="logo" src="/assets/logo.png" className="h-10 scale-110" />
				</Link>
				<div className="flex gap-3 items-center">
					<Link href="/">Home</Link>
					<Link href="/about">About</Link>
					<Link href="/academies">Academies</Link>
					<Link href="/news">News</Link>
					<Link href="/schedule">Bell Schedule & Buses</Link>
				</div>
			</div>
		</div>
	);
}
