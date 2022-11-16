import ReactMarkdown from "react-markdown";

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
		<div className="bg-neutral-200 md:w-1/2 place-content-center my-3 md:my-5 m-5 md:m-12 content-center rounded-xl hover:bg-neutral-300 transition-all md:odd:float-left md:even:float-right">
			<div className="px-5 py-5">
				<h1 className="text-xl md:text-3xl ">{header}</h1>
				<ReactMarkdown>{content}</ReactMarkdown>
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
