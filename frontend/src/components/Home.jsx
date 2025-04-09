import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import ClothSection from './ClothSection'
import About from './About'
import Footer from './Footer'

import Cards from "./cards";

const Home = () => {
  return (
    <div> 
      
    <Navbar/>
    <Hero/>
    <Cards/>
    <ClothSection/>
    <About/>
  </div>
  )
}

export default Home