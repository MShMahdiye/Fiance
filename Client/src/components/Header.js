import { div } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Images/Dollar.png'
import './component_css/Header.css'

function Header() {
  return (
    <div className='header-container flex justify-between px-[1vw] items-center py-[0.5vw]'>
      <div className='text-[1.5rem] text-[#6C63FF] flex'><div className='m-[0.5vw]'><div className='cursor-pointer' onClick={() => {window.location.href = '/login';}}>ورود</div></div><div className='m-[0.5vw]'><div className='cursor-pointer' onClick={() => {window.location.href = '/dashboard';}} >داشبورد</div></div></div>
      <div className='logo-header'><div className='cursor-pointer' onClick={() => {window.location.href = '/';}}><img src={Logo}/></div></div>
    </div>
  )
}

export default Header