import React from "react";
import Link from "next/link";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";

export default function Footer() {
	return (
		<div className="bg-neutral-900 p-10 text-white flex flex-col gap-5 items-center mt-auto">
			<div className="flex flex-wrap gap-5 items-center justify-center">
				<a
					href="https://www.montgomeryschoolsmd.org/departments/studentservices/wellbeing/index-new.aspx"
					target="_blank"
				>
					<img
						src="https://mbhs.edu/img/wellness-360.png"
						alt="Blair Logo"
						className="h-24"
					/>
				</a>
				<a href="https://sites.google.com/mcpsmd.net/blazing-toward-equity-mbhs/home">
					<img
						src="https://mbhs.edu/img/Blazing%20Toward%20Equity%20Logo.png"
						alt="Blair Logo"
						className="h-24"
					/>
				</a>
				<a href="https://www.acesmontgomery.org/">
					<img
						src="https://minio.mbhs.edu/strapi/aces_3659d87393.png?updated_at=2023-03-24T16:19:10.444Z"
						alt="Blair Logo"
						className="h-24"
					/>
				</a>
				<a href="https://www.paypal.com/donate?token=o3dQ5Og74h_T4YDYb7Ul-PfwQeZX6qwJUiKypoR5S5EUeHiPiOo6yqjNMWMxm6nsfjXUYCNCcbgDdR3k&locale.x=US">
					<img
						src="https://minio.mbhs.edu/strapi/donate_efa113e76f.gif?updated_at=2023-03-24T16:21:40.948Z"
						alt="Blair Logo"
						className="h-16"
					/>
				</a>
				<a href="https://ww2.montgomeryschoolsmd.org/digital-citizenship/index.html">
					<img
						src="https://mbhs.edu/img/digitalcitizenship.png"
						alt="Blair Logo"
						className="h-24 rounded-lg"
					/>
				</a>
			</div>
			<div>
				<p>Follow us on Facebook, Instagram, and Twitter!</p>
				<div className="flex gap-3 justify-center pt-2">
					<a href="https://www.facebook.com/pages/Montgomery-Blair-High-School/1631578030396596">
						<BsFacebook className="text-4xl hover:text-blue-600 transition-all duration-300" />
					</a>
					<a href="https://www.instagram.com/blairprincipal/">
						<BsInstagram className="text-4xl hover:text-pink-500 transition-all duration-300" />
					</a>
					<a href="https://twitter.com/blairprincipal">
						<BsTwitter className="text-4xl hover:text-blue-400 transition-all duration-300" />
					</a>
				</div>
			</div>
			<p className="text-center">
				Montgomery Blair High School <br />
				51 University Blvd East, Silver Spring, MD 20901-2451
				<br /> (240) 740-7200 <br /> These pages were created by the{" "}
				<a
					href="https://github.com/mbhs"
					className="text-red-600 hover:underline"
				>
					Blair Sysops
				</a>{" "}
				under the supervision of Peter Hammond.
			</p>
			<a href="https://www.montgomeryschoolsmd.org/">
				<img className="w-16" src="/assets/lamp.png" alt="mcps logo" />
			</a>
		</div>
	);
}
