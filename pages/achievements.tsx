import { Achievement } from "../lib/types";
import Markdown from "../components/Markdown";

interface AchievementsProps {
	achievements: Achievement[];
}

export async function getStaticProps() {
	let today = new Date();
	let todayStr = today
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	let achievements = await fetch(
		`https://strapi.mbhs.edu/api/achievements?filters[$or][0][publishOn][$lte]=${todayStr}&filters[$or][1][publishOn][$null]=true&populate=*&sort[0]=rank:ASC&sort[1]=publishOn:DESC`
	).then((res) => res.json());

	return {
		props: {
			achievements: achievements.data,
		},
		revalidate: 60,
	};
}

function getEmbed(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return `https://www.youtube.com/embed/${
		match && match[2].length === 11 ? match[2] : null
	}`;
}

function Achievements({ achievements }: AchievementsProps) {
	return (
		<div className="pb-10 dark:text-white">
			<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5">
                Achievements
			</h1>

			<div className="flex flex-col gap-3 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
				{achievements.map(({ attributes: { title, description, image, link } }, i) => (
					<div
						className={`bg-neutral-400 border border-neutral-300 dark:border-neutral-700 dark:text-white shadow-sm hover:shadow-md flex bg-opacity-10 hover:bg-opacity-20 text-black backdrop-blur-md rounded-lg duration-300 transition-all ${
							image.data || link ? "flex flex-col md:flex-row p-0" : "p-3"
						}`}
						key={i}
					>
						{link && (
							<iframe
								src={getEmbed(link)}
								allowFullScreen
								className="h-full w-auto md:flex-1 md:h-40 rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
							/>
						)}
						{image.data && !link && (
							<img
								src={image.data.attributes.url}
								className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-40 object-cover w-full md:w-80"
							/>
						)}
						<div className={`${image.data || link ? "p-3" : ""}`}>
							{title && <p className="font-bold text-xl pb-2">{title}</p>}
							<Markdown>{description}</Markdown>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Achievements;
