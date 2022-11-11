import React from "react";
import Link from "next/link";

export default function Nav() {
	return (
		<div className="bg-red-500 p-3 flex">
			<Link href="/">Home</Link>
		</div>
	);
}
