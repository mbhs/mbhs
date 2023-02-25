import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarClass, setNavbarClass] = useState("bg-red-600 p-1");
  const [scrollDir, setScrollDir] = useState(0);
  const [isHover, setHover] = useState<{ [name: string]: boolean }>({});

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.2
      },
      display: "flex"
    },
    exit: {
      opacity: 0,
      rotateX: -25,
      transition: {
        duration: 0.2,
        delay: 0.2
      },
      transitionEnd: {
        display: "none",
      }
    }
  };

  const toggleHoverMenu = (which: string, state: boolean) => {
    let copy = { ...isHover };
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

  //TODO: make a hover-dropdown  component so that a pull from strapi can be mapped to links + dropdowns
  // also a component for a non dropdown (somehow switch between them depending on the need for a dropdown)


  return (

    <div className="flex flex-col">
      <div className={`h-16 w-full ${navbarClass}`}>
        <div className="px-8 flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <img src="/assets/logo.png" className="h-6 m-3 sm:h-10" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">MBHS</span>
          </Link>
          <div className={`flex flex-col`}>
            <div className="flex flex-row items-center ml-auto px-auto">
              <motion.div onHoverEnd={() => toggleHoverMenu("students", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("students", true)} href="/students" className="block py-1 px-3 text-white">Students</Link>
                <motion.div initial="exit" animate={isHover.students ? "enter" : "exit"} variants={subMenuAnimate}>
                  <div className="mx-auto text-black font-semibold fixed bg-white">
                    <div>Vijay</div>
                    <div>Tinu</div>
                    <div>Asher</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onHoverEnd={() => toggleHoverMenu("teachers", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("teachers", true)} href="/teachers" className="block py-1 px-3 text-white">Teachers</Link>
                <motion.div initial="exit" animate={isHover.teachers ? "enter" : "exit"} variants={subMenuAnimate}>
                  <div className="text-black font-semibold fixed bg-white">
                    <div>Mr. Foster</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onHoverEnd={() => toggleHoverMenu("parents", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("parents", true)} href="/parents" className="block py-1 px-3 text-white">Parents</Link>
                <motion.div initial="exit" animate={isHover.parents ? "enter" : "exit"} variants={subMenuAnimate}>
                  <div className="text-black font-semibold fixed bg-white">
                    <div>[parents]</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div className="flex flex-row">
              <Link onMouseEnter={() => toggleHoverMenu("home", true)} href="/" className="block py-1 px-3 text-white">Home</Link>
              <Link onMouseEnter={() => toggleHoverMenu("about", true)} href="/about" className="block py-1 px-3 text-white">About</Link>
              <Link onMouseEnter={() => toggleHoverMenu("academies", true)} href="/academies" className="block py-1 px-3 text-white">Academies</Link>
              <Link onMouseEnter={() => toggleHoverMenu("news", true)} href="/news" className="block py-1 px-3 text-white">News</Link>
              <Link onMouseEnter={() => toggleHoverMenu("schedule", true)} href="/schedule" className="block py-1 px-3 text-white">Schedule</Link>
            </div>

          </div>
        </div>
      </div>
      <div className="w-full fixed mt-16 h-64">
        <div className="w-full h-full flex flex-row">
          <div className="basis-7/12 w-full"></div>
          <div className="basis-5/12 w-full">
            <motion.div className="fixed h-64 flex flex-row" initial="exit" animate={isHover.home ? "enter" : "exit"} variants={subMenuAnimate} onHoverEnd={() => toggleHoverMenu("home", false)}>
              <img src="/assets/MBHS_Entrance.jpg" />
              <div className="flex flex-col">
                <div>Home</div>
              </div>
            </motion.div>

            <motion.div className="fixed h-64 flex flex-row" initial="exit" animate={isHover.about ? "enter" : "exit"} variants={subMenuAnimate} onHoverEnd={() => toggleHoverMenu("about", false)}>
              <img src="/assets/MBHS_Entrance.jpg" />
              <div className="flex flex-col">
                <div>About</div>
              </div>
            </motion.div>

            <motion.div className="fixed h-64 flex flex-row" initial="exit" animate={isHover.academies ? "enter" : "exit"} variants={subMenuAnimate} onHoverEnd={() => toggleHoverMenu("academies", false)}>
              <img src="/assets/MBHS_Entrance.jpg" />
              <div className="flex flex-col">
                <div>Magnet</div>
                <div>Cap</div>
                <div>STEM</div>
                <div>MMA</div>
                <div>Some other thing</div>
                <div>Some other thing2</div>
              </div>
            </motion.div>

            <motion.div className="fixed h-64 flex flex-row" initial="exit" animate={isHover.news ? "enter" : "exit"} variants={subMenuAnimate} onHoverEnd={() => toggleHoverMenu("news", false)}>
              <img src="/assets/MBHS_Entrance.jpg" />
              <div className="flex flex-col">
                <div>TOP NEWS</div>
              </div>
            </motion.div>

            <motion.div className="fixed h-64 flex flex-row" initial="exit" animate={isHover.schedule ? "enter" : "exit"} variants={subMenuAnimate} onHoverEnd={() => toggleHoverMenu("schedule", false)}>
              <img src="/assets/MBHS_Entrance.jpg" />
              <div className="flex flex-col">
                <div>Regular Day</div>
                <div>Innovation Day</div>
                <div>Early Release Day</div>
                <div>2-Hour Delay Day</div>
                <div>All Pediod Day</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

  );
}
