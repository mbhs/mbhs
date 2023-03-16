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
		<div className="bg-black text-black bg-opacity-20 backdrop-blur-md hover:bg-opacity-10 my-3 md:my-5 m-5 md:m-12 rounded-lg duration-300 transition-all">
			<div className="px-5 py-5">
				<h1 className="text-xl md:text-3xl ">{header}</h1>
				<Markdown>{content}</Markdown>
			</div>
		</div>
	);
}

export default NewsItem;
