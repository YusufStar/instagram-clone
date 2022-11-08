import React, { useContext, useEffect, useState } from 'react'
import { InstagramContext } from '../App';
import instagram from "./Images/logo.png"
import home from "./Images/home.svg"
import search from "./Images/search.svg"
import explore from "./Images/explore.svg"
import messages from "./Images/messages.svg"
import moresvg from "./Images/more.svg"
import notifications from "./Images/notifications.svg"
import add from "./Images/add.svg"
import { auth, database } from '../database/firebaseConfig';
import { child, get, ref, set } from 'firebase/database';
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import 'flowbite';
import { Modal, Box } from '@material-ui/core';

function Home() {
  const [imageLink, setimage] = useState("")
  const {user, data, setdata, setuser} = useContext(InstagramContext)
  const [desc, setdesc] = useState("")
  const [more, setmore] = useState(false)
  const {displayName, photoURL, uid, email} = user
  const [open, setOpen] = useState(false);
  const [posts, setposts] = useState([]);
  const handleOpen = () => {
    setOpen(true);
    console.log(open)
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  function getData() {
    const dbRef = ref(database);
      get(child(dbRef, `/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setdata(snapshot.val())
          console.log(snapshot.val())
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  function getposts() {
    const dbRef = ref(database);
    get(child(dbRef, `/posts`)).then((snapshot) => {
      if (snapshot.exists()) {
        setposts(snapshot.val())
        console.log(posts)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
   }

  function signout() {
signOut(auth)
  .then(() => {
    setuser(null)
  })
  .catch((error) => {
    // An error happened.
  });
}

  function post(e) {
    e.preventDefault()
    set(ref(database, '/posts'), [...posts,
      {
        username: displayName,
        profile: photoURL,
        email: email,
        image: imageLink,
        desc: desc
      }
    ])
    getposts()
  }


  useEffect(() => {
    getData()
    getposts()
  }, [])
  
  
  return (
    <div className={`h-screen relative bg-[#fafafa] flex flex-row w-full justify-end items-center z-0`}>

      <Modal
        className='flex items-center justify-center'
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className='w-[600px] h-[600px] bg-white rounded-lg flex flex-col gap-3 items-center justify-center'>
          <h1 className='text-2xl font-semibold mb-3'>Create Post</h1>
          <form onSubmit={(e) => post(e)} className='bg-white rounded-lg flex flex-col gap-3 items-center justify-center'>
            <input required onChange={(e) => setimage(e.target.value)} type="text" className='border bg-[#8e8e8e]/20 text-black placeholder:text-black/70 px-3 py-1 rounded outline-none ' placeholder='Enter Image Link'/>
            <input required onChange={(e) => setdesc(e.target.value)} type="text" className='border bg-[#8e8e8e]/20 text-black placeholder:text-black/70 px-3 py-1 rounded outline-none ' placeholder='Enter Description'/>
            <input type="submit" className='p-2 px-5 rounded border bg-[#8e8e8e]/20 cursor-pointer hover:bg-gradient-to-r from-purple-500 to-red-600 transition-all duration-150 hover:scale-95'/>
          </form>
        </Box>
      </Modal>
      
      {/* Leftbar */}
      <div className={`fixed left-0 pt-10 w-[340px] border-r-[1px] flex flex-col border-[#dbdbdb] h-full px-5 bg-white`}>
        <img src={instagram} alt="Instagram" className='h-[33px] mx-2 w-[105px]'/>
        <ul className='flex flex-col mt-10 text-[16px] gap-4 font-[400] mb-auto'>
          <NavLink to="/" className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={home} className="group-hover:scale-110 transition-all duration-75" /> Home</NavLink>
          <NavLink to="/search" className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={search} className="group-hover:scale-110 transition-all duration-75" /> Search</NavLink>
          <NavLink to="/explore" className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={explore} className="group-hover:scale-110 transition-all duration-75" /> Explore</NavLink>
          <NavLink to="/messages" className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={messages} className="group-hover:scale-110 transition-all duration-75" /> Messages</NavLink>
          <NavLink to="/notifications" className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={notifications} className="group-hover:scale-110 transition-all duration-75" /> Notifications</NavLink>
          <button type="button" onClick={() => handleOpen()} className='flex px-2 w-full items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src={add} className="group-hover:scale-110 transition-all duration-75" /> Create</button>
          <NavLink to={`/profile/${uid}`} className='flex w-[95%] px-2 items-center justify-start gap-5 cursor-pointer rounded-full h-12 group hover:bg-[#dbdbdb]/20 transition-all duration-75'><img src="https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png" className="w-6 h-6 rounded-full group-hover:scale-110 transition-all duration-75"/>Profile</NavLink>
        </ul>
        <div onClick={() => setmore(!more)} className='py-2 px-2 flex relative items-end justify-start mb-10 gap-4 cursor-pointer w-[95%] rounded-full group hover:bg-[#dbdbdb]/20 transition-all duration-75'>
          <img src={moresvg} className="group-hover:scale-110 transition-all duration-75"/>
          {more && (
            <div className='z-100 h-[250px] w-[250px] absolute left-0 bottom-full bg-white rounded-xl shadow-2xl'>
              <div onClick={() => signout()} className="h-12 w-full flex items-center px-3 text-sm hover:bg-[#dbdbdb]/50 rounded-t-xl font-semibold border-b-[1px] border-b-black">
                Log Out
              </div>
            </div>
          )}
          More
        </div>
      </div>

      <div className="w-[calc(100%-340px)] flex flex-row justify-center h-full overflow-y-auto">

        {/* Middle */}
        <div className="flex w-[500px] flex-col gap-3 h-full pt-6">

            {posts?.map((post, i) => (
              <div key={i} className='h-auto flex-shrink-0 w-full flex flex-col border-[1px] border-[#8e8e8e]/40 rounded-md gap-2'>
                <div className="w-full h-[55px] flex flex-row items-center px-2 gap-3">
                  <img src={post?.profile} className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col">
                  <h1 className='text-sm text-black/70'>{post?.username}</h1>
                  <h1 className='text-xs text-black/50'>{post?.email}</h1>
                  </div>
                </div>
                  <img src={post?.image} alt={post?.desc} />

                  <p className='px-2 text-sm py-2 text-black/70'><span className='text-black text-md font-semibold'>{post?.username}</span> - {post?.desc}</p>
              </div>
            ))}
        </div>

        {/* Right */}
        <div className="w-[280px] h-[100px] flex flex-col justify-between px-2 mt-3 ml-3">
          <div className="w-full flex items-center py-3 px-2">
            <img src={photoURL} className="w-12 h-12 rounded-full"/>
            <div className="w-auto px-3 h-full mr-auto items-start justify-center flex flex-col">
              <h1 className='text-sm'>{displayName}</h1>
              <h1 className='text-xs text-black/50'>{email}</h1>
            </div>
            <h1 className='text-[#0095F6] text-xs'>Switch</h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home