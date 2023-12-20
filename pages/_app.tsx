import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	const [dark, setDark] = useState(true);
	const [lang, setLang] = useState("en");

	useEffect(() => {
		if (localStorage.getItem("theme") === "light") {
			setDark(false);
		}
		if (localStorage.getItem("lang")) {
			setLang(localStorage.getItem("lang") || "en");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", dark ? "dark" : "light");
		localStorage.setItem("lang", lang);
	}, [dark, lang]);

	return (
		<div
			className={`min-h-screen flex flex-col justify-between ${dark && "dark"}`}
		>
			<Head>
				<title>Montgomery Blair High School</title>
				<meta name="description" content="Montgomery Blair High School" />
				<link rel="icon" href="/assets/favicon.svg" />
				<script defer data-domain="mbhs.edu" src="https://plausible.mbhs.edu/js/plausible.js"></script>
			</Head>
			<>
				{dark && (
					<style jsx global>{`
						body {
							background-color: #0a0a0a;
						}
					`}</style>
				)}
				<Nav setDark={setDark} dark={dark} lang={lang} setLang={setLang}/>
				<Component {...pageProps} dark={dark} lang={lang} />
			</>
			<Footer />
		</div>
	);
}
