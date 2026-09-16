import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
    const { currency, getCartTotal } = useContext(ShopContext);
    const shippingFee = 10;
    const totalCheckout = getCartTotal() > 0 ? (getCartTotal() + shippingFee) : 0;
    const [paymentType, setPaymentType] = useState('cod');
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col sm:flex-row justify-between gap-10 border-t border-gray-300 py-15">

            {/* delivery info */}
            <div className="">
                <p className="text-2xl"><Title text1={'DELIVERY'} text2={'INFORMATION'} /></p>
                <form className='flex flex-col gap-3'>
                    <div className="flex gap-2">
                        <input className='flex-1 outline-none border border-gray-300 py-1.5.5 px-2 text-sm rounded' type="text" placeholder='First Name' />
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="text" placeholder='Last Name' />
                    </div>
                    <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="text" placeholder='Email' />
                    <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="text" placeholder='Street Address' />
                    <div className="flex gap-2">
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="text" placeholder='City' />
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="text" placeholder='City Code' />
                    </div>
                    <div className="flex gap-2">
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="number" placeholder='Postal Code' />
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="text" placeholder='Country' />
                    </div>
                    <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' type="number" placeholder='Mobile Number' />


                </form>
            </div>

            {/* cart details and payment options */}
            <div className='sm:py-10'>
                <div className='w-full sm:w-120'>
                    <h2 className="text-xl"><Title text1={'CART'} text2={'TOTALS'} /></h2>
                    {/* subtotal */}
                    <div className='flex justify-between border-b border-gray-300 p-2'>
                        <p className='text-xs'>Subtotal</p>
                        <p className='text-xs'>{currency}{getCartTotal()}</p>
                    </div>

                    {/* shipping fee */}
                    <div className='flex justify-between border-b border-gray-300 p-2'>
                        <p className='text-xs'>Shipping Fee</p>
                        <p className='text-xs'>{currency}{shippingFee}</p>
                    </div>

                    {/* total */}
                    <div className='flex justify-between  p-2'>
                        <p className='font-semibold text-xs'>Total</p>
                        <p className='font-semibold text-xs'>{currency}{totalCheckout}</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-10">
                        <h2 className="text-sm"><Title text1 = {'PAYMENT'} text2 = {'METHOD'} /></h2>
                        
                        {/* payment options */}
                        <div className="flex flex-col sm:flex-row justify-between gap-3" >
                            {/* stripe */}
                            <div className="flex border border-gray-300 gap-6 py-1.5 px-3 items-center cursor-pointer" onClick={() => setPaymentType("stripe")} >
                                <p  className={`rounded-full border border-gray-300 w-3 h-3 ${paymentType === 'stripe' ? 'bg-green-400' : null}`}></p>
                                <img src={assets.stripe_logo} className='h-5' alt="" />
                            </div>
                            {/* razorpay */}
                            <div className="flex  border  border-gray-300 gap-6 py-1.5 px-3 items-center cursor-pointer" onClick={() => setPaymentType("razorpay")}>
                                <p  className={`rounded-full border border-gray-300 w-3 h-3 ${paymentType === 'razorpay' ? 'bg-green-400' : null}`}></p>
                                <img src={assets.razorpay_logo} className='h-4' alt="" />
                            </div>
                            {/* COD*/}
                            <div className="flex border  border-gray-300 gap-6 py-1.5 px-3 items-center cursor-pointer" onClick={() => setPaymentType("cod")}>
                                <p  className={`rounded-full border border-gray-300 w-3 h-3 ${paymentType === 'cod' ? 'bg-green-400' : null}`}></p>
                                <p className = 'font-semibold text-gray-400 text-xs px-2'>CASH ON DELIVERY</p>
                            </div>
                        </div>

                    </div>
                    {/* checkout button */}
                    <div className='flex justify-end'>
                        <button className=" bg-black py-3 px-5 text-white text-xs font-medium mt-4 cursor-pointer" onClick={() => navigate("/orders")} >PLACE ORDER</button>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default PlaceOrder