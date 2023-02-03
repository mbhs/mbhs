import { useRef, useEffect, useState } from "react";
import { Carousel } from "../lib/types";

interface GalleryPropsType {
	carousel: Carousel[];
}

export default function Gallery(carousel: GalleryPropsType) {
	const photoRefs = useRef<HTMLDivElement[]>([]);
	const [index, setIndex] = useState(0);

	function scrollToPhoto(index: number) {
		if (!photoRefs.current[index]) return;
		photoRefs.current[index].scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
	}

	useEffect(() => {
		scrollToPhoto(index);
	}, [index]);

	useEffect(() => {
		console.log(carousel);
		const interval = setInterval(
			() => setIndex((prev) => (prev + 1) % photoRefs.current.length),
			5000
		);

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<div className="aspect-video flex gap-8 snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-xl hide-scroll">
				{carousel.carousel.map((photo, i) => (
					<div
						className="relative h-full w-full basis-full grow-0 shrink-0 snap-center bg-theme-surface rounded-xl overflow-hidden"
						key={i}
						ref={(el: any) => (photoRefs.current[i] = el)}
					>
						{photo.attributes.image && (
							<img
								src={photo.attributes.image.data.attributes.url}
								alt={photo.attributes.description || "Gallery photo"}
								className="object-cover h-full w-full"
							/>
						)}
						{photo.attributes.description && (
							<p className="mr-4 absolute bottom-4 left-4 px-1.5 py-0.5 text-center text-xs bg-black bg-opacity-50 text-white rounded-md">
								{photo.attributes.description}
							</p>
						)}
					</div>
				))}
			</div>

			<div className="container max-w-2xl flex gap-4 overflow-x-auto overflow-y-hidden hide-scroll mt-4">
				{carousel.carousel.map((photo, i) => (
					<div
						className="relative basis-24 grow-0 shrink-0 aspect-video bg-theme-surface rounded-lg overflow-hidden"
						key={i}
						onClick={() => setIndex(i)}
					>
						{photo.attributes.image && (
							<img
								src={photo.attributes.image.data.attributes.url}
								alt={photo.attributes.description || "Gallery photo"}
								className="object-cover h-full w-full"
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
