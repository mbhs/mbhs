import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi"
import { SlClose } from "react-icons/sl"
import { ImPlus, ImMinus } from "react-icons/im"
import { NavLink, NavDropdownLink } from "../lib/types"

interface NavProp { //example strapi pull (we still need to figure out how to pull it from strapi though)
    links: NavLink[];
};

let examplePull: NavProp = {
    links: [
        { id: 1, attributes: { name: "Home", link: "/", links: [{ id: 1, attributes: { text: "Home", link: "/" } }], image: { data: { attributes: { url: "/assets/drop-off-map.jpg" } } } } },
        { id: 2, attributes: { name: "About", link: "/about", links: [{ id: 1, attributes: { text: "About", link: "/about" } }], image: { data: { attributes: { url: "/assets/MBHS_Entrance.jpg" } } } } },
        { id: 3, attributes: { name: "Directory", link: "/directory", links: [{ id: 1, attributes: { text: "Blair Staff Directory", link: "/directory" } }], image: { data: { attributes: { url: "/assets/drop-off-map.jpg" } } } } },
        { id: 4, attributes: { name: "Departments", link: "/departments", links: [{ id: 1, attributes: { text: "English", link: "/departments/english" } }, { id: 2, attributes: { text: "Career and Technology Education", link: "/departments/teched" } }], image: { data: { attributes: { url: "/assets/MBHS_Entrance.jpg" } } } } },
        { id: 5, attributes: { name: "Resources", link: "/resources", links: [], image: { data: { attributes: { url: "no picture" } } } } },
        { id: 6, attributes: { name: "News", link: "/news", links: [{ id: 1, attributes: { text: "TOP NEWS", link: "/news" } }], image: { data: { attributes: { url: "/assets/drop-off-map.jpg" } } } } },
        { id: 7, attributes: { name: "Calendar", link: "/calendar", links: [{ id: 1, attributes: { text: "Calendar", link: "/calendar" } }], image: { data: { attributes: { url: "/assets/MBHS_Entrance.jpg" } } } } },
        { id: 8, attributes: { name: "Schedule", link: "/schedule", links: [{ id: 1, attributes: { text: "Regular Day", link: "/schedule#regular" } }, { id: 2, attributes: { text: "Innovation Day", link: "/schedule#innovation" } }, { id: 3, attributes: { text: "Early Release Day", link: "/schedule#early-release" } }, { id: 4, attributes: { text: "2-Hour Delay", link: "/schedule#2hrdelay" } }, { id: 5, attributes: { text: "All Period Day", link: "/schedule#all-period" } }], image: { data: { attributes: { url: "/assets/drop-off-map.jpg" } } } } },
    ]
};

interface ImageDropdownNavLinkProps {
    name: string;
    link: string;
    img: string;
    links: NavDropdownLink[];
    isHover: { [name: string]: boolean };
    toggle(which: string, state: boolean): void;
    animate: { enter: {}, exit: {} };
};

function ImageDropdownNavLink({ name, link, img, links, isHover, toggle, animate }: ImageDropdownNavLinkProps) {//should there be an option to not have a dropdown?
    return (
        <div>
            <Link onClick={() => toggle("all", false)} onMouseOver={() => toggle(name, true)} onMouseLeave={() => toggle(name, false)} href={link} className="block py-1 px-3 text-white">{name}</Link>
            {(links.length > 0) && <motion.div id={name + "NavLink"}
                onMouseEnter={() => toggle(name, true && (+document.getElementById(name + "NavLink")!.style.opacity) > 0.75)}
                onMouseLeave={() => toggle(name, false)}
                className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
                initial={animate.exit}
                animate={(isHover[name]) ? "enter" : "exit"}
                variants={animate}
            >

                <img src={img} className="rounded-l-lg" />
                <div className="flex flex-col p-4 gap-3">
                    {links.map(({ attributes: { text, link } }) =>
                        <Link href={link} key={text + "DropdownLink"} className="text-lg">{text}</Link>
                    )}
                </div>
            </motion.div>}
        </div>
    );
};

//should there be one that just has text? would it be in the same place as the other dropdowns or direclty under the link like the summer/giving links on choate

interface MobileSideBarLinkProps {
    name: string;
    link: string;
    links: NavDropdownLink[];
    isClick: { [name: string]: boolean };
    sideBar(state: boolean): void;
    toggle(which: string, state: boolean): void;
    animate: { enter: {}, exit: {} };
};

function MobileSideBarLink({ name, link, links, isClick, sideBar, toggle, animate }: MobileSideBarLinkProps) { //should there be an option to not have a dropdown?
    return (
        <div>
            <div className="flex mx-auto justify-between text-white text-xl">
                <div className="w-full rounded-lg"><Link onClick={() => { sideBar(false), document.body.style.overflow = "" }} href={link}>{name}</Link>
                    {(Object.keys(links).length > 0) && <motion.div className="pl-6 bg-red-800 w-full rounded-md" initial={animate.exit} animate={isClick[name] ? "enter" : "exit"} variants={animate}>
                        <ul className="py-2 space-y-2">
                            {links.map(({ attributes: { text, link } }) =>
                                <li key={text + "SideBarLink"}><Link href={link} onClick={() => { sideBar(false), document.body.style.overflow = "" }} className="text-lg">{text}</Link></li>
                            )}
                        </ul>
                    </motion.div>}
                </div>
                {(Object.keys(links).length > 0) && <div className="relative pl-8 py-2 pr-2">
                    {!isClick[name] && <ImPlus className="mx-2 text-base" onClick={() => toggle(name, true)} />}
                    {isClick[name] && <ImMinus className="mx-2 text-base" onClick={() => toggle(name, false)} />}
                </div>}
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
                delay: 0.1
            }
        },
        exit: {
            opacity: 0.1,
            x: 400,
            transition: {
                duration: 0.35,
                delay: 0.1
            },
            transitionEnd: {
                display: "none"
            }
        }
    }

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
                setNavbarClass(["", "bg-red-700 fixed animate-fadeIn"]);
            } else if (scrollDir < 0) {
                setNavbarClass(["", "hidden"]);
            }
        }
    }, [scrollPosition]);

    //TODO: strapi pull links

    return (

        <div className="w-full flex flex-col animate-fadeIn">
            <div className={`${navbarClass[0]} h-16 sm:h-20 w-full bg-red-700 `}></div>
            <div className={`h-16 sm:h-20 z-20 w-full ${navbarClass[1]} px-3 md:px-8 flex flex-wrap items-center justify-between mx-auto`}>
                <Link href="/" className="flex -mt-1 z-10 items-center">
                    {/*<img src="/assets/logo.png" className="h-8 m-3 sm:h-10" alt="Logo" />*/}
                    <span className="self-center mt-1 text-lg sm:text-xl font-semibold whitespace-nowrap text-white">MBHS</span>
                </Link>
                <div className="hidden -mt-1 md:flex flex-col">
                    <div className="flex flex-row gap-1 md:gap-2">
                        {examplePull.links.map(({ attributes: { name, link, links, image } }, prop) =>
                            <ImageDropdownNavLink key={name + "TopBar"} name={name} link={link} img={image.data.attributes.url} links={links} isHover={linkSelected} toggle={toggleLinkSelected} animate={dropdownAnimate} />
                        )}
                    </div>
                </div>
                <div className="flex md:hidden">
                    <GiHamburgerMenu className={`text-white active:bg-red-700 scale-[2.0] mr-3 transition-all duration-300 hover:scale-[2.5] opacity-${mobileNav ? 0 : 1}`} onClick={() => { setMobileNav(true), setNavbarClass(["", "bg-red-700 fixed"]), document.body.style.overflow = "hidden" }} />
                    <motion.div initial={mobileSideBarAnimate.exit} animate={mobileNav ? "enter" : "exit"} variants={mobileSideBarAnimate} className="fixed w-full h-full top-0 right-0">
                        <SlClose className="text-white active:bg-red-700 scale-[2.0] fixed top-5 sm:top-6 right-8 transition-all duration-300 hover:scale-[2.5]" onClick={() => { setMobileNav(false), document.body.style.overflow = "" }} />
                        <div className="opacity-0 w-1/6" onTouchStart={() => { setMobileNav(false), document.body.style.overflow = "" }} onClick={() => { setMobileNav(false), document.body.style.overflow = "" }}></div>
                        <div className="mt-16 sm:mt-20 pt-1 px-4 w-5/6 bg-red-700 overflow-auto text-white text-xl space-y-2">
                            {examplePull.links.map(({ attributes: { name, link, links } }, prop) =>
                                <MobileSideBarLink key={name + "SideBar"} name={name} link={link} links={links} isClick={linkSelected} sideBar={setMobileNav} toggle={toggleLinkSelected} animate={mobileLinkAnimate} />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div >

    );
}
