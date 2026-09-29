import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const fetchProducts = async () => {
    try{
      const response = await api.get("/product");
      if(response.data?.products){
      return response.data.products || [];
      }
      else {
        Toaster.error(response.data.message);
      }
    }catch(error){
      Toaster.error(error.message);
    }
  }

function List() {

  const queryClient = useQueryClient();

  const { data: list = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.post('/product/remove', { id }),

    onMutate: async (deleteId) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      const previousProducts = queryClient.getQueryData(['products']);

      queryClient.setQueryData(['products'], (old = []) => 
      old.filter((product) => product._id !== deleteId)
    );
    return { previousProducts };
    },

    onError: (err, newTodo, context ) => {
      queryClient.setQueryData(['products'], context.previousProducts);
      toast.error(err.message || 'Failed to delete product');
    },

    onSuccess: () => {
      toast.success('Product Deleted!');
    },

  });

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
      {isLoading && list.length === 0 ? (
        <p className="py-4 text-sm text-gray-500">Loading products...</p>
      ) : (
        list.map((item, idx) => (
        <div key = {idx} className = "grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm">
            <img src={item.image[0]} alt="" className='w-25' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick = {() => deleteMutation.mutate(item._id)} >X</p>
          </div>
      ))
      )}
      
    </div>
  )
}

export default List