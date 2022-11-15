import NewsItem from "../components/NewsItem";
import { New } from "../lib/types";

interface NewsProps {
	news: New[];
}

export async function getStaticProps() {
	let news = await fetch("https://strapi.mbhs.edu/api/news").then((res) =>
		res.json()
	);

	return {
		props: {
			news: news.data,
		},
	};
}

function News({ news }: NewsProps) {
	return (
		<div>
			<h1 className="text-xl md:text-4xl text-center font-bold pt-5 domShadowText1">
				News
			</h1>

			<div className="content-body">
				<div>
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
		</div>
	);
}

export default News;
