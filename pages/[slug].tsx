import React from "react";
import { Page } from "../lib/types";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import Markdown from "../components/Markdown";

export const getStaticPaths: GetStaticPaths = async () => {
	//gets all pages
	let pagesEN = await fetch(`https://strapi.mbhs.edu/api/pages?locale=en`).then((res) =>
		res.json()
	);

	let paths = pagesEN.data.map((p: Page) => ({
		params: { slug: p.attributes.slug },
		//locale: "en",
	}))

	if (process.env.I18N) {
		let pagesES = await fetch(`https://strapi.mbhs.edu/api/pages?locale=es`).then((res) =>
			res.json()
		);

		paths = paths.concat(pagesES.data.map((p: Page) => ({
			params: { slug: p.attributes.slug },
			locale: "es",
		})));
	}

	return {
		paths,
		fallback: false,
	};
};

export async function getStaticProps({ params, locale }: GetStaticPropsContext) {
	//gets all pages
	let pages = await fetch(`https://strapi.mbhs.edu/api/pages?locale=${locale}`).then((res) =>
		res.json()
	);

	let page = pages.data.find((p: Page) => p.attributes.slug === params?.slug);

	return {
		props: {
			page: page,
		},
		revalidate: 60,
	};
}

export default function Template({ page }: { page: Page }) {
	return (
		<div className="flex flex-col pb-10 dark:text-white">
			<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5">
				{page.attributes.title}
			</h1>
			<div className="w-full px-5 md:px-12 lg:px-24 xl:px-48 2xl:px-60">
				<Markdown>{page.attributes.content}</Markdown>
			</div>
		</div>
	);
}
