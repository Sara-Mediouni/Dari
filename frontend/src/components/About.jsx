import { useGSAP } from '@gsap/react';
import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import image from "../assets/images/sidi-bou-said-tunisie.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true,
      },
    });

    // Agrandissement de l'image
    tl.to(".about-image", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "power2.inOut",
    });

    // Apparition du texte
    tl.fromTo(
      ".animated-title",
      { x: "100vw", opacity: 0 },
      { x: "0", opacity: 1, ease: "power2.out", duration: 1 },
      "-=0.5"
    );
  }, []);

  return (
    <div id="about" className="relative w-screen h-screen overflow-hidden">
      {/* Texte au milieu, au-dessus de l’image */}
      <div className="animated-title absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <h1 className="text-white font-bold leading-tight lg:text-7xl text-3xl sm:text-4xl">
          Tunisia: Where golden beaches, rich history, and vibrant culture meet.
        </h1>
      </div>

      {/* Image */}
      <div className="about-image relative mx-auto w-[70vw] h-[70vh] overflow-hidden rounded-[40px] transition-all duration-700">
        <img
          src={image}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default About;
