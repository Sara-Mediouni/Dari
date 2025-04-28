

import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { assets } from '../assets/assets';
gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  useGSAP(() => {
    gsap.from('.cta', {
      scrollTrigger: {
        trigger: '.cta',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div
    className="cta py-20 text-center text-white bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${assets.handcraft})` }}
  >
    <h2 className="text-4xl font-bold mb-4">Ready to discover Tunisian authenticity?</h2>
    <p className="text-lg mb-8">Plan your next adventure with us and make unforgettable memories.</p>
    <button className="bg-green-900 !text-white font-semibold px-8 py-3 rounded-full hover:bg-green-700 transition duration-300">
      Get Started
    </button>
  </div>
  
  );
};

export default CallToAction;