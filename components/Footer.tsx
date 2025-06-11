import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsInstagram, BsTwitterX, BsFacebook } from "react-icons/bs";
import { Badge } from "../lib/types";

export default function Footer() {
	const [badges, setBadges] = useState<Badge[]>([]);

	useEffect(() => {
		let data = fetch(
			"https://strapi.mbhs.edu/api/badges?sort=rank:ASC&populate=*"
		)
			.then((res) => res.json())
			.then((d) => setBadges(d.data))
			.catch(() => {
				console.log("Error fetching badges! Strapi is probably down.");
				setBadges([]);
			});
	}, []);

	return (
		<div className="bg-neutral-900 p-10 text-white flex flex-col gap-5 items-center mt-auto">
			<div className="flex flex-wrap gap-5 items-center justify-center">
				{badges?.map((badge, i) => (
					<a href={badge.attributes.link} key={i}>
						{badge.attributes.image && (
							<img
								src={badge.attributes.image.data.attributes.url}
								alt={badge.attributes.name}
								className="h-24 rounded-lg"
							/>
						)}
					</a>
				))}
			</div>
			<div className="text-center">
				<a
					className="text-red-500 hover:underline underline-offset-2"
					href="https://drive.google.com/file/d/1nYWWiCqILaN6TCPTFFEKhM7Q5AObPA92/view?usp=sharing"
				>
					School Improvement Plan (SIP)
				</a>
				<p>Follow us on Facebook, Instagram, and Twitter!</p>
				<div className="flex gap-3 justify-center pt-2">
					<a href="https://www.facebook.com/pages/Montgomery-Blair-High-School/1631578030396596">
						<BsFacebook className="text-4xl hover:text-blue-600 transition-all duration-300" />
					</a>
					<a href="https://www.instagram.com/montgomery.blair.hs/">
						<BsInstagram className="text-4xl hover:text-pink-500 transition-all duration-300" />
					</a>
					<a href="https://twitter.com/mbhs_blazers">
						<BsTwitterX className="text-4xl hover:text-blue-400 transition-all duration-300" />
					</a>
				</div>
			</div>
			<p className="text-center">
				Montgomery Blair High School <br />
				<a
					href="https://goo.gl/maps/M5DGpJECkjYnNpRK7"
					className="hover:underline underline-offset-2"
				>
					51 University Blvd East, Silver Spring, MD 20901-2451
				</a>
				<br />{" "}
				<a
					href="tel:(240) 740-7200"
					className="hover:underline underline-offset-2"
				>
					(240) 740-7200
				</a>{" "}
				<br />
				Maryland Tip Line:{" "}
				<a
					href="tel:+1 (883) 632-7233"
					className="hover:underline underline-offset-2"
				>
					+1 (833) 632-7233
				</a>{" "}
				<br />
				These pages were created by the{" "}
				<a
					href="https://github.com/mbhs"
					className="text-red-500 hover:underline underline-offset-2"
				>
					Blair Sysops
				</a>{" "}
				under the supervision of Peter Hammond.
			</p>
			<a href="https://www.montgomeryschoolsmd.org/">
				<img className="w-96" src="/assets/lamp.png" alt="mcps logo" />
			</a>
		</div>
	);
}
