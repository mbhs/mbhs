import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarClass, setNavbarClass] = useState("bg-red-600 p-3");

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
    if (scrollPosition > 0) {
      setNavbarClass("bg-red-600");
    } else {
      setNavbarClass("bg-red-600 p-3");
    }
  }, [scrollPosition]);

  return (
    <div className="h-16 flex justify-between items-center">
      <div className={`w-full fixed z-10 ${navbarClass} flex text-white justify-between items-center`}>
        <Link href="/">
          <img alt="logo" src="/assets/logo.png" className="h-10 scale-110" />
        </Link>
        <div className="flex gap-3 items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/academies">Academies</Link>
          <Link href="/news">News</Link>
          <Link href="/schedule">Bell Schedule & Buses</Link>
          <Link href="/schedule">Shortcuts</Link>
        </div>
      </div>
    </div>
  );
}
