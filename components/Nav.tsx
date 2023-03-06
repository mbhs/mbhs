import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDir, setScrollDir] = useState(0);
  const [navbarClass, setNavbarClass] = useState(["pb-16", "bg-red-700"]);
  const [isHover, setHover] = useState<{ [name: string]: boolean }>({});

  const hiddenMask = `repeating-linear-gradient(to top, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 999px, rgba(0,0,0,1) 999px, rgba(0,0,0,1) 999px)`;
  const visibleMask = `repeating-linear-gradient(to top, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 999px)`;

  const subMenuAnimate = {
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
        display: "none",
      }
    }
  };

  const subMenuTransition = {
    duration: .35,
    delay: .25
  };

  const subMenuAnimateNames = {
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

  const toggleHoverMenu = (which: string, state: boolean) => {
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
    if (scrollPosition < 80) {
      setNavbarClass(["hidden", "bg-red-700"]);
    } else {
      if (scrollDir > 0) {
        setNavbarClass(["", "bg-red-700 fixed"]);
      } else if (scrollDir < 0) {
        setNavbarClass(["", "hidden"]);
      }
    }
  }, [scrollPosition]);

  //TODO: make a hover-dropdown  component so that a pull from strapi can be mapped to links + dropdowns
  // also a component for a non dropdown (somehow switch between them depending on the need for a dropdown)

  return (

    <div className={`w-full flex flex-col`}>
      <div className={`${navbarClass[0]} h-20 w-full bg-red-700`}></div>
      <div className={`h-20 z-20 w-full ${navbarClass[1]}`}>
        <div className="px-8 vi flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <img src="/assets/logo.png" className="h-6 m-3 sm:h-10" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">MBHS</span>
          </Link>
          <div className="flex flex-col">
            <div className="my-1 flex flex-row items-center ml-auto px-auto">
              <motion.div onHoverEnd={() => toggleHoverMenu("students", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("students", true)} href="/students" className="block py-1 px-3 text-white">Students</Link>
                <motion.div initial="exit" animate={isHover.students ? "enter" : "exit"} variants={subMenuAnimateNames}>
                  <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                    <div>Vijay</div>
                    <div>Tinu</div>
                    <div>Asher</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onHoverEnd={() => toggleHoverMenu("teachers", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("teachers", true)} href="/teachers" className="block py-1 px-3 text-white">Teachers</Link>
                <motion.div initial="exit" animate={isHover.teachers ? "enter" : "exit"} variants={subMenuAnimateNames}>
                  <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                    <div>Mr. Foster</div>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div onHoverEnd={() => toggleHoverMenu("parents", false)}>
                <Link onMouseEnter={() => toggleHoverMenu("parents", true)} href="/parents" className="block py-1 px-3 text-white">Parents</Link>
                <motion.div initial="exit" animate={isHover.parents ? "enter" : "exit"} variants={subMenuAnimateNames}>
                  <div className="mx-auto text-black font-semibold fixed bg-white rounded-lg">
                    <div>[parents]</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <div>
              <div className="flex flex-row">
                <Link onMouseOver={() => toggleHoverMenu("home", true)} onMouseLeave={() => toggleHoverMenu("home", false)} href="/" className="block py-1 px-3 text-white">Home</Link>
                <Link onMouseOver={() => toggleHoverMenu("about", true)} onMouseLeave={() => toggleHoverMenu("about", false)} href="/about" className="block py-1 px-3 text-white">About</Link>
                <Link onMouseOver={() => toggleHoverMenu("academies", true)} onMouseLeave={() => toggleHoverMenu("academies", false)} href="/academies" className="block py-1 px-3 text-white">Academies</Link>
                <Link onMouseOver={() => toggleHoverMenu("news", true)} onMouseLeave={() => toggleHoverMenu("news", false)} href="/news" className="block py-1 px-3 text-white">News</Link>
                <Link onMouseOver={() => toggleHoverMenu("schedule", true)} onMouseLeave={() => toggleHoverMenu("schedule", false)} href="/schedule" className="block py-1 px-3 text-white">Schedule</Link>
              </div>

              <motion.div
                onMouseEnter={() => toggleHoverMenu("home", true)}
                onMouseLeave={() => toggleHoverMenu("home", false)}
                className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
                initial={subMenuAnimate.exit}
                animate={(isHover.home) ? subMenuAnimate.enter : subMenuAnimate.exit}
                transition={subMenuTransition}>

                <img src="/assets/MBHS_Entrance.jpg" className="rounded-l-lg" />
                <div className="flex flex-col p-4">
                  <div>Home</div>
                </div>
              </motion.div>

              <motion.div
                onMouseEnter={() => toggleHoverMenu("about", true)}
                onMouseLeave={() => toggleHoverMenu("about", false)}
                className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
                initial={subMenuAnimate.exit}
                animate={(isHover.about) ? subMenuAnimate.enter : subMenuAnimate.exit}
                transition={subMenuTransition}>

                <img src="/assets/drop-off-map.jpg" className="rounded-l-lg" />
                <div className="flex flex-col p-4">
                  <div>About</div>
                </div>
              </motion.div>

              <motion.div
                onMouseEnter={() => toggleHoverMenu("academies", true)}
                onMouseLeave={() => toggleHoverMenu("academies", false)}
                className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
                initial={subMenuAnimate.exit}
                animate={(isHover.academies) ? subMenuAnimate.enter : subMenuAnimate.exit}
                transition={subMenuTransition}>

                <img src="/assets/MBHS_Entrance.jpg" className="rounded-l-lg" />
                <div className="flex flex-col p-4">
                  <div>Magnet</div>
                  <div>Cap</div>
                  <div>STEM</div>
                  <div>MMA</div>
                  <div>Some other thing</div>
                  <div>Some other thing2</div>
                </div>
              </motion.div>

              <motion.div
                onMouseEnter={() => toggleHoverMenu("news", true)}
                onMouseLeave={() => toggleHoverMenu("news", false)}
                className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
                initial={subMenuAnimate.exit}
                animate={(isHover.news) ? subMenuAnimate.enter : subMenuAnimate.exit}
                transition={subMenuTransition}>

                <img src="/assets/drop-off-map.jpg" className="rounded-l-lg" />
                <div className="flex flex-col p-4">
                  <div>TOP NEWS</div>
                </div>
              </motion.div>

              <motion.div
                onMouseEnter={() => toggleHoverMenu("schedule", true)}
                onMouseLeave={() => toggleHoverMenu("schedule", false)}
                className="absolute mt-24 top-0 right-5 h-auto md:h-64 min-w-max w-auto md:w-[40%] flex flex-row bg-white rounded-lg"
                initial={subMenuAnimate.exit}
                animate={(isHover.schedule) ? subMenuAnimate.enter : subMenuAnimate.exit}
                transition={subMenuTransition}>

                <img src="/assets/MBHS_Entrance.jpg" className="rounded-l-lg" />
                <div className="flex flex-col p-4">
                  <div>Regular Day</div>
                  <div>Innovation Day</div>
                  <div>Early Release Day</div>
                  <div>2-Hour Delay Day</div>
                  <div>All Period Day</div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
