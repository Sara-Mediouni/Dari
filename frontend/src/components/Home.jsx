import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import ClothSection from './ClothSection'
import About from './About'
import Footer from './Footer'

import Cards from "./cards";
import Explore from './Explore'
import CultureTraditions from './CultureTraditions'
import CallToAction from './CallToAction'

const Home = () => {
  return (
    <div> 
      
    <Navbar/>
    <Hero/>
    <Cards/>
    <ClothSection/>
    <Explore/><About/>
    <CultureTraditions/>
    
    <CallToAction/>
  </div>
  )
}

export default Home