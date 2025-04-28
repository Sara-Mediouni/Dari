
import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

import { assets } from '../assets/assets';

gsap.registerPlugin(ScrollTrigger);

const CultureTraditions = () => {
  useGSAP(() => {
    gsap.from('.culture-text', {
      scrollTrigger: {
        trigger: '.culture-text',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      x: -100,
      duration: 1,
      ease: 'power2.out',
    });
    gsap.from('.culture-img', {
      scrollTrigger: {
        trigger: '.culture-img',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      x: 100,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section className=" py-16 px-4">
    <div className="max-w-screen-xl mx-auto text-center">
      <h2 className="md:text-6xl text-4xl mt-10 mb-20 font-bold text-white ">Why choose Dari?</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Produit 100% artisanaux */}
        <div className="bg-white p-6 feature rounded-lg shadow-lg w-full sm:w-1/3">
          <img src={assets.artisan} alt="Artisan" className="mx-auto mb-4 w-16 h-16" />
          <h3 className="text-xl font-semibold text-green-900 mb-4">100% artisanal products</h3>
          <p className="text-gray-600">Each item is crafted with care and passion, respecting the oldest Tunisian traditions.</p>
</div>

        {/* Livraison rapide */}
        <div className="bg-white p-6 feature rounded-lg shadow-lg w-full sm:w-1/3">
          <img src={assets.delivery} alt="Livraison rapide" className="mx-auto mb-4 w-16 h-16" />
          <h3 className="text-xl font-semibold text-green-900 mb-4">Fast delivery throughout Tunisia</h3>
          <p className="text-gray-600">Receive your products at home, quickly and securely. We are committed to delivering as quickly as possible.</p>
        </div>

        {/* Emballages cadeaux disponibles */}
        <div className="bg-white p-6 feature rounded-lg shadow-lg w-full sm:w-1/3">
          <img src={assets.gift} alt="Emballage cadeau" className="mx-auto mb-4 w-16 h-16" />
          <h3 className="text-xl font-semibold text-green-900 mb-4">Gift wrapping available</h3>
          <p className="text-gray-600">Give in style with our personalized gift packaging, for every special occasion.</p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default CultureTraditions;