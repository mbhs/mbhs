import { New } from "../lib/types";
import Markdown from "../components/Markdown";
import { useRef, useState } from "react";
import {motion} from "framer-motion";
import { IoClose } from "react-icons/io5";

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
	}?enablejsapi=1`;
}

function News({ news }: NewsProps) {
	const [modal, setModal] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<New>();

	const [previewVideo, setPreviewVideo] = useState<HTMLIFrameElement | HTMLVideoElement | null>(null);
	const [modalVideo, setModalVideo] = useState<HTMLIFrameElement | HTMLVideoElement | null>(null);

	const openModal = (n: New) => {
		setModalContent(n);
		setModal(true);
	}
	
	const closeModal = () => {
		setModal(false);
	}
	
	const stopPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
	}

	const isVideo = (url: string) => {
		const videoExts = [".mp4", ".mpeg", ".mov", ".wmv", ".avi", ".flv"]
		return videoExts.some((ext) => url.toLowerCase().endsWith(ext))
	} 

	return (
		<div className="pb-10 dark:text-white">
			{modal && (
				<motion.div
					animate={{opacity:1}}
					initial={{opacity:0}}
					exit={{opacity:0}}
					transition={{duration:0.3}}
					className="fixed z-50 bg-black backdrop-blur-md bg-opacity-25 left-0 right-0 top-0 bottom-0 flex justify-center items-center"
					onClick={closeModal}
				>
					<div className="flex flex-col gap-3 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
						<motion.div
							// layoutId={`news-card-${modalContent?.attributes.description}`}
							className="max-w-full w-auto min-h-max bg-neutral-100 dark:bg-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-md p-3 flex-col gap-2"
							onClick={stopPropagation}
						>
							<IoClose
								className="w-6 h-6 mb-2 cursor-pointer"
								onClick={closeModal}
							/>
							{modalContent?.attributes.link && (
								<motion.iframe
									src={getEmbed(modalContent?.attributes.link)}
									allowFullScreen
									className="h-40 w-full md:h-64 lg:h-96 rounded-lg object-scale-down justify-self-center"
									layoutId={`news-link-${modalContent?.attributes.link}`}
									id={`modal-link-${modalContent?.attributes.link}`}
								/>
							)}
							{modalContent?.attributes.image.data && !modalContent?.attributes.link && (
								isVideo(modalContent?.attributes.image.data.attributes.url) ? (
									<motion.video
										src={modalContent?.attributes.image.data.attributes.url}
										className="h-40 md:h-64 lg:h-96 rounded-lg object-scale-down justify-self-center"
										layoutId={`news-video-${modalContent?.attributes.image.data.attributes.url}`}
										id={`modal-video-${modalContent?.attributes.image.data.attributes.url}`}
										controls
									/>
								) : (
									<motion.img
										src={modalContent?.attributes.image.data.attributes.url}
										className="h-40 md:h-64 lg:h-96 rounded-lg object-scale-down justify-self-center"
										layoutId={`news-image-${modalContent?.attributes.image.data.attributes.url}`}
									/>
								)
							)}
							<div className={`${modalContent?.attributes.image.data || modalContent?.attributes.link ? "p-3" : ""}`}>
								{modalContent?.attributes.title && (
								<motion.p 
									className="font-bold text-xl pb-2" 
									layoutId={`news-title-${modalContent?.attributes.title}`}
								>
									{modalContent?.attributes.title}
								</motion.p>)}
								<motion.div
									layoutId={`news-description-${modalContent?.attributes.description}`}
								>
									<Markdown>{modalContent?.attributes.description || ""}</Markdown>
								</motion.div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			)}
			<h1 className="text-2xl md:text-4xl text-center font-bold py-3 md:py-5">
				News
			</h1>

			<div className="flex flex-col gap-3 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-24">
				{news.map((n, i) => (
					<motion.div
						className={`bg-neutral-400 border border-neutral-300 dark:border-neutral-700 dark:text-white shadow-sm hover:shadow-md flex bg-opacity-10 hover:bg-opacity-20 text-black backdrop-blur-md rounded-lg duration-300 transition-all hover:border-neutral-700 dark:hover:border-neutral-300 hover:cursor-pointer ${
							n.attributes.image.data || n.attributes.link ? "flex flex-col md:flex-row p-0" : "p-3"
						}`}
						key={i}
						onClick={() => openModal(n)}
					>
						<div>
							{n.attributes.link && (
								<motion.iframe
									src={getEmbed(n.attributes.link)}
									allowFullScreen
									className="h-40 w-full md:flex-1 rounded-l-lg object-scale-down justify-self-center"
									layoutId={`news-link-${n.attributes.link}`}
									id={`news-link-${n.attributes.link}`}
								/>
							)}
							{n.attributes.image.data && !n.attributes.link && (
								isVideo(n.attributes.image.data.attributes.url) ? (
									<motion.video
										src={n.attributes.image.data.attributes.url}
										className="h-40 w-full md:flex-1 rounded-l-lg object-scale-down justify-self-center"
										layoutId={`news-video-${n.attributes.image.data.attributes.url}`}
										id={`news-video-${n.attributes.image.data.attributes.url}`}
										controls
									/>
								) : (
									<motion.img
										src={n.attributes.image.data.attributes.url}
										className="h-40 w-full md:flex-1 rounded-l-lg object-scale-down justify-self-center"
										layoutId={`news-image-${n.attributes.image.data.attributes.url}`}
									/>
								)
							)}
						</div>
						<div className={`${n.attributes.image.data || n.attributes.link ? "p-3" : ""}`}>
							{n.attributes.title && (
							<motion.p 
								className="font-bold text-xl pb-2" 
								layoutId={`news-title-${n.attributes.title}`}
							>
								{n.attributes.title}
							</motion.p>)}
							<motion.div
								layoutId={`news-description-${n.attributes.description}`}
							>
								<Markdown>{n.attributes.description}</Markdown>
							</motion.div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}

export default News;