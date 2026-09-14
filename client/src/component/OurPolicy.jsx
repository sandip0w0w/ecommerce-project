import React from 'react'
import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-40 items-center text-center my-20 px-10">
        {/* easy exchange */}
        <div className="flex flex-col items-center">
            <img src = {assets.exchange_icon} className='w-8 mb-2' />
            <p className="font-semibold text-[11px]">Easy Exchange Policy</p>
            <p className="font-normal text-[10px] text-gray-400">We offer hassle free exchange policy</p>
        </div>

        {/* return policy */}
        <div className="flex flex-col items-center">
            <img src = {assets.quality_icon} className='w-8 mb-2' />
            <p className="font-semibold text-[11px]">7 Days Return Policy</p>
            <p className="font-normal text-[10px] text-gray-400">We provide 7 days free return policy</p>
        </div>

        {/* customer policy */}
        <div className="flex flex-col items-center">
            <img src = {assets.support_img} className='w-8 mb-2' />
            <p className="font-semibold text-[11px]">Best Customer Support</p>
            <p className="font-normal text-[10px] text-gray-400">We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy