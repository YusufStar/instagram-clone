import React, { useContext, useEffect } from 'react'
import meta from "./Images/Meta.png"
import { InstagramContext } from '../App';

function Loading() {
  const {loading,setloading} = useContext(InstagramContext)

  useEffect(() => {
    const timeout = Math.floor(Math.random() * 10) + 3
    setTimeout(() => {
      setloading(false)
    }, timeout*100);
  }, [])

  return (
    <div className='h-screen flex flex-col relative items-center justify-center'>
      <div className="w-full h-full flex items-center justify-center">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/240px-Instagram.svg.png" className='w-12' alt='Instagram'/>
      </div>
      <div className="w-full absolute bottom-5 flex flex-col items-center justify-center">
        <h1 className='font-semibold text-black/50 text-base'>From</h1>
        <img src={meta} className='h-10' alt="Meta" />
      </div>
    </div>
  )
}

export default Loading