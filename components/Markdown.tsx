import React from "react";
import ReactMarkdown from "react-markdown";

function Link({ children, ...rest }: { children: React.ReactNode }) {
	return (
		<a {...rest} className="text-red-600 hover:underline">
			{children}
		</a>
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
		<ReactMarkdown components={{ a: Link }} {...rest}>
			{children}
		</ReactMarkdown>
	);
}
