import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import LetterBox from '../component/LetterBox'

function About() { // 5:03
  return (
    <div className="border-t border-gray-300 pt-6 flex flex-col gap-4">

      <h2 className="text-xl self-center"><Title text1={'ABOUT'} text2={'US'} /></h2>

      {/* descriptions */}
      <div className="flex flex-col sm:flex-row">
        <div>
          <img src={assets.about_img} alt="" className='w-full h-full sm:h-[80%]' />
        </div>

        {/* text */}
        <div className='flex flex-col gap-4 sm:p-10 pt-6'>
          <p className='font-normal text-sm text-gray-600'>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>

          <p className='font-normal text-sm text-gray-600'>
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>

          <h2 className='font-semibold text-sm'>Our Mission</h2>
           <p className='font-normal text-sm text-gray-600'>
            Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
        </div>
      </div>

      {/* choose us */}
      <div className="flex flex-col mt-7 gap-3">
        <h2 className = 'text-xl'><Title text1 = {'WHY'} text2 = {'CHOOSE US'} /></h2>
        <div className="flex flex-col sm:flex-row ">
          {/* quality assurance */}
          <div className="flex justify-center items-center gap-3 p-10 border border-gray-300">
            <div className='flex flex-col gap-3'>
              <p className = 'font-semibold text-[13px]'>Quality Assurance:</p>
            <p className='font-normal text-[13px] text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
            </div>
            
          </div>

          {/* convenience */}
          <div className="flex justify-center items-center gap-3 p-10 border border-gray-300">
            <div className='flex flex-col gap-3'>
              <p className = 'font-semibold text-[13px]'>Convenience:</p>
            <p className='font-normal text-[13px] text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
            </div>
          </div>

          {/* Exceptional Customer Service */}
           <div className="flex justify-center items-center gap-3 p-10 border border-gray-300">
            <div className='flex flex-col gap-3'>
              <p className = 'font-semibold text-[13px]'>Exceptional Customer Service:</p>
            <p className='font-normal text-[13px] text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
            </div>
          </div>



        </div>
      </div>

      {/* LetterBox */}

      <div className='my-5'>
        <LetterBox />
      </div>


    </div>
  )
}

export default About