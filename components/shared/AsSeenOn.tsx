"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { products } from "@/lib/catalog";

export function AsSeenOn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(101);

  const displayItems = Array.from({ length: 40 }).flatMap(() => products.slice(0, 5));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter =
        containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      const items = container.querySelectorAll("[data-index]");

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = Number(item.getAttribute("data-index"));
        }
      });

      setActiveIndex((prev) =>
        prev === closestIndex ? prev : closestIndex
      );
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Center second item initially
    const timer = setTimeout(() => {
      const items = container.querySelectorAll("[data-index]");

      if (items[101]) {
        const target = items[101] as HTMLElement;

        const scrollPos =
          target.offsetLeft -
          container.offsetWidth / 2 +
          target.offsetWidth / 2;

        container.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }
    }, 300);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToItem = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const target = container.querySelector(
      `[data-index="${index}"]`
    ) as HTMLElement;

    if (!target) return;

    const scrollPos =
      target.offsetLeft -
      container.offsetWidth / 2 +
      target.offsetWidth / 2;

    container.scrollTo({
      left: scrollPos,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden border-y border-border bg-ivory py-[56px] md:py-[96px]">
      {/* Heading */}
      <h2 className="mb-[40px] text-center font-sans text-[20px] font-medium tracking-[0.14em] text-ink md:mb-[56px] md:text-[24px]">
        AS SEEN ON
      </h2>

      {/* Slider */}
      <div
        ref={containerRef}
        className="
          flex
          w-full
          items-center
          gap-[16px]
          overflow-x-auto
          scrollbar-none
          snap-x
          snap-mandatory
          md:gap-[24px]
        "
        style={{
          paddingLeft: "calc(50vw - 110px)",
          paddingRight: "calc(50vw - 110px)",
        }}
      >
        {displayItems.map((product, i) => {
          const isActive = i === activeIndex;

          return (
            <div
              key={i}
              data-index={i}
              className="
                flex
                w-[220px]
                shrink-0
                snap-center
                flex-col
                items-center
              "
            >
              {/* Fixed card wrapper */}
              <div
                className="relative h-[380px] w-[220px] cursor-pointer"
                onClick={() => {
                  if (isActive) {
                    window.location.href = `/product/${product.slug}`;
                  } else {
                    scrollToItem(i);
                  }
                }}
              >
                {/* Image scales visually without changing layout width */}
                <div
                  className={`
                    absolute
                    inset-0
                    overflow-hidden
                    rounded-[8px]
                    shadow-sm
                    transition-all
                    duration-500
                    ease-out
                    ${isActive
                      ? "scale-100 opacity-100"
                      : "scale-[0.79] opacity-50"
                    }
                  `}
                >
                  <Image
                    src={product.image || ""}
                    alt={product.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <a
                href={`/product/${product.slug}`}
                className={`
                  mt-[20px]
                  text-center
                  font-sans
                  uppercase
                  tracking-[0.1em]
                  text-ink
                  transition-all
                  duration-500
                  ${isActive
                    ? "translate-y-0 text-[14px] opacity-100"
                    : "translate-y-[-5px] text-[12px] opacity-0"
                  }
                `}
              >
                {product.name}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
