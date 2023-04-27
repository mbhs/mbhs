import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlClose } from "react-icons/sl";
//import { ImPlus, ImMinus } from "react-icons/im";
//import { NavLink, NavDropdownLink } from "../lib/types";
import { CiDark, CiLight } from "react-icons/ci";
import { Link as LinkType } from "../lib/types";


let examplePull: LinkType[] = [
	{ id: 1, attributes: { name: "Home", link: "/" } },
	{ id: 2, attributes: { name: "About", link: "/about" } },
	{ id: 3, attributes: { name: "Directory", link: "/directory" } },
	{ id: 4, attributes: { name: "Departments", link: "/departments" } },
	{ id: 5, attributes: { name: "Resources", link: "/resources" } },
	{ id: 6, attributes: { name: "News", link: "/news" } },
	{ id: 7, attributes: { name: "Calendar", link: "/calendar" } },
	{ id: 8, attributes: { name: "Schedule", link: "/schedule" } },
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
	const [mobileNav, setMobileNav] = useState(false);
	const [data, setData] = useState<LinkType[]>();

	const fetchLinks = async () => {
		// fetch data from strapi
		await fetch("https://strapi.mbhs.edu/api/links")
			.then((res) => res.json())
			.then((res) => {
				setData(res.data);
			})
			.catch(() => {
				setData(examplePull);
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
		} else if (scrollPosition < 65) {
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

	return (
		<div className="w-full flex flex-col animate-fadeIn">
			<div
				className={`${navbarClass[0]} h-16 sm:h-20 w-full bg-red-700 `}
			></div>
			<div
				className={`h-16 sm:h-20 z-20 w-full ${navbarClass[1]} px-3 md:px-8 flex flex-wrap items-center justify-between mx-auto`}
			>
				<Link href="/" className="flex -mt-1 z-10 items-center">
					{/*<img src="/assets/logo.png" className="h-8 m-3 sm:h-10" alt="Logo" />*/}
					<span className="self-center mt-1 text-lg sm:text-xl font-semibold whitespace-nowrap text-white">
						<img
							src="/assets/logo.svg"
							className="text-white h-16 -mt-2 -ml-3"
							alt="Logo"
						/>
					</span>
				</Link>
				<div className="hidden -mt-1 md:flex flex-col">
					<div className="flex flex-row gap-1 md:gap-2">
						{
							data?.map(({ attributes: { name, link } }, i) => (
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
										className="block py-1 px-3 text-white"
									>
										{name}
									</Link>
								</motion.p>
							))
						}
						<button
							className="p-2 rounded-lg bg-black bg-opacity-20 hover:bg-opacity-25 text-white"
							onClick={() => setDark((prev: boolean) => !prev)}
						>
							{dark ? <CiLight /> : <CiDark />}
						</button>
					</div>
				</div>
				<div className="flex md:hidden">
					<GiHamburgerMenu
						className={`text-white active:bg-red-700 scale-[2.0] mr-3 transition-all duration-300 hover:scale-[2.5] opacity-${
							mobileNav ? 0 : 1
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
							{
								data?.map(({ attributes: { name, link } }, prop) => (
									<div className="flex flex-col gap-y-1">
										<Link
											key={name + "SideBar"}
											href={link}
											onClick={() => {
												setMobileNav(false),
													(document.body.style.overflow = "");
											}}
										>
											{name}
										</Link>
										<hr />
									</div>
								))
							}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
