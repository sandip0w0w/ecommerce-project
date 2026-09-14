import React, { useState } from 'react'

import { Search, User, ShoppingBasket } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

function NavBar() {

    const [visible, setVisibile] = useState(false);

    return (
        <div className='flex justify-between items-center py-4'>
            {/* left section */}
            <Link to = "/">
            <img src={'logo.png'} className='w-30' />
            </Link>

            {/* middle section */}
            <div className="hidden sm:flex justify-between gap-5 text-[15px] font-mono">
                {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((options, idx) => (

                    <NavLink key={idx} to={options === "HOME" ? "/" : options.toLocaleLowerCase()} className='flex flex-col items-center gap-1'>
                        <p>{options}</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                    </NavLink>
                ))}
            </div>

            {/* right section */}
            <div className="flex items-center gap-6">
                <img src="search_icon.png" alt="" className="w-4 cursor-pointer" />
                <div className="group relative"
                >
                    <img src="profile_icon.png" alt="" className="w-4 cursor-pointer" />
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 top-full">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>

                <Link to='/cart' className='relative'>
                    <img src="cart_icon.png" alt="" className="w-4 cursor-pointer" />
                    <p className="absolute right-[-5px] bottom-[-6px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[7px]">10</p>

                </Link>
                <img onClick = {() => setVisibile(true)} src="menu_icon.png" alt="" className="w-5 cursor-pointer sm:hidden" />

            </div>

            {/* sidebar for small screen */}
             
             <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick = {() => setVisibile(false)}className="flex items-center gap-4 p-3 cursor-pointer">
                        <img src="dropdown_icon.png" alt="" className="h-4 rotate-180" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick = {() => setVisibile(false)}className = 'py-2 pl-6 border border-gray-400' to='/'>Home</NavLink>
                    <NavLink onClick = {() => setVisibile(false)}className = 'py-2 pl-6 border border-gray-400' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick = {() => setVisibile(false)}className = 'py-2 pl-6 border border-gray-400' to='/about'>ABOUT</NavLink>
                    <NavLink onClick = {() => setVisibile(false)}className = 'py-2 pl-6 border border-gray-400' to='/contact'>CONTACT</NavLink>

                </div>
             </div>

        </div>
    )
}

export default NavBar