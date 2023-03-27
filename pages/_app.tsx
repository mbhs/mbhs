import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="min-h-screen flex flex-col justify-between">
			<>
				<Nav />
				<Component {...pageProps} />
			</>
			<Footer />
		</div>
	);
}
