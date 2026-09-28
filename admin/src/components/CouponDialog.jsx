import React from 'react'
import { Button, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { LoaderCircle, SquarePen, TicketPlus, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

function CouponDialog({ item }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            let response;
            const formElement = e.target;
            const formData = new FormData(formElement);
            if(item){
                formData.append("id", item._id);
            }
            const data = Object.fromEntries(formData);
            console.log(data);
            setIsLoading(true);

            if(!item){
                response = await api.post('/coupon/add', data);
            }else {
                response = await api.post("/coupon/update", data);
            }
            
            if(response.data.success){
                
                toast.success(response.data.message);
                setIsOpen(false);
                formElement.reset();
            }else{
                toast.error(response.data.message);
                console.log(response.data.message);
            }

        }catch(error){
            toast.error("Error adding coupons. Please try again!")
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <>  
        {item ?  <SquarePen className='w-4' onClick = {() => setIsOpen(true)} /> :
        <button className='flex gap-1 items-center bg-green-400 px-4 py-1 rounded cursor-pointer' onClick={() => setIsOpen(true)} >
                <TicketPlus className='w-5  text-amber-50' />
                <span className='font-normal text-sm text-amber-50'>Add Coupon</span>
            </button>
            }
            
            <Dialog open={isOpen} className="relative z-10" onClose={() => setIsOpen(false)}>
                <DialogBackdrop className="fixed inset-0 bg-black/30 transition-opacity" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium">
                                Add Coupon
                            </DialogTitle>

                            <form onSubmit={handleFormSubmit}>
                                <div className="px-5 py-2 flex flex-col gap-4">

                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm font-normal text-gray-700'>Code</p>
                                        <input type="text" name="code" defaultValue = {item?.code} className='text-sm border border-gray-400 rounded p-1 focus:outline-none focus:ring-2 focus:ring-pink-400' />
                                    </div>

                                    {/* amounts */}

                                    <div className="flex gap-3">
                                        {/* discount amount */}
                                        <div className='flex-1 flex flex-col gap-2'>
                                            <p className='text-sm font-normal text-gray-700'>Discount Amount</p>
                                            <input type="number" name="discountValue" defaultValue = {item?.discountValue} className='w-full text-sm border border-gray-400 rounded p-1 focus:outline-none focus:ring-2 focus:ring-pink-400' />
                                        </div>

                                        {/* min order amount */}
                                        <div className='flex-1 flex flex-col gap-2'>
                                            <p className='text-sm font-normal text-gray-700'>Min Order Amount</p>
                                            <input type="number" name="minOrderAmount" defaultValue = {item?.minOrderAmount} className='w-full text-sm border border-gray-400 rounded p-1  focus:outline-none focus:ring-2 focus:ring-pink-400' />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm font-normal text-gray-700'>Total Quantity</p>
                                        <input type="number" name="totalQuantity" defaultValue = {item?.totalQuantity} className='text-sm border border-gray-400 rounded p-1 focus:outline-none focus:ring-2 focus:ring-pink-400' />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <p className='text-sm font-normal text-gray-700'>Active Status</p>
                                        <select name="isActive" id="" defaultValue={item?.isActive} className='text-sm border border-gray-400 rounded p-1 focus:outline-none focus:ring-2 focus:ring-pink-400'>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>

                                    {/* dates */}
                                    <div className="flex gap-3">
                                        {/* startDate */}
                                        <div className='flex-1 flex flex-col gap-2'>
                                            <p className='text-sm font-normal text-gray-700'>Start Date</p>
                                            <input type="date" name="startDate" defaultValue ={item?.startDate.split('T')[0]} className='w-full text-sm border border-gray-400 rounded p-1 focus:outline-none focus:ring-2 focus:ring-pink-400' />
                                        </div>

                                        {/* endDate */}
                                        <div className='flex-1 flex flex-col gap-2'>
                                            <p className='text-sm font-normal text-gray-700'>Expiration Date</p>
                                            <input type="date" name="expirationDate" defaultValue ={item?.expirationDate.split('T')[0]} className='w-full text-sm border border-gray-400 rounded p-1  focus:outline-none focus:ring-2 focus:ring-pink-400' />
                                        </div>
                                    </div>

                                    {/* submit button */}
                                    <div className="mt-4">
                                        {isLoading ? <button  className='bg-green-500 text-white px-5 py-1 rounded text-sm font-medium disabled:cursor-not-allowed' disabled ><LoaderCircle className='animate-spin h-5 w-5' /></button>
                                        : 
                                        (item ? <button type="submit" className='bg-green-500 text-white px-3 py-1 rounded text-sm font-medium' >Update</button> :
                                        <button type="submit" className='bg-green-500 text-white px-3 py-1 rounded text-sm font-medium' >Create</button>)
                                        }
                                        
                                    </div>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default CouponDialog