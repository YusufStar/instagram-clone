import React, { useContext, useEffect, useState } from 'react'
import bg1 from "./Images/1.png"
import bg2 from "./Images/2.png"
import bg3 from "./Images/3.png"
import instagram from "./Images/logo.png"
import { InstagramContext } from '../App';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, database } from "../database/firebaseConfig"
import { FcGoogle } from "react-icons/fc"
import { ref, set } from 'firebase/database'

function Login() {
  const [count, setcount] = useState(0)
  const [Email, SetEmail] = useState("")
  const [Password, SetPassword] = useState("")
  const [register, setregister] = useState(false)
  const [passtext, setpasstext] = useState(false)
  const {setuser} = useContext(InstagramContext)
  const provider = new GoogleAuthProvider()

  function CreateUser() {
    createUserWithEmailAndPassword(auth, Email, Password)
  .then((userCredential) => {
      set(ref(database, 'users/' + userCredential.user.uid), {
        email: Email
      })
  })
  .catch((error) => {
    console.log(error);
  });
  }

  const googlelogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      setTimeout(() => {
        const {displayName, photoURL, uid, email} = result.user
        setuser(result.user)
        set(ref(database, 'users/' + uid), {
          email: email,
          username: displayName,
          photo: photoURL,
          uid: uid
        })
        setuser(result.user)
      }, 1000);
  })
  .catch((error) => {
    // Handle Errors here.
    console.log(error.code)
  });
  }

  function LoginUser() {
    console.log("username", Email, "Password", Password)
    signInWithEmailAndPassword(auth, Email, Password)
  .then((userCredential) => {
    setuser(userCredential.user)
  })
  .catch((error) => {
    console.log(error);
  });
  }


  useEffect(() => {
    setTimeout(() => {
      switch (count) {
        case 0:
          setcount(1)
          break
        case 1:
          setcount(2)
          break
        case 2:
          setcount(3)
          break
        case 3:
          setcount(0)
          break
        default:
          break
      }
    }, 3000); 
  }, [count])

  function handleSubmit(e) {
    e.preventDefault()
    if(register) {
      CreateUser()
    } else {
      LoginUser()
    }
  }
  

  return (
    <div className='h-screen bg-[#fafafa] overflow-y-visible flex flex-col items-center text-[14px]'>
        <div className="h-[85%] w-[100%] flex flex-row items-center justify-center gap-3">
          {/* Phone */}
          <div className="self-center relative phone-bg bg-[url('https://static.cdninstagram.com/rsrc.php/v3/y4/r/ItTndlZM2n2.png')]">
            <img draggable="false" src={count === 0 ? bg1: count === 1 ? bg2:count === 2 ? bg3:bg1} alt="phoneBG" className='border-none right-5 m-0 p-0 absolute bottom-4 bg-black align-baseline w-[250px] h-[538px]' />
          </div>

          {/* Login Form */}
          <div className="w-[350px] h-[575px] flex flex-col justify-between items-center">
            <form onSubmit={(e) => handleSubmit(e)} className='w-[350px] h-[390px] flex flex-col items-center bg-white border-[1.5px] border-[#dbdbdb]'>
            <img draggable="false" src={instagram} className="mb-10 mt-10" alt="Instagram" />
            <input disabled onChange={(e) => SetEmail(e.target.value)} type="email" required className='outline-none pl-2 login-input w-[70%] h-[35px] bg-[#fafafa] border-[1px] border-[#dbdbdb] rounded-sm mb-1' placeholder='Email address' />
            
            <div className='outline-none relative flex items-center justify-center mt-1 w-[100%] h-[35px]' >
            <input disabled onChange={(e) => SetPassword(e.target.value)} type={passtext ? "text":"password"} required className='outline-none pl-2 login-input w-[70%] h-[35px] bg-[#fafafa] border-[1px] border-[#dbdbdb] rounded-sm' placeholder='Password' />
            <h1 onClick={() => setpasstext(!passtext)} className='absolute cursor-pointer right-16 text-xs text-[#000]/70'>{passtext ? "Hide":"Show"}</h1>
            </div>

            <input disabled type="submit" className='login-input bg-[#0095f6] w-[70%] mt-2 rounded-[5px] text-white cursor-pointer h-[30px] transition-all duration-300 disabled:opacity-50 disabled:cursor-default' value={register ? "Register":"Log in"}/>
            <div className="w-[70%] relative h-[25px] border-b-[1px] border-b-[#dbdbdb]">
              <h1 className='absolute top-[4px] p-3 rounded-full bg-white flex items-center justify-center text-[#969695] font-bold text-xs left-[40%]'>OR</h1>
            </div>
            <p className='mt-5 hover:underline text-black/70 cursor-pointer'>Forgotten your password?</p>
              <div onClick={() => googlelogin()} className='cursor-pointer w-[90%] h-[45px] flex items-center hover:shadow-md mt-3 hover:scale-[0.99] shadow-sm font-[700] transition-all duration-75 text-[#828282] border-[1px] border-[#E8E8E8] leading-[19.1px] text-[14px] justify-center rounded-[10px] gap-[13px]'>
                <FcGoogle className='w-[25px] h-[25px]'/> Continue with Google
              </div>
            </form>

            <div className="bg-white w-full h-[70px] flex flex-col items-center justify-center border-[1.5px] border-[#dbdbdb]">
              <p className='text-[13px]'>{register ? "I have an account":"Don't have an account?"} <span onClick={() => setregister(!register)} className='text-[#0095f7] font-semibold cursor-pointer'>{register ? "Log in":"Sign up"}</span></p>
            </div>

            <div className="flex flex-col w-full items-center">
              <h1 className='text-black text-[14px] mt-3'>Get the app.</h1>
              <br />
              <div className="flex flex-row">
                <img draggable="false" alt='Playstore' src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" className='w-32 h-10 rounded cursor-pointer'/>
                <img draggable="false" alt='Microsoft Store' src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" className='w-32 h-10 rounded cursor-pointer'/>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="w-full h-[15%] flex flex-col items-center justify-center">
          <ul className='w-[100%] flex text-[12px] text-black/50 items-center flex-wrap justify-center gap-3'>
            <li className='cursor-pointer hover:underline'>Meta</li>
            <li className='cursor-pointer hover:underline'>About</li>
            <li className='cursor-pointer hover:underline'>Blog</li>
            <li className='cursor-pointer hover:underline'>Jobs</li>
            <li className='cursor-pointer hover:underline'>Help</li>
            <li className='cursor-pointer hover:underline'>API</li>
            <li className='cursor-pointer hover:underline'>Privacy</li>
            <li className='cursor-pointer hover:underline'>Terms</li>
            <li className='cursor-pointer hover:underline'>Top accounts</li>
            <li className='cursor-pointer hover:underline'>Hashtacgs</li>
            <li className='cursor-pointer hover:underline'>Locations</li>
            <li className='cursor-pointer hover:underline'>Instagram Lite</li>
            <li className='cursor-pointer hover:underline'>Contact uploading and non-users</li>
          </ul>
          <div className="flex flex-row gap-3 outline-none mt-5 text-[13px] text-[#8e8e8e]">
          <select className='bg-transparent outline-none'>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
          </select>
          <p className='text-[12px]'>© 2022 Instagram from Meta</p>
          </div>
        </div>
    </div>
  )
}

export default Login