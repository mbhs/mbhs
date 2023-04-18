import NewsItem from "../components/NewsItem";
import { New } from "../lib/types";
import Markdown from "../components/Markdown";

interface NewsProps {
	news: New[];
}

export async function getStaticProps() {
	let news = await fetch(
		"https://strapi.mbhs.edu/api/news?populate=*&sort=rank:ASC"
	).then((res) => res.json());

	return {
		props: {
			news: news.data,
		},
		revalidate: 60
	};
}

function News({ news }: NewsProps) {
	return (
		<div className="pb-10 dark:text-white">
			<h1 className="text-xl sm:text-2xl md:text-4xl text-center font-bold pt-5">
				News
			</h1>

			<div className="sm:px-8 md:px-10 lg:px-16 xl:px-24">
				{news.map(({ attributes: { title, description, image } }, i) => (
					<div
						className={`bg-neutral-400 border border-neutral-300 dark:border-neutral-700 dark:text-white shadow-sm hover:shadow-md flex bg-opacity-10 hover:bg-opacity-20 text-black backdrop-blur-md my-3 md:my-3 m-5 md:m-12 rounded-lg duration-300 transition-all ${
							image.data ? "flex flex-col md:flex-row p-0" : "p-3"
						}`}
						key={i}
					>
						{image.data && (
							<img
								src={image.data.attributes.url}
								className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-40 object-cover w-full md:w-80"
							/>
						)}
						<div className={`${image.data ? "p-3" : ""}`}>
							<h1 className="text-xl md:text-3xl">{title}</h1>
							<Markdown>{description}</Markdown>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default News;
