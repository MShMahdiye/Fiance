import React from 'react'
import {pnges} from '../content/constant/PNGs'

function NotFound() {
  return (
    <div className='flex justify-center items-center'>
      {pnges?.notfound}
    </div>
  )
}

export default NotFound