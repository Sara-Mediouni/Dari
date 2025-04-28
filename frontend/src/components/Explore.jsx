import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import image1 from '../assets/images/10-Top-Rated-Tourist-Attractions-in-Tunisia-1-950x950.webp'
import image2 from '../assets/images/tunisia-2_2.jpg'
import image3 from '../assets/images/images.jpg'
import image4 from '../assets/images/tunisia-travel-guide-inspirational-ideas-planning-trip-tunisia-camel-caraval-sahara.jpg'

gsap.registerPlugin(ScrollTrigger);

const Explore = () => {
 const image=[
    {name:image1},
    {name:image2},
    {name:image3},
    {name:image4}
  ]
  useGSAP(() => {
    gsap.utils.toArray('.explore-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });
  }, []);

  return (
    <div className="py-10  text-green-700 text-center">
      <h2 className="text-3xl font-bold mb-10">Explore Tunisia</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {image.map((i) => (
          <div
            key={i}
            className="explore-card overflow-hidden rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
          >
            <img
              src={`${i.name}`} // Replace with your image paths
              alt={`explore-${i.name}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;