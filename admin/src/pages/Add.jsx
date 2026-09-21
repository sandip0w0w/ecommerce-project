import React, { useState } from 'react'
import { assets } from '../assets/assets'
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function Add() { // 9:02

  const { token } = useAuth();
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try{
    const formData = new FormData(e.target);
     formData.append("sizes", JSON.stringify(sizes)); 
     image1 && formData.append("image1", image1);
     image2 && formData.append("image2", image2);
     image3 && formData.append("image3", image3);
     image4 && formData.append("image4", image4);  
    const response = await api.post("/product/add", formData, {headers:{token}});
    if (response.data){
      toast.success(`${formData.get('name')} Added`);
      e.target.reset();
      setSizes([]);
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
    }
    }catch(error){
      console.log(error.message);
    }
  }
  
  return (
    <div className="px-16 py-5">
      <form className="flex flex-col gap-2 px-3" onSubmit={handleAddProduct}>
        <p className='font-normal text-sm text-gray-600'>Upload image</p>
        <div className="flex gap-2">
          <label htmlFor = "image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className='w-20'/>
            <input onChange = {(e) => setImage1(e.target.files[0])} type = "file" id = "image1" hidden />
          </label>

          <label htmlFor = "image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className='w-20'/>
            <input onChange = {(e) => setImage2(e.target.files[0])} type = "file" id = "image2" hidden />
          </label>

          <label htmlFor = "image3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className='w-20'/>
            <input onChange = {(e) => setImage3(e.target.files[0])} type = "file" id = "image3" hidden />
          </label>

          <label htmlFor = "image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className='w-20'/>
            <input onChange = {(e) => setImage4(e.target.files[0])} type = "file" id = "image4" hidden />
          </label>
          
        </div>
        <p className='font-normal text-sm text-gray-600'>Product name</p>
        <input name = "name" type="text" className='font-normal text-sm py-1 px-4 border border-gray-300 focus:outline-pink-600 focus:outline-1 rounded' placeholder='Type Here' />
        <p className='font-normal text-sm text-gray-600'>Product description</p>
        <textarea name = "description"  rows= "4"  className='font-normal text-sm py-1 px-4 border border-gray-300 focus:outline-pink-600 focus:outline-1  rounded' placeholder='Write Content Here' />
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {/* category */}
          <div className="flex flex-col gap-2 shrink-0">
            <p className="font-normal text-sm text-gray-600">Product Category</p>
            <select name="category" className='border border-gray-300 rounded py-1 px-2 text-gray-600  focus:outline-pink-600 focus:outline-1' >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          
          {/* sub category */}
          <div className="flex flex-col gap-2">
            <p className="font-normal text-sm text-gray-600">Sub Category</p>
            <select name="subCategory" className='border border-gray-300 rounded py-1 px-2 text-gray-600  focus:outline-pink-600 focus:outline-1' >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          {/* product price */}
          <div className="flex flex-col gap-2">
            <p className="font-normal text-sm text-gray-600">Product Price</p>
            <input name = "price" type="number" className=' w-full sm:w-30 font-normal text-sm text-gray-600 border border-gray-300 py-1 px-2  rounded  focus:outline-pink-600 focus:outline-1' />
          </div>

        </div>

        <p className='font-normal text-sm text-gray-600'>Product Sizes</p>
        <div className="flex gap-2">

          {['S', 'M', 'L', 'XL', 'XXL'].map((size,idx) => (
            <div key = {idx} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter( item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
        ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <input name = "bestseller" type="checkbox" id = "bestSeller"/>
          <label htmlFor="bestSeller" className = 'cursor-pointer font-normal text-sm text-gray-600'>Add to bestseller</label>
        </div>

        <button type = "submit" className="w-full sm:w-30 bg-black font-normal text-sm text-white p-3 mt-3">ADD</button>
        
      </form>
    </div>
  )
}

export default Add