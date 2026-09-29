import React from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useEffect } from 'react';
import { assets } from '../assets/assets';
import formatDate from '../utils/formatDate';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function Orders() {
  const { user, loading } = useAuth();
  const fetchAllOrders = async() => {
    if(!user){
      return null;
    }
    try{
      const response = await api.get('/order/list');
      if(response.data.success){
        return response.data.orders;
      } else {
        toast.error(response.data.message);
      }
    }catch(error){
      toast.error(error.message);
    }

  }

  const statusHandler = async(event, orderId) => {
    if(!user){
      return null
    }
    try{
      console.log(orderId);
      console.log(event.target.value)
      const response = await api.post('/order/status', {orderId, status: event.target.value});

      if(response.data.success){
        await fetchAllOrders();
        toast.success(response.data.message);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  const { data: list = [], isLoading, isError, error} = useQuery({
    queryKey : ['orders'],
    queryFn : fetchAllOrders,

  });

  return (
    <div className="py-5 px-10">
      <p className="font-normal text-sm text-gray-500">Orders Page</p>
      <div className="">
        {isLoading && list.length === 0 ? (
          <div className="">Loading Orders.....</div>
        ) : (
          list.map((order, idx) => (
          <div key = {idx} className="mt-5 border border-gray-400 flex flex-col justify-between sm:flex-row px-3 py-5">
            <img src={assets.parcel_icon} alt="" className = 'w-10 self-start' />
            <div className="flex flex-col gap-1 text-xs text-gray-600">
           {order.items.map((item, item_idx) => (
            <p key = {item_idx} className="font-normal ">{item.name} x {item.quantity} <span>{item.size}</span></p>
            ))}
            <p className = 'font-bold'>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.street}</p>
            <p>{order.address.city},{order.address.country},{order.address.zipcode}</p>
            <p>{order.address.phone}</p>
           </div>

           <div className="flex flex-col gap-1 text-xs text-gray-600">
            <p>Items: {order.items.length}</p>
            <p>Method: {order.paymentMethod}</p>
            <p>Status: {order.payment ? "Paid" : "Pending"}</p>
            <p>Date: {formatDate(order.date)}</p>
           </div>

           <div className="flex flex-col gap-1 text-xs text-gray-600">
            ${order.amount}
           </div>
          
          <div>
            <select onChange = {(event) => statusHandler(event, order._id)} value = {order.status} name="orderStatus" id="" className='border border-gray-300 text-sm p-2 focus:outline-pink-600 focus:outline-1'>
              <option id = "Order Placed" >Order Placed</option>
              <option id = "Packing" >Packing</option>
              <option id = "Shipped" >Shipping</option>
              <option id = "Out for delivery" >Out for delivery</option>
              <option id = "Delivered" >Delivered</option>
            </select> 
          </div>
           
          </div>
        
        ))
        )}
      </div>
    </div>
  )
}

export default Orders