import React from 'react'

function Navbar() {
  return (
    <div className='flex items-center justify-between h-[10vw]'>
      <div className='flex'>
        <div className='px-[1vw]'><div className='cursor-pointer' onClick={() => {window.location.href = '/dashboard/profileinfo';}}>حساب کاربری</div></div>
        <div className='px-[1vw]'><div className='cursor-pointer' onClick={() => {window.location.href = '/dashboard/hazine';}}>هزینه</div></div>
        <div className='px-[1vw]'><div className='cursor-pointer' onClick={() => {window.location.href = '/dashboard/allexpenses';}}>همه هزینه ها</div></div>
        <div className='px-[1vw]'><div className='cursor-pointer' onClick={() => {window.location.href = '/dashboard/tags';}}>تگ ها</div></div>
      </div>
      <div>
        <div className='cursor-pointer'  onClick={() => {window.location.href = '/';}}>خانه</div>
      </div>
    </div>
  )
}

export default Navbar