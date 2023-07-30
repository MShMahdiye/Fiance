import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../components/component_css/Home.css'
import { motion as m } from 'framer-motion'

function Home() {

  const elements = require('../content/Images/Elements.png')
  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 1 }}
      className='home-container'>
      <Header />
      <div className='flex justify-center items-center'>
        <div className='xl:grid xl:grid-cols-2 text-[3vw] h-screen sm:flex sm:justify-center sm:items-center'>
          <div className='flex justify-center items-center text-[#3F3D56] overflow-hidden'>
            <m.span animate={{ y: 0 }}
              initial={{ y: "100%" }}
              transition={{ delay: 0.5, duration: 0.5 }}>
              ابزاری مناسب برای مدیریت هزینه ها</m.span></div>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.65 }}
            className='img-home md:block sm:hidden'>
            <img src={elements} />
          </m.div>
        </div>
      </div>
      <Footer />
    </m.div>
  )
}

export default Home