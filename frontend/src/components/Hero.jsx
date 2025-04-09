
import { TiLocationArrow } from "react-icons/ti";
import {gsap} from "gsap";
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from "gsap/all";
import video from '../assets/videos/Discover_Tunisia.mp4'
import { ColourfulText } from "../ui/colourful-text";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { useContext } from "react";
import { AuthContext } from "../functions/Auth";
gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
    const { user } = useContext(AuthContext);
  const words = `Where Tradition Meets Taste & Style`;

    useGSAP(()=>{
      gsap.set('#video-frame',{ 
        clipPath: 'polygon(14% 0%, 72% 0%, 90% 100%, 0% 100%)',
        borderRadius:'0 0 10% 10%'
      })

      gsap.from('#video-frame',{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        borderRadius:'0 0 0 0',
        ease:'power1.inOut',
        scrollTrigger:{
          trigger:'#video-frame',
          start:'center center',
          end:'bottom center',
          scrub:true,
      }
      })
    })

  return (
    <div className="relative h-dvh w-full overflow-x-hidden">
      
    <div
        id="video-frame"
        className="relative h-full w-full top-0 z-10 overflow-hidden rounded-lg bg-blue-75"
      >
      
       
          <video
            src={video}
            autoPlay
            loop
            muted
            className="absolute h-screen object-cover object-center"
            
          />
          <div className="absolute font-Rangile left-20 top-60 text-green700 text-8xl font-bold h-screen w-[50%] ">
         <h1 className=""><TextGenerateEffect duration={0.2} filter={false} words={words} /></h1></div>
  
   </div>
 
    </div>
    
   
  )
}

export default Hero