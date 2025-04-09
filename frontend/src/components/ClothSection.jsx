"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import image1 from '../assets/images/2378e96fc2923929716cf94ad77902c8.jpg'
import image2 from '../assets/images/cd3c24d68a2f6f27242163ed2765f717.jpg'
const ClothSection = () => {
  return (
    <div className="relative flex flex-col-1 gap-8 m-20 top-20 w-[90%] h-[70%] items-center justify-center">
      <BackgroundGradient className="relative rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img
        className="w-full h-[50vh] justify-center items-center flex"
          src={image1}
         
          
          
        />
        <p className="text-base text-bold sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          Barnous
        </p>
 
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        The Barnous is a complementary piece worn over the Jebba and other garments.

This is more popular during the winter season since it’s a long and heavy woolen coat that often features a large hood.

This traditional garb is very similar to a loose yet cozy poncho considering it has no sleeves.

The northern version of the barnous is known as Kachabiya, which showcases some of the distinctive features of Tunisian fashion: the architectural stripes.

Kachabiyas are practically made from the same materials but they differ from the Barnous by their brown and white stripes. 
        </p>
      
      </BackgroundGradient>
      <BackgroundGradient className="relative rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img
        className="w-full h-[50vh] justify-center items-center flex"
          src={image2}
        
          
          
        />
        <p className="text-base text-bold sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
        Jebba
        </p>
 
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        One of the most popular traditional pieces of clothing in Tunisia is the Jebba.

This exclusively male attire is a sleeveless tunic that covers the entire body, except the forearms and lower calf area. In rural areas,

the Jebba is still worn both as a casual and ceremonial garment.

It’s usually paired with a plain shirt and baggy trousers underneath. Nowadays, there is no shortage of fabrics and textiles in wide arrays of colors, patterns, and composition.

However, in the past, the traditional Jebba came in two main colors and textures: white silk in summer and grey wool in winter.
        </p>
      
      </BackgroundGradient>
      
    </div>
  )
}

export default ClothSection