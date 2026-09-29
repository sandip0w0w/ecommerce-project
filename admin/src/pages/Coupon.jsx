import { SquarePen, TicketPlus } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useEffect } from 'react';
import CouponDialog from '../components/CouponDialog';
import { useQuery } from '@tanstack/react-query';

function Coupon() {
const fetchCoupons = async () => {
    try{
        const response = await api.get("/coupon");
        if(response.data.success){
            return response.data.coupons;
        }else {
            toast.error(response.data.message);
        }
    }catch(error){
        toast.error(error.message);
    }
}

const {data: list = [], isLoading, isError, error } = useQuery({
  queryKey : ['coupons'],
  queryFn: fetchCoupons,
})


  return (
    <div className="flex flex-col gap-3 py-5 px-13">
        <div className = "self-end">
        <CouponDialog isEdit = {false} />
        </div>
      <p className="font-normal text-sm text-color-gray-600">All Coupons List</p>
      <div className="hidden md:grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm place-items-center">
        <p>Code</p>
        <p>Discount Amount</p>
        <p>Min Order Amount</p>
        <p>Total Quantity</p>
        <p>Used Quantity</p>
        <p>Active Status</p>
        <p>Start Date</p>
        <p>Expiry Date</p>
        <p>ACTION</p>
      </div>
      {isLoading && list.length === 0 ? (
        <p className="py-4 text-sm text-gray-500">Loading Coupons...</p>
      ):(
        list.map((item, idx) => (
        <div key = {idx} className = "grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] items-center gap-2 py-1 px-2 border border-gray-200 text-sm place-items-center">
            <p>{item.code}</p>
            <p>${item.discountValue}</p>
            <p>${item.minOrderAmount}</p>
            <p>{item.totalQuantity}</p>
            <p>{item.usedQuantity || 0}</p>
            <p>{item.isActive ? "TRUE": "FALSE"}</p>
            <p>{item.startDate.split('T')[0]}</p>
            <p>{item.expirationDate.split('T')[0]}</p>
            <p className='cursor-pointer' ><CouponDialog item = {item}/></p>    
          </div>
      ))
      )}

    </div>
  )
}

export default Coupon