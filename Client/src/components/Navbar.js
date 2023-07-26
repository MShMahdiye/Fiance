import React, { useEffect, useState } from 'react'

function Navbar() {
  const [navBarElements, setNavBarElements] = useState(
    [
      {
        name: 'حساب کاربری',
        url: '/dashboard/profileinfo',
        isSelected: false,
      },
      {
        name: 'هزینه',
        url: '/dashboard/hazine',
        isSelected: false,
      },
      {
        name: 'همه هزینه ها',
        url: '/dashboard/allexpenses',
        isSelected: false,
      },
      {
        name: 'برچسب ها',
        url: '/dashboard/tags',
        isSelected: false,
      }
    ]
  )

  useEffect(() => {
    console.log("nv el ====== !!!!!!!!!!!!!!!!!!! ", navBarElements);
  }, [])
  
  return (
    <div className='flex items-center justify-between h-[5vw]'>
      <div className='flex'>
        {
          navBarElements.map(
            (item, i) => {
              return (
                <div className='px-[1vw]'><div className='cursor-pointer' onClick={() => {
                  // let newElements = [...navBarElements]
                  // newElements.map(el => {
                  //   el.isSelected = false
                  //   el[i] = true
                  // })
                  // setNavBarElements([...newElements])
                  // console.log("new elements", newElements);
                  window.location.href = `${item.url}`;
                }}>
                  {item.name}
                </div>
                </div>
              )
            }
          )
        }
      </div>
      <div>
        <div className='cursor-pointer' onClick={() => { window.location.href = '/'; }}>خانه</div>
      </div>
    </div>
  )
}

export default Navbar