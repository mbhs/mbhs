import React from "react";
import ReactMarkdown from "react-markdown";

function Link({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<a {...rest} className="text-red-600 hover:underline">
			{children}
		</a>
	);
}

function List({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<ul {...rest} className="list-disc list-inside">
			{children}
		</ul>
	);
}

function h1({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h1 {...rest} className="text-4xl font-bold">
			{children}
		</h1>
	);
}

function h2({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h2 {...rest} className="text-2xl font-bold">
			{children}
		</h2>
	);
}

export default function Markdown({
	children,
	...rest
}: {
	children: string;
	[key: string]: any;
}) {
	return (
		<ReactMarkdown
			components={{
				a: Link,
				img: ({ children, ...rest }) => <img {...rest}>{children}</img>,
				ul: List,
				h1,
				h2,
			}}
			{...rest}
		>
			{children}
		</ReactMarkdown>
	);
}
