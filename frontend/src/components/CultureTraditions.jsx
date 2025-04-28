// 📁 src/sections/CultureTraditions.jsx
import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import culture from '../assets/images/tourisme.jpg'
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
    <div className="flex my-10 mx-20 flex-col-reverse lg:flex-row items-center py-24 px-8 bg-green-700">
      <div className="lg:w-1/2 culture-text text-center lg:text-left mx-20">
        <h2 className="text-4xl font-bold mb-6 text-white">Culture & Traditions</h2>
        <p className="text-white ">
          Discover the vibrant culture of Tunisia – from local souks to traditional music, immerse yourself in centuries of heritage and artistry.
        </p>
      </div>
      <div className="lg:w-1/2 culture-img mb-10 lg:mb-0">
        <img
          src={culture} // Replace with your image
          alt="Culture Tunisia"
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default CultureTraditions;