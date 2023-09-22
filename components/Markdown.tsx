import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

function a({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<Link
			href=""
			{...rest}
			className="text-red-500 hover:underline underline-offset-2"
		>
			{children}
		</Link>
	);
}

function List({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<ul {...rest} className="list-disc list-inside pl-3">
			{children}
		</ul>
	);
}

function ol({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<ol {...rest} className="list-decimal list-inside">
			{children}
		</ol>
	);
}

function h1({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h1 {...rest} className="text-4xl font-bold py-2" id={children?.toString().trim().toLowerCase()}>
			{children}
		</h1>
	);
}

function h2({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h2 {...rest} className="text-2xl font-bold py-2" id={children?.toString().trim().toLowerCase()}>
			{children}
		</h2>
	);
}

function h3({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<h3 {...rest} className="text-xl font-bold py-2" id={children?.toString().trim().toLowerCase()}>
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
				a,
				img: Image,
				ul: List,
				ol,
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
