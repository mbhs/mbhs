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
		<ul {...rest} className="list-disc list-inside pl-3">
			{children}
		</ul>
	);
}

function h1({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h1 {...rest} className="text-4xl font-bold py-2">
			{children}
		</h1>
	);
}

function h2({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h2 {...rest} className="text-2xl font-bold py-2">
			{children}
		</h2>
	);
}

function h3({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h3 {...rest} className="text-xl font-bold py-2">
			{children}
		</h3>
	);
}

function Image({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<img {...rest} className="rounded-lg w-96">
			{children}
		</img>
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
				img: Image,
				ul: List,
				h1,
				h2,
				h3,
			}}
			{...rest}
		>
			{children}
		</ReactMarkdown>
	);
}
