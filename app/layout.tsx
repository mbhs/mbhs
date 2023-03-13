import "../styles/globals.css";
import React from "react";
import Nav from "../components/Nav";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta property="og:site_name" content="MBHS" key="ogsitename" />
			</head>
			<body className="bg-black">
				<Nav />
				{children}
			</body>
		</html>
	);
}
