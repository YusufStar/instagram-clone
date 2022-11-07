import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InstagramContext } from '../App';
import Home from "../pages/Home"
import Login from "../pages/Login"
import Loading from "../pages/Loading"

function CustomRouter() {
    const {user, loading} = useContext(InstagramContext)
    
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={loading ? <Loading />:user ? <Home/>:<Login/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default CustomRouter