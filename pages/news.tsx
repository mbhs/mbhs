import React from "react";
import { New } from "../lib/types";
import Markdown from "../components/Markdown";
import ImageModal from "../components/ImageModal";
import { motion } from "framer-motion";


interface NewsProps {
	news: New[];
}

export async function getStaticProps() {
	let today = new Date();
	let todayStr = today
		.toLocaleDateString("en-GB")
		.split("/")
		.reverse()
		.join("-");

	let news = await fetch(
		`https://strapi.mbhs.edu/api/news?filters[$and][0][removeOn][$gte]=${todayStr}&filters[$and][1][$or][0][publishOn][$lte]=${todayStr}&filters[$and][1][$or][1][publishOn][$null]=true&populate=*&sort=rank:ASC`
	).then((res) => res.json());

	return {
		props: {
			news: news.data,
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

function News({ news }: NewsProps) {
	const [modalData, setModalData] = React.useState<
	  { imageUrl: string; layoutId: string } | null
	>(null);
  
	const openNewsModal = (imageUrl: string, id: string) => {
	  setModalData({ imageUrl, layoutId: id });
	};
  
	const closeNewsModal = () => {
	  setModalData(null);
	};
  
	return (
	  <div className="pb-10 dark:text-white">
		<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5">
		  News
		</h1>
  
		{/* render the modal only if modalData exists */}
		{modalData && (
		  <ImageModal
			imageUrl={modalData.imageUrl}
			layoutId={modalData.layoutId}
			onClose={closeNewsModal}
		  />
		)}
  
		<div className="flex flex-col gap-3 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
		  {news.map(({ attributes: { title, description, image, link } }, i) => (
			<div
			  className={`bg-neutral-400 border border-neutral-300 dark:border-neutral-700 dark:text-white shadow-sm hover:shadow-md flex bg-opacity-10 hover:bg-opacity-20 text-black backdrop-blur-md rounded-lg duration-300 transition-all ${
				image.data || link ? "flex flex-col md:flex-row p-0" : "p-3"
			  }`}
			  key={i}
			>
			  {link && (
				<iframe
				  src={link}
				  allowFullScreen
				  className="h-full w-auto md:flex-1 md:h-40 rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
				/>
			  )}
			  {image.data && !link && (
				<motion.img
				  layoutId={`news-image-${i}`} 
				  src={image.data.attributes.url}
				  onClick={() =>
					openNewsModal(image.data.attributes.url, i.toString())
				  }
				  className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-40 object-cover w-full md:w-80 cursor-pointer hover:opacity-75 transition"
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
  
  export default News;