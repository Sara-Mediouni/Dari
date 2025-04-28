"use client";
import React from "react";
import { motion } from "framer-motion";

import image1 from "../assets/images/2378e96fc2923929716cf94ad77902c8.jpg";
import image2 from "../assets/images/cd3c24d68a2f6f27242163ed2765f717.jpg";

const items = [
  {
    title: "Barnous",
    description:
      "The Barnous is a complementary piece worn over the Jebba and other garments. It adds elegance and warmth, perfect for ceremonial events.",
    image: image1,
  },
  {
    title: "Jebba",
    description:
      "The Jebba is a popular traditional male attire in Tunisia, reflecting heritage, craftsmanship and timeless style.",
    image: image2,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ClothSection = () => {
  return (
    <section className="w-full py-20  overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className=" text-4xl font-extrabold text-center  text-white mb-12">
        Discover the timeless elegance of Tunisian traditional attire, where craftsmanship and culture intertwine to create unique pieces that celebrate our rich heritage.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white w-full rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 border-4 border-green-700 overflow-hidden"
            >
              <div className="overflow-hidden w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-green-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-green-700 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClothSection;
