import React from 'react'

function Hero() {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400 '>

            {/* hero left */}
            <div className="w-full sm:w-1/2 flex-1 flex items-center justify-center py-8 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]' />
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <p className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-normal text-neutral-800 tracking-tight">
                        Latest Arrivals
                    </p>
                    <div className="flex items-center gap-2">
                        <p className='font-medium text-sm'>SHOP NOW</p>
                        <p className='w-6 md:w-9 h-[1px] bg-[#414141]' />
                    </div>
                </div>
            </div>

            {/* hero right */}
            <div className="w-full sm:w-1/2 flex-1">
                <img src="hero_img.png" alt="" className="w-full h-full object-cover" />
            </div>


        </div>
    );
}

export default Hero