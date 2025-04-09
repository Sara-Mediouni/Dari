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

  // Add animation and duplicate items when component mounts
  useEffect(() => {
    addAnimation();
  }, []);

  // Function to duplicate items for infinite scrolling
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate the items to ensure infinite scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      // Set animation properties (direction and speed)
      setAnimationProperties();
      setStart(true);
    }
  }

  // Set the animation properties based on direction and speed
  const setAnimationProperties = () => {
    if (containerRef.current) {
      // Set direction (left or right)
      const animationDirection = direction === "left" ? "forwards" : "reverse";
      containerRef.current.style.setProperty("--animation-direction", animationDirection);

      // Set speed (fast, normal, slow)
      const animationSpeed = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", animationSpeed);
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        "scroller  top-20 relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={{
        // Pause the animation when hovering
        animationPlayState: pauseOnHover ? "paused" : "running"
      }}
    >
      <ul
        ref={scrollerRef}
        className={clsx(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll"
        )}
        style={{
          display: "flex",
          gap: "1rem",
          animation: `scroll ${speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"} linear infinite`,
          flexDirection: direction === "left" ? "row" : "row-reverse",
        }}
      >
        {testimonials.map(({id,quote,name,image}) => (
          <li
            key={id}
            className="relative w-[350px] border-stone300 max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(360deg,#b5c99a,#b5c99a)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#87986a,#87986a)]"
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="bg-green800 border rounded-lg border-2px border-stone300 user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              >

              </div>
              <span className="relative flex items-center justify-center z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                <img src={`${image}`} className="h-[30vh] w-[30vw]"/>
              </span>
              <div className="flex relative items-center justify-center">
             
                
              <span className="flex flex-col gap-1">
                  {/* change text color, font-normal to font-bold, text-xl */}
                  <span className="text-xl font-bold leading-[1.6] text-white">
                    {name}
                  </span>
                  {/* change text color */}
                  <span className=" text-sm leading-[1.6] text-white font-normal">
                    {quote}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
