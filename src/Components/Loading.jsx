import React from 'react'
import Loadinggif from '../utils/Loading.gif'

const Loading = () => {
  return (
    <div className='w-screen  h-screen flex justify-center items-center bg-black'>
      <img src={Loadinggif} alt="Loading..." />
    </div>
  )
}

export default Loading