import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../components/component_css/Home.css'

function Home() {

  const elements = require('../content/Images/Elements.png')
  return (
    <div className='home-container'>
      <Header />
      <div className='flex justify-center items-center'>
        <div className='xl:grid xl:grid-cols-2 text-[3vw] h-screen sm:flex sm:justify-center sm:items-center'>
          <div className='flex justify-center items-center text-[#3F3D56]'>ابزاری مناسب برای مدیریت هزینه ها</div>
          <div className='img-home md:block sm:hidden'>
            <img src={elements} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home