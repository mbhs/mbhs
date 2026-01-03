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
		<div className="bg-neutral-200 dark:bg-neutral-900 p-10 dark:text-white flex flex-col gap-5 items-center mt-auto border-t border-neutral-400 dark:border-neutral-700">
			<div className="flex flex-wrap gap-5 items-center justify-center">
				{badges?.filter((badge) => !badge.attributes.lamp).map((badge, i) => (
					<a href={badge.attributes.link} key={i}>
						{badge.attributes.image && (
							<img
								src={badge.attributes.image.data.attributes.url}
								alt={badge.attributes.name}
								className={(badge.attributes.imagelight.data) ? "h-24 rounded-lg hidden dark:block" : "h-24 rounded-lg"}
							/>
						)}
						{badge.attributes.imagelight.data && (
							<img
								src={badge.attributes.imagelight.data.attributes.url}
								alt={badge.attributes.name}
								className="h-24 rounded-lg dark:hidden"
							/>
						)}
					</a>
				))}
			</div>
			<div className="text-center">
				<a
					className="text-red-500 hover:underline underline-offset-2"
					href="https://docs.google.com/document/d/1_L8ggCo3kHeIHmFBx9Xnc_ZqGv2_xzpgvErPT-8L8uI/edit?tab=t.0"
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
				<br /><br/>
				©1995–2025 Montgomery County Public Schools, 15 W. Gude, Suite 400, Rockville, Maryland 20850
			</p>
			{badges?.filter((badge) => badge.attributes.lamp).map((badge, i) => (
					<a href={badge.attributes.link} key={i}>
						{badge.attributes.image && (
							<img
								src={badge.attributes.image.data.attributes.url}
								alt={badge.attributes.name}
								className={(badge.attributes.imagelight.data) ? "h-24 hidden dark:block" : "w-96"}
							/>
						)}
						{badge.attributes.imagelight.data && (
							<img
								src={badge.attributes.imagelight.data.attributes.url}
								alt={badge.attributes.name}
								className="h-24 dark:hidden"
							/>
						)}
					</a>
			))}

		</div>
	);
}
