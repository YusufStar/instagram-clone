import React, { useContext, useEffect, useState } from 'react'
import { InstagramContext } from '../App';
import instagram from "./Images/logo.png"
import home from "./Images/home.svg"
import search from "./Images/search.svg"
import explore from "./Images/explore.svg"
import messages from "./Images/messages.svg"
import more from "./Images/more.svg"
import notifications from "./Images/notifications.svg"
import add from "./Images/add.svg"
import { database } from '../database/firebaseConfig';
import { child, get, ref, set } from 'firebase/database';

function Home() {
  const [visible, setvisible] = useState(false)
  const [imageLink, setimage] = useState("")
  const {user, data, setdata} = useContext(InstagramContext)
  const [desc, setdesc] = useState("")

  function getData() {
    const dbRef = ref(database);
      get(child(dbRef, `posts/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setdata(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  function post(e) {
    e.preventDefault()
    set(ref(database, 'posts/'), [...data,
      {
        email: user.email,
        image: imageLink,
        desc: desc
      }
    ])
    getData()
  }

  useEffect(() => {
    getData()
  }, [])
  
  
  return (
    <div className={`h-screen relative bg-[#fafafa] flex flex-row items-center ${visible ? "overflow-hidden":"overflow-y-auto"}`}>
      
      {visible ? (
        <form onSubmit={(e) => post(e)} className="fixed bg-black/50 flex items-center flex-col gap-3 justify-center w-full h-screen top-0 left-0">
        <h1 className='text-xl text-white font-semibold'>Create New Post</h1>
        <label id='url'>
          <input className='rounded' onChange={(e) => setimage(e.target.value)} type="text" placeholder='Image Url' required/>
        </label>
        <label id='desc'>
          <input onChange={(e) => setdesc(e.target.value)} className='rounded' type="text" placeholder='Desc' required/>
        </label>
        <div className="flex gap-5">
          <button onClick={() => setvisible(false)} type='button' className='p-2 rounded-lg bg-gray-700 text-white text-semibold'>Cancel</button>
          <button type='submit' className='p-2 rounded-lg bg-gray-700 text-white text-semibold'>Post</button>
        </div>
      </form>
      ):
      null}
      
      {/* Leftbar */}
      <div className={`pt-10 w-[340px] border-r-[1px] flex flex-col border-[#dbdbdb] h-full fixed px-5 bg-white`}>
        <img src={instagram} alt="Instagram" className='h-[33px] mx-2 w-[105px]'/>
        <ul className='flex flex-col mt-10 text-[16px] gap-4 font-[400] mb-auto'>
          <li className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={home} className="group-hover:scale-110 transition-all duration-75" /> Home</li>
          <li className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={search} className="group-hover:scale-110 transition-all duration-75" /> Search</li>
          <li className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={explore} className="group-hover:scale-110 transition-all duration-75" /> Explore</li>
          <li className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={messages} className="group-hover:scale-110 transition-all duration-75" /> Messages</li>
          <li className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={notifications} className="group-hover:scale-110 transition-all duration-75" /> Notifications</li>
          <button type="button" onClick={() => setvisible(true)} data-modal-toggle="authentication-modal" className='flex px-2 w-full items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={add} className="group-hover:scale-110 transition-all duration-75" /> Create</button>
          <li className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src="https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png" className="w-6 h-6 rounded-full group-hover:scale-110 transition-all duration-75"/>Profile</li>
        </ul>
        <h1 className='py-2 px-2 flex items-end justify-start mb-10 gap-4 cursor-pointer w-[95%] rounded-full group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={more} className="group-hover:scale-110 transition-all duration-75"/>More</h1>
      </div>

      {/* Middle */}
      <div className="w-[890px] ml-[40%] h-full flex flex-row items-center justify-between">
        <div className="w-[500px] gap-3 mt-20 flex flex-col h-full">
          {data?.map((post, i) => (
            <div key={i} className="flex flex-col flex-shrink-0 h-auto w-full border-[1px] border-[#8e8e8e] rounded">
            <div className="w-auto h-[60px] flex flex-row items-center px-3">
              <img src='https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png' className="w-8 h-8 rounded-full"/>
              <h1 className='text-sm ml-3 mr-auto'>{post.email}</h1>
              <h1 className='font-bold cursor-pointer tracking-widest text-lg mb-2'>...</h1>
            </div>
            <div className="">
              <img src={post.image} className="w-full"/>
            </div>
            <h1 className='my-3 font-semibold text-md px-3 flex'>{post.desc}</h1>
          </div>
          ))}
          </div>
        <div className="w-[320px] h-full flex flex-col">
          <div className="w-full flex items-center mt-10">
            <img src='https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png' className="w-14 h-14 rounded-full"/>
              <h1 className='ml-3 text-xs text-black font-semibold mr-auto'>{user.email}</h1>
              <h1 className='text-xs text-blue-700 font-semibold cursor-pointer'>Switch</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home