import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import LetterBox from '../component/LetterBox'

function Contact() { // 5:09
    return (
        <div className="border-t border-gray-300 pt-7 flex flex-col gap-4">
            <h2 className='text-xl self-center'><Title text1={'CONTACT'} text2={'US'} /></h2>
            <div className="flex flex-col sm:flex-row sm:mx-30">
                <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />

                {/* contact info */}
                <div className="flex flex-col gap-4 text-gray-500 py-16 px-6">
                    <p className="font-bold text-[18px]">Our Store</p>
                    <div>
                        <p className="font-normal text-[14px]">54709 Willms Station</p>
                        <p className="font-normal text-[14px]">Suite 350, Washington, USA</p>
                    </div>

                    <div>
                        <p className="font-normal text-[14px]">Tel: (415) 555-0132</p>
                        <p className="font-normal text-[14px]">Email: admin@forever.com</p>
                    </div>

                    <p className="font-bold text-[18px]">Careers at Forever</p>
                    <p className="font-normal text-[14px]">Learn more about our teams and job openings.</p>

                    <button className="font-normal text-[14px] text-black w-30 border border-black p-3 hover:bg-black hover:text-white transition duration-300 ease-in">Explore Jobs</button>




                </div>
            </div>

            {/* LetterBox */}

            <div className='my-5'>
                <LetterBox />
            </div>
        </div>


    )
}

export default Contact