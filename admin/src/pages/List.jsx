import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactPaginatePkg from "react-paginate";
const ReactPaginate = ReactPaginatePkg.default || ReactPaginatePkg;


const fetchProducts = async ({ queryKey }) => {

  const [_, page] = queryKey
  const limit = 6;
    try{
      const response = await api.get(`/product?page=${page}&limit=${limit}`);
      if(response.data?.products){
        const pagesInfo = response.data?.pagination;
        const data = response.data?.products;
      return {data, pagesInfo};
      }
      else {
        Toaster.error(response.data.message);
      }
    }catch(error){
      Toaster.error(error.message);
    }
  }

function List() {

  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data: list = [], isLoading, isError, error } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: fetchProducts,
    placeholderData: (prevData) => prevData ?? { data: [], totalPosts: 0 }
  });

  console.log(list);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

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
    <>
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
        list.data.map((item, idx) => (
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

      {list.pagesInfo ? (
        <div className='flex w-full mt-4'>
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount= {list.pagesInfo.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3} 
        onPageChange={handlePageClick}
        containerClassName={"flex items-center w-full gap-2 my-4 text-sm"}
        activeClassName={"flex justify-center items-center gap-2 my-4 text-sm bg-black text-white"}
        pageClassName={"border px-3 py-1 rounded cursor-pointer hover:bg-gray-100"}
        previousClassName={"border px-3 py-1 rounded cursor-pointer hover:bg-gray-100"}
        nextClassName={"border px-3 py-1 rounded cursor-pointer hover:bg-gray-100"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
      </div>
      ): null}
      
      </>
        
  )
}

export default List