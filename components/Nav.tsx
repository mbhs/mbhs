import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi"
import { SlClose } from "react-icons/sl"
//import { NavLink, NavDropdownLink } from "../lib/types"


interface ImageNavLinkProps {
  name: string;
  link: string;
  img: string;
  links: { [name: string]: string };
  isHover: { [name: string]: boolean };
  toggle(which: string, state: boolean): void;
  animate: { enter: {}, exit: {} };
  transition: {};
}

export function ImageNavLink({ name, link, img, links, isHover, toggle, animate, transition }: ImageNavLinkProps) {
  return (
    <div>
      <Link onMouseOver={() => toggle(name, true)} onMouseLeave={() => toggle(name, false)} href={link} className="block py-1 px-3 text-white">{name}</Link>
      <motion.div id={name}
        onMouseEnter={() => toggle(name, true && (+document.getElementById(name)!.style.opacity) > 0.5)}
        onMouseLeave={() => toggle(name, false)}
        className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
        initial={animate.exit}
        animate={(isHover[name]) ? animate.enter : animate.exit}
        transition={transition}
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


export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDir, setScrollDir] = useState(0);
  const [navbarClass, setNavbarClass] = useState(["hidden", "bg-red-700"]);
  const [isHover, setHover] = useState<{ [name: string]: boolean }>({});
  const [mobileIsClick, setMobileIsClick] = useState<{ [name: string]: boolean }>({});
  const [mobileNav, setMobileNav] = useState(false);

  const hiddenMask = "repeating-linear-gradient(to top, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 500px, rgba(0,0,0,1) 500px, rgba(0,0,0,1) 500px)";
  const visibleMask = "repeating-linear-gradient(to top, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 500px)";

  const dropdownAnimate = {
    enter: {
      opacity: 1,
      maskImage: visibleMask,
      WebkitMaskImage: visibleMask,
      display: "flex"
    },
    exit: {
      opacity: 0,
      maskImage: hiddenMask,
      WebkitMaskImage: hiddenMask,
      transitionEnd: {
        display: "none"
      }
    }
  };

  const dropdownTransition = {
    duration: .35,
    delay: .2
  };

  const mobileSideBarAnimate = {
    enter: {
      opacity: 1,
      x: 0,
      display: "flex"
    },
    exit: {
      opacity: 0.1,
      x: 400,
      transitionEnd: {
        display: "none"
      }
    }
  }

  const mobileSideBarTransition = {
    duration: .35,
    delat: .2
  }

  const dropdownAnimateNames = {
    enter: {
      originY: 0,
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: .2
      },
      display: "flex"
    },
    exit: {
      originY: 0,
      opacity: 0,
      scaleY: 0,
      transition: {
        duration: .2,
        delay: 0.2
      },
      transitionEnd: {
        display: "none",
      }
    }
  };

  const toggleHoverMenu = (which: string, state: boolean): void => {
    let copy = { ...isHover };
    if (which == "all") {
      for (var key in copy) {
        copy[key] = state;
      }
      setHover(isHover => ({ ...copy }));
      return;
    }
    for (var key in copy) {
      copy[key] = false;
    }
    copy[which] = state;
    setHover(isHover => ({ ...copy }));
  };

  const toggleMoileDropdownMenu = (which: string, state: boolean): void => {
    let copy = { ...mobileIsClick };
    if (which == "all") {
      for (var key in copy) {
        copy[key] = state;
      }
      setMobileIsClick(mobileIsClick => ({ ...copy }));
    }
    for (var key in copy) {
      copy[key] = false;
    }
    copy[which] = state;
    setMobileIsClick(mobileIsClick => ({ ...copy }));
  }

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
    if (scrollPosition < 60) {
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

  return (

    <div className="w-full flex flex-col">
      <div className={`${navbarClass[0]} h-16 sm:h-20 w-full bg-red-700`}></div>
      <div className={`h-16 sm:h-20 z-20 w-full ${navbarClass[1]}`}>
        <div className="px-8 vi flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex z-10 items-center">
            <img src="/assets/logo.png" className="h-6 m-3 sm:h-10" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">MBHS</span>
          </Link>
          <div className="hidden md:flex flex-col">
            <div className="mt-1 flex flex-row gap-4 items-center ml-auto px-auto">
              <motion.div onHoverEnd={() => toggleHoverMenu("students", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("students", true)} href="/students" className="block py-1 px-3 text-white">Students</Link>
                <motion.div initial="exit" animate={isHover.students ? "enter" : "exit"} variants={dropdownAnimateNames}>
                  <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                    <div>Vijay</div>
                    <div>Tinu</div>
                    <div>Asher</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onHoverEnd={() => toggleHoverMenu("teachers", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("teachers", true)} href="/teachers" className="block py-1 px-3 text-white">Teachers</Link>
                <motion.div initial="exit" animate={isHover.teachers ? "enter" : "exit"} variants={dropdownAnimateNames}>
                  <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                    <div>Mr. Foster</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onHoverEnd={() => toggleHoverMenu("parents", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("parents", true)} href="/parents" className="block py-1 px-3 text-white">Parents</Link>
                <motion.div initial="exit" animate={isHover.parents ? "enter" : "exit"} variants={dropdownAnimateNames}>
                  <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                    <div>[parents]</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div>
              <div className="flex flex-row gap-4">
                <ImageNavLink name="Home"
                  link="/"
                  img="/assets/MBHS_Entrance.jpg"
                  links={{ "Home": "/" }}
                  isHover={isHover}
                  toggle={toggleHoverMenu}
                  animate={dropdownAnimate}
                  transition={dropdownTransition}
                />
                <ImageNavLink name="About"
                  link="/about"
                  img="/assets/drop-off-map.jpg"
                  links={{ "About": "/about" }}
                  isHover={isHover}
                  toggle={toggleHoverMenu}
                  animate={dropdownAnimate}
                  transition={dropdownTransition}
                />
                <ImageNavLink name="Academies"
                  link="/academies"
                  img="/assets/MBHS_Entrance.jpg"
                  links={{ "Magnet": "/academies/magnet", "Cap": "/academies/cap", "STEM": "/academies/stem", "MMA": "/academies/mma", "Some other thing": "/test", "Some other thing2": "/test2" }}
                  isHover={isHover}
                  toggle={toggleHoverMenu}
                  animate={dropdownAnimate}
                  transition={dropdownTransition}
                />
                <ImageNavLink name="News"
                  link="/news"
                  img="/assets/drop-off-map.jpg"
                  links={{ "TOP NEWS": "/news" }}
                  isHover={isHover}
                  toggle={toggleHoverMenu}
                  animate={dropdownAnimate}
                  transition={dropdownTransition}
                />
                <ImageNavLink name="Schedule"
                  link="/schedule"
                  img="/assets/MBHS_Entrance.jpg"
                  links={{ "Regular Day": "/schedule#regular", "Innovation Day": "/schedule#innovation", "Early Release Day": "/schedule#early-release", "2-Hour Delay": "/schedule#2hourdelat", "All Period Day": "/schedule#all-period" }}
                  isHover={isHover}
                  toggle={toggleHoverMenu}
                  animate={dropdownAnimate}
                  transition={dropdownTransition}
                />
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <GiHamburgerMenu className="text-white scale-[2.0] mt-1 transition-all duration-300 hover:scale-[2.5]" onClick={() => setMobileNav(true)} />
            <motion.div initial={mobileSideBarAnimate.exit} animate={mobileNav ? mobileSideBarAnimate.enter : mobileSideBarAnimate.exit} transition={mobileSideBarTransition} className="fixed w-5/6 h-full top-0 right-0 bg-red-700">
              <SlClose className="text-white scale-[2.0] fixed top-5 sm:top-6 right-8 transition-all duration-300 hover:scale-[2.5]" onClick={() => setMobileNav(false)} />
              <div className="mt-16 sm:mt-20 px-4 w-full">
                <ul className="text-white space-y-2">
                  <li onClick={() => toggleMoileDropdownMenu("test", !mobileIsClick.test)}>number one
                    {mobileIsClick.test && <ul className="py-3 pl-6">
                      <li>test</li> <hr />
                      <li>test2</li> <hr />
                      <li>test3</li> <hr />
                    </ul>}
                  </li><hr />
                  <li>number two</li><hr />
                  <li>number three</li><hr />
                  <li>number four</li><hr />
                  <li>number five</li><hr />
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div >

  );
}
