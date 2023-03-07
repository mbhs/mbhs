import NewsItem from "../components/NewsItem";
import { New } from "../lib/types";

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
	};
}

function News({ news }: NewsProps) {
	return (
		<div className="bg-black min-h-screen">
			<h1 className="text-xl text-white sm:text-2xl md:text-4xl text-center font-bold pt-5">
				News
			</h1>

			<div className="sm:px-8 md:px-10 lg:px-16 xl:px-24">
				{news.map(({ attributes: { title, description, updatedAt } }, i) => (
					<NewsItem
						header={title}
						content={description}
						lastUpdated={new Date(updatedAt)}
						key={i}
					/>
				))}
			</div>
		</div>
	);
}

export default News;
