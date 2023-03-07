import Markdown from "./Markdown";

function NewsItem({
	header,
	content,
	lastUpdated,
}: {
	header: string;
	content: string;
	lastUpdated: Date;
}) {
	return (
		<div className="bg-white text-white bg-opacity-10 backdrop-blur-md hover:bg-opacity-5 my-3 md:my-5 m-5 md:m-12 rounded-xl hover:bg-neutral-300 transition-all">
			<div className="px-5 py-5">
				<h1 className="text-xl md:text-3xl ">{header}</h1>
				<Markdown>{content}</Markdown>
				<p className="pt-4 italic">
					{`Last updated on ${lastUpdated.toLocaleString("default", {
						month: "long",
						day: "numeric",
						year: "numeric",
					})}`}
				</p>
			</div>
		</div>
	);
}

export default NewsItem;
