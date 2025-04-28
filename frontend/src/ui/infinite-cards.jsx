"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { testimonials } from "../data";

export const InfiniteMovingCards = ({
  direction = "right",
  speed = "slow",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });
      setAnimationProperties();
      setStart(true);
    }
  }, []);

  const setAnimationProperties = () => {
    if (containerRef.current) {
      const animationDirection = direction === "left" ? "forwards" : "reverse";
      containerRef.current.style.setProperty("--animation-direction", animationDirection);

      const animationSpeed = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", animationSpeed);
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative z-20 max-w-7xl mx-auto overflow-hidden py-10",
        "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={clsx(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
          start && "animate-scroll"
        )}
        style={{
          animation: `scroll ${speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"} linear infinite`,
          flexDirection: direction === "left" ? "row" : "row-reverse",
        }}
      >
        {testimonials.map(({ id, quote, name, image }) => (
          <li
            key={id}
            className="relative w-[280px] sm:w-[350px] md:w-[420px] bg-green-700 border border-green-700 rounded-2xl px-6 py-6 text-white shadow-md hover:shadow-lg transition duration-300"
          >
            <div
              aria-hidden="true"
              className="absolute -left-0.5 -top-0.5 z-0 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)] border border-stone-300 rounded-xl bg-pink-3"
            ></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-4">
              <img
                src={image}
                alt={name}
                className="h-32 w-32 object-cover rounded-full border-6 border-pink-2"
              />
              <h4 className="text-lg sm:text-xl font-bold">{name}</h4>
              <p className="text-sm sm:text-base font-normal leading-relaxed">{quote}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
