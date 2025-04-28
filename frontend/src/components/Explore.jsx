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
    <section className="py-16">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="!text-6xl sm:text-4xl font-bold mb-8 text-white">Our favorites on Instagram</h2>
      <p className="text-white mb-12 text-lg sm:text-xl">
      Discover our creations shared on Instagram. Follow us for more sweet and artisanal inspiration!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {image.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg group">
            <img
              src={src.name}
              alt={`Instagram ${index + 1}`}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Explore;