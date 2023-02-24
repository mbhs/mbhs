import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarClass, setNavbarClass] = useState("bg-red-600 p-1");
  const [scrollDir, setScrollDir] = useState(0);
  const [isHover, setHover] = useState<{[name: string]: boolean}>({});

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3
      },
      display: "flex"
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.2,
        delay: 0.2
      },
      TransitionEvent: {
        display: "none"
      }
    }
  };

  const toggleHoverMenu = (which: string, state: boolean) => {
    let copy = {...isHover};
    for (var key in copy) {
      copy[key] = false;
    }
    copy[which] = state;
    setHover(isHover => ({ ...copy }));
  };


  useEffect(() => {
    const threshold = 20;
    let lastScrollY = window.pageYOffset;
    const updateScrollDir = () => {
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
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition < 75) {
      setNavbarClass("bg-red-600");
    } else {
      if (scrollDir > 0) {
        setNavbarClass("bg-red-600 fixed");
      } else if (scrollDir < 0) {
        setNavbarClass("hidden");
      }
      
    }
  }, [scrollPosition]);


  return (

    <div className="h-24">
      <div className={`w-full ${navbarClass}`}>
        <div className="px-10 flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
              <img src="/assets/logo.png" className="h-6 m-3 sm:h-10" alt="Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">MBHS</span>
          </Link>
          <div className={`flex flex-col`}>
            <div className="flex flex-row items-center ml-auto px-auto">
              <motion.div onMouseEnter={() => toggleHoverMenu("students", true)} onMouseLeave={() => toggleHoverMenu("students", false)}>
                <Link href="/students" className="block py-1 px-3 text-white">Students</Link>
                <motion.div initial="exit" animate={isHover.students ? "enter" : "exit"} variants={subMenuAnimate}>
                  <div className="mx-auto font-semibold fixed bg-white">
                    <div>Vijay</div>
                    <div>Tinu</div>
                    <div>Asher</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onMouseEnter={() => toggleHoverMenu("teachers", true)} onMouseLeave={() => toggleHoverMenu("teachers", false)}>
                <Link href="/teachers" className="block py-1 px-3 text-white">Teachers</Link>
                <motion.div initial="exit" animate={isHover.teachers ? "enter" : "exit"} variants={subMenuAnimate}>
                  <div className="font-semibold fixed bg-white">
                    <div>Mr. Foster</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onMouseEnter={() => toggleHoverMenu("parents", true)} onMouseLeave={() => toggleHoverMenu("parents", false)}>
                <Link href="/parents" className="block py-1 px-3 text-white">Parents</Link>
                <motion.div initial="exit" animate={isHover.parents ? "enter" : "exit"} variants={subMenuAnimate}>
                  <div className="font-semibold fixed bg-white">
                    <div>[parents]</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <div className="flex flex-row">
              <Link href="/"          className="block py-2 px-3 text-white">Home</Link>
              <Link href="/about"     className="block py-2 px-3 text-white">About</Link>
              <Link href="/academies" className="block py-2 px-3 text-white">Academies</Link>
              <Link href="/news"      className="block py-2 px-3 text-white">News</Link>
              <Link href="/schedule"  className="block py-2 px-3 text-white">Schedule</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
