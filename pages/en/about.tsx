import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { AboutPage } from "../../lib/types";
import Markdown from "../../components/Markdown";
import ReactMarkdown from "react-markdown";

export async function getStaticProps() {
	let meta = await fetch(
		"https://strapi.mbhs.edu/api/about-page?populate=*"
	).then((res) => res.json());

	return {
		props: {
			meta: meta.data,
		},
		revalidate: 60,
	};
}

interface AboutProps {
	meta: AboutPage;
}

export default function About({ meta }: AboutProps) {
	const [shortcuts, setShortcuts] = useState<boolean>(false);

	/* for in-page navigation
    const links = meta.attributes.text.split("\n").filter((phrase, index, arr) => {return phrase.startsWith("#")});
    for (var i = 0; i < links.length; i++) {
        links[i] = links[i].replaceAll("#", "").trim().replaceAll(" ", "-").toLocaleLowerCase().replaceAll(/[^a-zA-Z-]/gi, "")
    }

    console.log(links);*/

	return (
		<>
			<div className="flex flex-col pb-10 dark:text-white">
				<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5">
					About Blair
				</h1>
				<div className="flex flex-wrap w-full px-5 md:px-12 lg:px-24 xl:px-48 2xl:px-60">
					<img
						src={meta.attributes.image.data?.attributes.url}
						className="absolute top-0 left-0 right-0 h-96 w-full object-cover -z-20"
					/>
					<div className="absolute top-0 left-0 right-0 h-96 w-full -z-20 bg-gradient-to-t backdrop-blur-sm from-white dark:from-neutral-900 to-transparent" />
					<div className="absolute top-0 left-0 right-0 h-96 w-full -z-10 opacity-50 bg-white dark:bg-black" />
					
					<div>
						<Markdown>{meta.attributes.text}</Markdown>
					</div>
					{/*
					<div>
						<img src = {meta.attributes.image.data?.attributes.url} />
					</div>
	*/}				</div>
			</div>
			{/* in-page navigation
            <div className="fixed top-40 mx-10 p-4 flex flex-col bg-slate-300 rounded-lg">
                <h1 className="text-xl md:text-2xl font-bold mb-5">Content</h1>
                <div className="flex flex-col text-wrap space-y-4 w-32">
                    {links.map((link) => 
                        <a key={link} className="hover:text-red-600" href={`#${link}`}>{link}</a>
                    )}
                </div>
            </div>*/}
		</>
	);
}
