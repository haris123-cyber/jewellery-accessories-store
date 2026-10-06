"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function BannerCarousel() {
    const carouselRef = useRef<HTMLDivElement>(null);

    const banners = [
        "/images/banners/image copy 4.png",
        "/images/banners/image copy 5.png",
        "/images/banners/image copy 2.png",
        "/images/banners/image copy 6.png",
    ];

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let animationFrame: number;
        let paused = false;

        const speed = 0.6;

        const autoScroll = () => {
            if (!paused) {
                carousel.scrollLeft += speed;

                // When reaching the end, smoothly jump back to start
                if (
                    carousel.scrollLeft + carousel.clientWidth >=
                    carousel.scrollWidth - 5
                ) {
                    carousel.scrollLeft = 0;
                }
            }

            animationFrame = requestAnimationFrame(autoScroll);
        };

        animationFrame = requestAnimationFrame(autoScroll);

        // Pause while user interacts
        const pause = () => (paused = true);
        const resume = () => (paused = false);

        carousel.addEventListener("mouseenter", pause);
        carousel.addEventListener("mouseleave", resume);
        carousel.addEventListener("touchstart", pause);
        carousel.addEventListener("touchend", resume);

        return () => {
            cancelAnimationFrame(animationFrame);
            carousel.removeEventListener("mouseenter", pause);
            carousel.removeEventListener("mouseleave", resume);
            carousel.removeEventListener("touchstart", pause);
            carousel.removeEventListener("touchend", resume);
        };
    }, []);

    return (
        <section className="w-full py-5 px-5 md:py-8">
            <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 md:px-8 hide-scrollbar"
            >
                {banners.map((src, i) => (
                    <div
                        key={i}
                        className="flex-none w-[90vw] md:w-[600px] snap-center overflow-hidden rounded-2xl"
                    >
                        <Image
                            src={src}
                            alt={`Banner ${i + 1}`}
                            width={600}
                            height={350}
                            priority={i === 0}
                            className="w-full h-auto object-cover rounded-2xl"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}