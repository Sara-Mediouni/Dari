import { useGSAP } from '@gsap/react'
import React from 'react'
import { gsap } from 'gsap/gsap-core'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from '../ui/AnimatedTitle'
import image from "../assets/images/sidi-bou-said-tunisie.jpg"
gsap.registerPlugin(ScrollTrigger)
const About = () => {
    useGSAP(()=>{
        const clipAnimation=gsap.timeline({
            scrollTrigger:{
                trigger:'#clip',
                start:'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin:true,
                pinSpacing: true,
            }
        })
    
    clipAnimation.to('.mask-clip-path',{
        width:'70vw',
        height:'70vh',
        borderRadius:0

    })})
  return (
    <div id="about" className='min-h-screen w-screen'>
    <div className='font-Rangile relative mb-8 mt-36 flex flex-col items-center gap-5'>
   
    <AnimatedTitle title="Tunisia: Where golden beaches, rich history, and vibrant culture meet." containerClass="mt-5 !text-white text-center !font-Rangile"
   />

    </div>
    <div className='flex h-dvh w-screen' id="clip">
        <div className='mask-clip-path about-image'>
        <img src={image}
            alt="Background"
            className='absolute left-0 top-0 size-full object-cover'
        />
        

        </div>
    </div>
    </div>
  )
}

export default About