import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

export default function FooterInfo() {
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-30 my-5">
            {/* website info */}
            <div className="flex-2">
                <img src={assets.logo} className='w-25 mb-5' />
                <p className="font-normal text-xs text-gray-400">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when
                    an unknown printer took a galley of type and scrambled it to make a type
                    specimen book.</p>
            </div>

            {/* company */}
            <div className="flex-1 flex flex-col gap-4 sm:p-5">
                <p className="font-semibold text-sm text-gray-600">COMPANY</p>
                <div className="flex flex-col gap-2 text-xs text-gray-400">
                    <Link to="/">Home</Link>
                    <Link to="/about-us" >About us</Link>
                    <Link to="/delivery" >Delivery</Link>
                    <Link to="privacy-policy" >Privacy policy</Link>
                </div>
            </div>

            {/* get in touch */}
            <div className="flex-1 flex flex-col gap-4 sm:p-5">
                <p className="font-semibold text-sm  text-gray-600">GET IN TOUCH</p>
                <div className="flex flex-col gap-2 text-xs text-gray-400">
                    <a href="tel:+977981234567">
                        +977-981234567
                    </a>
                    <a href="mailto:forever@info.com">
                        forever@info.com
                    </a>
                </div>
            </div>
        </div>
    )
}
