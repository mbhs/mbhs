import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi"
import { SlClose } from "react-icons/sl"
import { ImPlus, ImMinus } from "react-icons/im"
//import { NavLink, NavDropdownLink } from "../lib/types"

interface NavProp { //example strapi pull (we still need to figure out how to pull it from strapi though)
    name: string; //on the strapi for a NavLink
    link: string; //on the strapi for NavLink
    img: string; //on the strapi for NavLink
    links: { [name: string]: string }; //a relationship node between NavLink and NavDropdownLink [NOT SURE HOW THIS WILL WORK]
};

let examplePull: NavProp[] = [
{ name: "Home", link: "/", links: { "Home": "/" }, img: "/assets/drop-off-map.jpg" },
{ name: "About", link: "/about", links: { "About": "/about" }, img: "/assets/MBHS_Entrance.jpg" },
{ name: "Academies", link: "/academies", links: { "Magnet": "/academies/magnet", "Cap": "/academies/cap", "STEM": "/academies/stem", "MMA": "/academies/mma", "Some other thing": "/test", "Some other thing2": "/test2" }, img: "/assets/drop-off-map.jpg" },
{ name: "Departments", link: "/departments", links: {"English": "/departments/english", "Career and Technology Education": "/departments/teched"}, img: "/assets/MBHS_Entrance.jpg" }, 
{ name: "News", link: "/news", links: { "TOP NEWS": "/news" }, img: "/assets/MBHS_Entrance.jpg" },
{ name: "Calendar", link: "/calendar", links: {}, img: "/assets/drop-off-map.jpg" },
{ name: "Schedule", link: "/schedule", links: { "Regular Day": "/schedule#regular", "Innovation Day": "/schedule#innovation", "Early Release Day": "/schedule#early-release", "2-Hour Delay": "/schedule#2hourdelat", "All Period Day": "/schedule#all-period" }, img: "/assets/drop-off-map.jpg" }
];

interface ImageDropdownNavLinkProps {
    name: string;
    link: string;
    img: string;
    links: { [name: string]: string };
    isHover: { [name: string]: boolean };
    toggle(which: string, state: boolean): void;
    animate: { enter: {}, exit: {} };
};

function ImageDropdownNavLink({ name, link, img, links, isHover, toggle, animate }: ImageDropdownNavLinkProps) {//should there be an option to not have a dropdown?
    return (
        <div>
            <Link onClick={() => toggle("all", false)} onMouseOver={() => toggle(name, true)} onMouseLeave={() => toggle(name, false)} href={link} className="block py-1 px-3 text-white">{name}</Link>
            <motion.div id={name + "NavLink"}
                onMouseEnter={() => toggle(name, true && (+document.getElementById(name + "NavLink")!.style.opacity) > 0.75)}
                onMouseLeave={() => toggle(name, false)}
                className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
                initial={animate.exit}
                animate={(isHover[name]) ? "enter" : "exit"}
                variants={animate}
            >

                <img src={img} className="rounded-l-lg" />
                <div className="flex flex-col p-4 gap-3">
                    {Object.keys(links).map(link =>
                        <Link href={links[link]} key={links[link]} className="text-lg">{link}</Link>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

//should there be one that just has text? would it be in the same place as the other dropdowns or direclty under the link like the summer/giving links on choate

interface MobileSideBarLinkProps {
    name: string;
    link: string;
    links: { [name: string]: string };
    isClick: { [name: string]: boolean };
    sideBar(state: boolean): void;
    toggle(which: string, state: boolean): void;
    animate: { enter: {}, exit: {} };
};

function MobileSideBarLink({ name, link, links, isClick, sideBar, toggle, animate }: MobileSideBarLinkProps) { //should there be an option to not have a dropdown?
    return (
        <div>
            <div className="flex mx-auto justify-between text-white text-xl">
                <div className="w-full rounded-lg"><Link onClick={() => {sideBar(false), document.body.style.overflow = "" }} href={link}>{name}</Link>
                    <motion.div className="pl-6 bg-red-800 w-full rounded-md" initial={animate.exit} animate={isClick[name] ? "enter" : "exit"} variants={animate}>
                        <ul className="py-2 space-y-1">
                            {Object.keys(links).map(link =>
                                <li key={links[link]}><Link href={links[link]} onClick={() => {sideBar(false), document.body.style.overflow = "" }} className="text-lg">{link}</Link></li>
                            )}
                        </ul>
                    </motion.div>
                </div>
                <div className="relative pl-8 py-2 pr-2">
                    {!isClick[name] && <ImPlus className="mx-2 text-base" onClick={() => toggle(name, true)} />}
                    {isClick[name] && <ImMinus className="mx-2 text-base" onClick={() => toggle(name, false)} />}
                </div>
            </div>
            <hr />
        </div>
    )
};

export default function Nav() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollDir, setScrollDir] = useState(0);
    const [navbarClass, setNavbarClass] = useState(["hidden", "bg-red-700"]);
    const [linkSelected, setLinkSelected] = useState<{ [name: string]: boolean }>({});
    const [mobileNav, setMobileNav] = useState(false);

    const hiddenMask = "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%, rgba(0,0,0,1) 100%, rgba(0,0,0,1) 100%)";
    const visibleMask = "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)";

    const dropdownAnimate = {
        enter: {
            opacity: 1,
            maskImage: visibleMask,
            WebkitMaskImage: visibleMask,
            transition: {
                duration: 0.35,
                delay: 0.2
            },
            display: "flex"
        },
        exit: {
            opacity: 0,
            maskImage: hiddenMask,
            WebkitMaskImage: hiddenMask,
            transition: {
                duration: 0.35,
                delay: 0.1,
            },
            transitionEnd: {
                display: "none"
            }
        }
    };

    const mobileSideBarAnimate = {
        enter: {
            opacity: 1,
            x: 0,
            display: "flex",
            transition: {
                duration: 0.35,
                delay: 0.2
            }
        },
        exit: {
            opacity: 0.1,
            x: 400,
            transition: {
                duration: 0.35,
                delay: 0.2
            },
            transitionEnd: {
                display: "none"
            }
        }
    }

    const dropdownAnimateNames = {
        enter: {
            opacity: 1,
            //WebkitMaskImage: visibleMask,
            transition: {
                duration: .2
            },
            display: "flex"
        },
        exit: {
            opacity: 0,
            //WebkitMaskImage: hiddenMask,
            transition: {
                duration: .2,
                delay: 0.2
            },
            transitionEnd: {
                display: "none",
            }
        }
    };

    const mobileLinkAnimate = {
        enter: {
            opacity: 1,
            maskImage: visibleMask,
            WebkitMaskImage: visibleMask,
            height: "max-content",
            display: "flex",
            transition: {
                duration: .3
            }
        },
        exit: {
            opacity: 0,
            maskImage: hiddenMask,
            WebkitImageMask: hiddenMask,
            height: "0px",
            transition: {
                duration: .3
            },
            transitionEnd: {
                display: "none"
            }
        }
    }

    const toggleLinkSelected = (which: string, state: boolean): void => {
        let copy = { ...linkSelected };
        if (which == "all") {
            for (var key in copy) {
                copy[key] = state;
            }
            setLinkSelected(linkSelected => ({ ...copy }));
            return;
        }
        for (var key in copy) {
            copy[key] = false;
        }
        copy[which] = state;
        setLinkSelected(linkSelected => ({ ...copy }));
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
        }
        else if (scrollPosition < 65) {
            setNavbarClass(["hidden", "bg-red-700"]);
        } else {
            if (scrollDir > 0) {
                setNavbarClass(["", "bg-red-700 fixed"]);
            } else if (scrollDir < 0) {
                setNavbarClass(["", "hidden"]);
            }
        }
    }, [scrollPosition]);

    //TODO: strapi pull links
    //TODO: change the studen/parent/teacher dropdowns

    return (

        <div className="w-full flex flex-col">
            <div className={`${navbarClass[0]} h-16 sm:h-20 w-full bg-red-700 `}></div>
            <div className={`h-16 sm:h-20 z-20 w-full ${navbarClass[1]} px-3 md:px-8 flex flex-wrap items-center justify-between mx-auto`}>
                <Link href="/" className="flex -mt-1 z-10 items-center">
                    <img src="/assets/logo.png" className="h-8 m-3 sm:h-10" alt="Logo" />
                    <span className="self-center mt-1 text-lg sm:text-xl font-semibold whitespace-nowrap text-white">MBHS</span>
                </Link>
                <div className="hidden -mt-1 md:flex flex-col">
                    {/*<div className="mt-1 flex flex-row gap-4 items-center ml-auto px-auto">
                        <motion.div onHoverEnd={() => toggleLinkSelected("students", false)}>
                            <Link onMouseEnter={() => toggleLinkSelected("students", true)} href="/students" className="block py-1 px-3 text-white">Students</Link>
                            <motion.div initial="exit" animate={linkSelected.students ? "enter" : "exit"} variants={dropdownAnimateNames}>
                                <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                                    <div>Vijay</div>
                                    <div>Tinu</div>
                                    <div>Asher</div>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div onHoverEnd={() => toggleLinkSelected("teachers", false)}>
                            <Link onMouseEnter={() => toggleLinkSelected("teachers", true)} href="/teachers" className="block py-1 px-3 text-white">Teachers</Link>
                            <motion.div initial="exit" animate={linkSelected.teachers ? "enter" : "exit"} variants={dropdownAnimateNames}>
                                <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                                    <div>Mr. Foster</div>
                                </div>
                            </motion.div>
                        </motion.div>
                        <motion.div onHoverEnd={() => toggleLinkSelected("parents", false)}>
                            <Link onMouseEnter={() => toggleLinkSelected("parents", true)} href="/parents" className="block py-1 px-3 text-white">Parents</Link>
                            <motion.div initial="exit" animate={linkSelected.parents ? "enter" : "exit"} variants={dropdownAnimateNames}>
                                <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                                    <div>[parents]</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>*/}
                    <div className="flex flex-row gap-4">
                        {examplePull.map(({ name, link, links, img }, prop) =>
                            <ImageDropdownNavLink key={name + "TopBar"} name={name} link={link} img={img} links={links} isHover={linkSelected} toggle={toggleLinkSelected} animate={dropdownAnimate} />
                        )}
                    </div>
                </div>
                <div className="flex md:hidden">
                    <GiHamburgerMenu className={`text-white active:bg-red-700 scale-[2.0] mr-3 transition-all duration-300 hover:scale-[2.5] opacity-${mobileNav ? 0 : 1}`} onClick={() => { setMobileNav(true), setNavbarClass(["", "bg-red-700 fixed"]), document.body.style.overflow = "hidden" }} />
                    <motion.div initial={mobileSideBarAnimate.exit} animate={mobileNav ? "enter" : "exit"} variants={mobileSideBarAnimate} className="fixed w-full h-full top-0 right-0">
                        <SlClose className="text-white active:bg-red-700 scale-[2.0] fixed top-5 sm:top-6 right-8 transition-all duration-300 hover:scale-[2.5]" onClick={() => { setMobileNav(false), document.body.style.overflow = "" }} />
                        <div className="opacity-0 w-1/6" onTouchStart={() => { setMobileNav(false), document.body.style.overflow = "" }} onClick={() => { setMobileNav(false), document.body.style.overflow = "" }}></div>
                        <div className="mt-16 sm:mt-20 pt-1 px-4 w-5/6 bg-red-700 overflow-auto text-white text-xl space-y-2">
                            {examplePull.map(({ name, link, links }, prop) =>
                                <MobileSideBarLink key={name + "SideBar"} name={name} link={link} links={links} isClick={linkSelected} sideBar={setMobileNav} toggle={toggleLinkSelected} animate={mobileLinkAnimate} />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >

    );
}
