import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlClose } from "react-icons/sl";
//import { ImPlus, ImMinus } from "react-icons/im";
//import { NavLink, NavDropdownLink } from "../lib/types";
import { CiDark, CiLight } from "react-icons/ci";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { BiCaretDown } from "react-icons/bi";
import { Link as LinkType } from "../lib/types";

let backupPull: LinkType[] = [
	//updated on 5/17/2023
	{
		"id": 23,
		"attributes": {
			"name": "Admin",
			"link": "/departments/admin",
			"order": 1,
			"quicklink": false
		}
	},
	{
		"id": 2,
		"attributes": {
			"name": "About",
			"link": "/about",
			"order": 2,
			"quicklink": true
		}
	},
	{
		"id": 3,
		"attributes": {
			"name": "Directory",
			"link": "/directory",
			"order": 2,
			"quicklink": false
		}
	},
	{
		"id": 8,
		"attributes": {
			"name": "Calendar",
			"link": "/calendar",
			"order": 3,
			"quicklink": false
		}
	},
	{
		"id": 10,
		"attributes": {
			"name": "Counseling",
			"link": "https://sites.google.com/mcpsmd.net/mbhs-schoolcounseling-team/home",
			"order": 4,
			"quicklink": false
		}
	},
	{
		"id": 4,
		"attributes": {
			"name": "Depts",
			"link": "/departments",
			"order": 5,
			"quicklink": false
		}
	},
	{
		"id": 7,
		"attributes": {
			"name": "News",
			"link": "/news",
			"order": 6,
			"quicklink": false
		}
	},
	{
		"id": 6,
		"attributes": {
			"name": "Resources",
			"link": "/resources",
			"order": 7,
			"quicklink": false
		}
	},
	{
		"id": 9,
		"attributes": {
			"name": "Schedule & Buses",
			"link": "/schedule",
			"order": 8,
			"quicklink": false
		}
	},
	{
		"id": 20,
		"attributes": {
			"name": "Absence/Attendence Info",
			"link": "https://minio.mbhs.edu/strapi/MBHS_Attendance_Policy_cb9c411332.pdf?updated_at=2023-05-04T17:53:30.858Z",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 15,
		"attributes": {
			"name": "Academies",
			"link": "https://sites.google.com/a/mcpsmd.net/mbhs-academies",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 12,
		"attributes": {
			"name": "Alumni",
			"link": "http://www.blairalumni.org/",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 14,
		"attributes": {
			"name": "Athletics",
			"link": "https://blairblazersathletics.com/",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 18,
		"attributes": {
			"name": "BNC / Infoflow",
			"link": "https://bnconline.net/",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 16,
		"attributes": {
			"name": "Clubs",
			"link": "https://sites.google.com/mcpsmd.net/mbhsclubs/home",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 21,
		"attributes": {
			"name": "Media Center",
			"link": "https://mbhs.montgomeryschoolsmd.libguides.com/homepage",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 13,
		"attributes": {
			"name": "PTSA",
			"link": "https://blairptsa.org/",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 22,
		"attributes": {
			"name": "Robotics Team",
			"link": "https://robot.mbhs.edu/",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 19,
		"attributes": {
			"name": "SSL Hours",
			"link": "https://sites.google.com/mcpsmd.net/sslatmbhs/home?authuser=0",
			"order": null,
			"quicklink": true
		}
	},
	{
		"id": 17,
		"attributes": {
			"name": "Silver Chips Online",
			"link": "https://sco.mbhs.edu/",
			"order": null,
			"quicklink": true
		}
	}
];

export default function Nav({
	setDark,
	dark,
}: {
	setDark: React.Dispatch<React.SetStateAction<boolean>>;
	dark: boolean;
}) {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [scrollDir, setScrollDir] = useState(0);
	const [navbarClass, setNavbarClass] = useState(["hidden", "bg-red-700"]);
	//const [linkSelected, setLinkSelected] = useState<{ [name: string]: boolean }>({});
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileNav, setMobileNav] = useState(false);
	const [data, setData] = useState<LinkType[]>();

	const fetchLinks = async () => {
		// fetch data from strapi
		await fetch("https://strapi.mbhs.edu/api/links?filters&sort=order:ASC&sort=name:ASC")
			.then((res) => res.json())
			.then((res) => {
				setData(res.data);
			})
			.catch(() => {
				setData(
					backupPull.sort((a, b) => {
						//order alphabetically
						if (a.attributes.name < b.attributes.name) {
							return -1;
						} else if (a.attributes.name > b.attributes.name) {
							return 1;
						} else {
							return 0;
						}
					}).sort((a, b) => {
						//order by rank
						if (a.attributes.order != null && b.attributes.order == null) {
							return -1;
						} else if (
							a.attributes.order == null &&
							b.attributes.order != null
						) {
							return 1;
						} else if (
							a.attributes.order != null &&
							b.attributes.order != null
						) {
							if (a.attributes.order < b.attributes.order) {
								return -1;
							} else if (a.attributes.order > b.attributes.order) {
								return 1;
							} else {
								return 0;
							}
						} else {
							return 0;
						}
					})
				);
			});
	};

	useEffect(() => {
		// fetch data from strapi
		fetchLinks();
	}, []);

	const mobileSideBarAnimate = {
		enter: {
			opacity: 1,
			x: 0,
			display: "flex",
			transition: {
				duration: 0.35,
				delay: 0.1,
			},
		},
		exit: {
			opacity: 0.1,
			x: 400,
			transition: {
				duration: 0.35,
				delay: 0.1,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};
	useEffect(() => {
		const threshold = 15;
		let lastScrollY = window.pageYOffset;
		const updateScrollDir = () => {
			setScrollPosition(window.pageYOffset);
			const scrollY = window.pageYOffset;
			if (Math.abs(scrollY - lastScrollY) < threshold) {
				return;
			}
			setScrollDir(scrollY > lastScrollY ? -1 : 1);
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};
		const onScroll = () => {
			window.requestAnimationFrame(updateScrollDir);
		};
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [scrollDir]);

	useEffect(() => {
		if (mobileNav) {
			setNavbarClass(["", "bg-red-700 fixed"]);
		} else if (scrollPosition < 85) {
			setNavbarClass(["hidden", "bg-red-700"]);
		} else {
			if (scrollDir > 0) {
				setNavbarClass(["", "bg-red-700 fixed animate-fadeIn"]);
			} else if (scrollDir < 0) {
				setNavbarClass(["", "hidden"]);
			}
		}
	}, [scrollPosition]);

	//TODO: strapi pull links

	const hiddenMask =
		"linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)";
	const visibleMask =
		"linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)";

	const dropdownAnimate = {
		enter: {
			opacity: 1,
			y: 0,
			maskImage: visibleMask,
			WebkitMaskImage: visibleMask,
			transition: {
				duration: 0.35,
				delay: 0.2,
			},
			display: "flex",
		},
		exit: {
			opacity: 0,
			y: -10,
			maskImage: hiddenMask,
			WebkitMaskImage: hiddenMask,
			transition: {
				duration: 0.35,
				delay: 0.1,
			},
			transitionEnd: {
				display: "none",
			},
		},
	};

	return (
		<div className="w-full flex flex-col animate-fadeIn">
			<div
				className={`${navbarClass[0]} h-16 sm:h-20 w-full bg-red-700 `}
			></div>
			<div
				className={`h-16 sm:h-20 z-20 w-full ${navbarClass[1]} px-3 md:px-8 flex flex-wrap items-center justify-between mx-auto`}
			>
				<Link href="/" className="flex -mt-1 z-10 items-center">
					<span className="self-center mt-1 text-lg sm:text-xl font-semibold whitespace-nowrap text-white">
						<img
							src="/assets/logo.svg"
							className="text-white h-16 -mt-2 -ml-3"
							alt="Logo"
						/>
					</span>
				</Link>
				<div className="hidden -mt-1 md:flex flex-col">
					<div className="flex flex-row md:gap-2">
						{data
							?.filter(function qlink(obj) {
								return !obj.attributes.quicklink;
							})
							.map(({ attributes: { name, link } }, i) => (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{
										duration: 0.3,
										delay: i * 0.1,
										ease: "linear",
									}}
								>
									<Link
										key={name + "TopBar"}
										href={link}
										className="block py-1 px-2 text-white hover:underline hover:font-semibold underline-offset-[6px] transition-all duration-300 ease-in-out"
									>
										{name}
									</Link>
								</motion.p>
							))}
						<motion.button
							onClick={() => setDropdownOpen((prev) => !prev)}
							onBlur={() => setDropdownOpen(false)}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{
								duration: 0.3,
								delay: 1, //TODO: chang length of delay based on number of links
								ease: "linear",
							}}
							className="bg-black bg-opacity-20 hover:bg-opacity-25 rounded-lg flex flex-row items-center px-3 cursor-pointer text-left relative"
						>
							<p className="block py-1 pr-2 text-white">Quick Links</p>
							<BiCaretDown className="text-white scale-[1.2]" />
							<motion.div
								className="absolute -right-1/3 bg-white border-red-900 border-4 top-[40px] rounded-lg w-max"
								initial={dropdownAnimate.exit}
								animate={dropdownOpen ? "enter" : "exit"} //toggle when clicked
								variants={dropdownAnimate}
							>
								<div className="flex flex-col py-2 px-4 divide-y-2 divide-black">
									{data
										?.filter(function qlink(obj) {
											return obj.attributes.quicklink;
										})
										.map(({ attributes: { name, link, quicklink } }) => (
											<Link
												href={link}
												key={name + "DropdownLink"}
												className="text-lg py-1"
											>
												{name}
											</Link>
										))}
								</div>
							</motion.div>
						</motion.button>
						<button
							className="p-2 rounded-lg bg-black bg-opacity-20 hover:bg-opacity-25 text-white"
							onClick={() => setDark((prev: boolean) => !prev)}
						>
							{dark ? <BsFillSunFill /> : <BsFillMoonFill />}
						</button>
					</div>
				</div>
				<div className="flex md:hidden">
					<GiHamburgerMenu
						className={`text-white active:bg-red-700 scale-[2.0] mr-3 transition-all duration-300 hover:scale-[2.5] opacity-${mobileNav ? 0 : 1
							}`}
						onClick={() => {
							setMobileNav(true),
								setNavbarClass(["", "bg-red-700 fixed"]),
								(document.body.style.overflow = "hidden");
						}}
					/>
					<motion.div
						initial={mobileSideBarAnimate.exit}
						animate={mobileNav ? "enter" : "exit"}
						variants={mobileSideBarAnimate}
						className="fixed w-full h-full top-0 right-0"
					>
						<SlClose
							className="text-white sm:flex active:bg-red-700 scale-[2.0] fixed top-5 sm:top-6 right-8 transition-all duration-300 hover:scale-[2.5]"
							onClick={() => {
								setMobileNav(false), (document.body.style.overflow = "");
							}}
						/>
						<div
							className="opacity-0 w-1/6 sm:w-full"
							onTouchStart={() => {
								setMobileNav(false), (document.body.style.overflow = "");
							}}
							onClick={() => {
								setMobileNav(false), (document.body.style.overflow = "");
							}}
						></div>
						<div className="mt-16 sm:mt-20 pt-1 px-4 w-5/6 sm:w-96 bg-red-700 overflow-auto text-white text-xl space-y-2">
							{data?.map(({ attributes: { name, link } }, prop) => (
								<div className="flex flex-col gap-y-1">
									<Link
										key={name + "SideBar"}
										href={link}
										onClick={() => {
											setMobileNav(false), (document.body.style.overflow = "");
										}}
									>
										{name}
									</Link>
									<hr />
								</div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
