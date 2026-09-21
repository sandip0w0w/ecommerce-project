import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
function SideBar() {
  return (
  
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[12px]">
            {/* add items */}
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to = "/add" >
                <img src={assets.add_icon} alt="" className='w-5' />
                <p className='hidden sm:block'>Add items</p>
            </NavLink>

            {/* view items */}
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to = "/list" >
                <img src={assets.order_icon} alt="" className='w-5'/>
                <p className='hidden sm:block'>List Items</p>
            </NavLink>

            {/* orders */}
            <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l" to = "/orders" >
                <img src={assets.order_icon} alt="" className='w-5' />
                <p className='hidden sm:block'>Orders</p>
            </NavLink>


        </div>
        
  )
}

export default SideBar