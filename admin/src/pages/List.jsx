import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';

function List() { // 9: 20
  
  const [list, setList] = useState([]);

  const fetchProducts = async () => {
    try{
      const response = await api.get("/product");
      if(response.data?.products){
      setList(response.data.products);
      }
      else {
        Toaster.error(response.data.message);
      }
    }catch(error){
      Toaster.error(error.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [])

  const handleDeleteProduct = async (id) => {
    try{
      console.log(id);
      const response = await api.post("/product/remove", {id});
      if(response.data){
        toast.success('Product Deleted!');
        await fetchProducts();
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-3 py-5 px-13">
      <p className="font-normal text-sm text-color-gray-600">All Products List</p>
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      {list.map((item, idx) => (
        <div key = {idx} className = "grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm">
            <img src={item.image[0]} alt="" className='w-25' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick = {() => handleDeleteProduct(item._id)} >X</p>
         
          </div>
      ))}
    </div>
  )
}

export default List