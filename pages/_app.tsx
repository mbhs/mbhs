import React, { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
	const [dark, setDark] = useState(true);

	return (
		<div
			className={`min-h-screen flex flex-col justify-between ${dark && "dark"}`}
		>
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
		</div>
	);
}
