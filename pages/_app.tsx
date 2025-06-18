import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Snow from "../components/Snow";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
	const [dark, setDark] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("theme") === "light") {
			setDark(false);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);

	return (
		<div
			className={`min-h-screen flex flex-col justify-between ${dark && "dark"}`}
		>
			<Head>
				<title>Montgomery Blair High School</title>
				<meta name="description" content="Montgomery Blair High School" />
				<link rel="icon" href="/assets/favicon.svg" />
				<Script defer data-domain="mbhs.edu" src="https://plausible.mbhs.edu/js/plausible.js"/>
			</Head>
			<>
				{dark && (
					<style jsx global>{`
						body {
							background-color: #0a0a0a;
						}
					`}</style>
				)}
				
				<Nav setDark={setDark} dark={dark} />
				<Component {...pageProps} dark={dark} />
			</>
			<Footer />
			<Snow dark={dark}/>
		</div>
	);
}
