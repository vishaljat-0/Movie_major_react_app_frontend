import React from 'react'
import error from '../utils/404.webp'

const Notfound = () => {
  return (
    <div className='w-screen  h-screen flex justify-center items-center bg-black'>
      <img src={error} alt="error..." />
    </div>
  )
}

export default Notfound