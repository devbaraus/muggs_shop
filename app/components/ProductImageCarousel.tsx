import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

type ProductImage = {
	transformedSrc: string;
	altText: string;
};

type Props = {
	images: ProductImage[];
	className?: string;
};

export default function ProductImageCarousel({ images, className }: Props) {
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const handlersSwipe = useSwipeable({
		onSwipedLeft: () => nextSlide(),
		onSwipedRight: () => prevSlide(),
	});
	let t: NodeJS.Timeout | null = null;

	function slideClearTimeout() {
		if (t) {
			clearTimeout(t);
		}
	}

	function slideSetTimeout(interval: number = 5000) {
		slideClearTimeout();
		t = setTimeout(nextSlide, interval);
	}

	function nextSlide() {
		let newSlide = currentSlide == images.length - 1 ? 0 : currentSlide + 1;
		setCurrentSlide(newSlide);
	}

	function prevSlide() {
		let newSlide = currentSlide == 0 ? images.length - 1 : currentSlide - 1;
		setCurrentSlide(newSlide);
	}

	useEffect(() => {
		slideSetTimeout();
	}, [currentSlide]);

	useEffect(() => {
		setCurrentSlide(0);
	}, []);

	return (
		<>
			<div className="flex flex-col md:flex-row lg:flex-col gap-x-4">
				<div className="w-full h-full aspect-w-4 aspect-h-4 rounded-lg overflow-hidden">
					{images.map((img, index) => {
						return (
							<img
								src={img.transformedSrc}
								alt={img.altText}
								{...handlersSwipe}
								key={index}
								className={`object-center object-contain unselectable ${
									index == currentSlide ? 'block' : 'hidden'
								}`}
								onMouseEnter={() => {
									slideClearTimeout();
								}}
								onMouseLeave={() => {
									slideSetTimeout();
								}}
							/>
						);
					})}
				</div>
				<div className="lg:w-full flex flex-row md:flex-col lg:flex-row justify-center gap-4">
					{images.map((img, index) => {
						return (
							<button
								key={index}
								className={`cursor-pointer h-16 w-16 unselectable rounded-md border hover:border-gray-500 group ${
									index == currentSlide ? 'border-gray-900' : 'border-gray-200'
								}`}
								onMouseEnter={() => {
									slideClearTimeout();
								}}
								onMouseLeave={() => {
									slideSetTimeout();
								}}
								onClick={() => {
									setCurrentSlide(index);
								}}
							>
								<img
									src={img.transformedSrc}
									alt={img.altText}
									className="object-center object-cover h-full w-full sm:group-hover:opacity-75 rounded-md"
								/>
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
}
