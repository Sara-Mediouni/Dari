import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import video from "../assets/videos/Discover_Tunisia.mp4";
import { useContext } from "react";
import { AuthContext } from "../functions/Auth";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { user } = useContext(AuthContext);
  const words = `Where Tradition Meets Taste & Style`;

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 100%, 0% 100%)",
      borderRadius: "0 0 10% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative w-full h-screen overflow-hidden">
    {/* VIDEO BACKGROUND */}
    <video
      id="video-frame"
      src={video}
      autoPlay
      loop
      muted
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />
  
    {/* DARK OVERLAY */}
    <div className="absolute top-0 left-0 w-full h-full bg-black/40  z-10" />
  
    {/* TEXT OVER VIDEO */}
    <div className="absolute inset-0 flex items-center justify-center z-20 px-4 sm:px-8 md:px-16 lg:px-24 text-center">
      <h1 className=" text-white font-extrabold leading-tight text-[clamp(2rem,5vw,4.5rem)] drop-shadow-md w-full max-w-5xl mx-auto break-words">
        {words}
      </h1>
    </div>
  </div>
  
  );
};

export default Hero;
