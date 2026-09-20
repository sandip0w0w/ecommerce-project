import React from 'react'
import { assets } from '../assets/assets'

function Add() { // 8:13
  return (
    <div className="px-16 py-5">
      <div className=" w-3xs flex flex-col gap-2 border border-green-400">
        <p className='font-normal text-sm text-gray-600'>Upload image</p>
        <div className="flex gap-2">

          <img src={assets.upload_area} alt="" className='w-16'/>
          <img src={assets.upload_area} alt="" className='w-16'/>
          <img src={assets.upload_area} alt="" className='w-16'/>
        </div>
        <p className='font-normal text-sm text-gray-600'>Product name</p>
        <p className='font-normal text-sm text-gray-600'>Product description</p>
        <p className='font-normal text-sm text-gray-600'>Upload image</p>
        <p className='font-normal text-sm text-gray-600'>Product Sizes</p>
      </div>
    </div>
  )
}

export default Add