import React from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const { logout } = useAuth();
  const handleLogOut = async() => {
    try{
      await logout();
    }catch(error){
      console.log(error.message);
    }
      
  }
  return (
    <div className="flex justify-between items-center pb-1 px-[5%]">
        <img className = ' w-23 sm:w-30' src={assets.logo} alt="" />
        <button className="font-normal text-sm bg-gray-600 rounded-xl text-white px-5 py-1" onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default NavBar