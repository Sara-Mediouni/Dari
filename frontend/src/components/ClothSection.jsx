
import React from "react";

import {assets} from '../assets/assets'




const ClothSection = () => {
  return (
    <section className=" py-16 px-4">
    <div className="max-w-screen-xl mx-auto text-center">
      <h2 className="text-6xl font-bold mb-20 text-white ">Our favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Premier coup de cœur */}
        <div className="bg-white feature p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={assets.coffins} alt="Pâtisserie 1" className="w-full h-64 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Revisited artisanal baskets</h3>
          <p className="text-gray-600">Discover our revisited artisanal baskets, where traditional Tunisian craftsmanship meets modern elegance. Perfect for adding a unique, authentic touch to your everyday life."</p>
        </div>

        {/* Deuxième coup de cœur */}
        <div className="bg-white feature p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={assets.deco} alt="Pâtisserie 2" className="w-full h-64 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Tea-pots</h3>
          <p className="text-gray-600">Rediscover the art of tea with our reimagined teapots. A perfect fusion of Tunisian tradition and contemporary design, they bring a touch of elegance and authenticity to your tea-tasting moments.</p>
        </div>

        {/* Troisième coup de cœur */}
        <div className="bg-white feature p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img src={assets.tableau} alt="Pâtisserie 3" className="w-full h-64 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Our revisited artisanal tables</h3>
          <p className="text-gray-600">Our revisited artisanal tables blend the richness of traditional Tunisian craftsmanship with contemporary design. Each piece, handcrafted with care, brings warmth, authenticity, and character to your interior.</p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ClothSection;
