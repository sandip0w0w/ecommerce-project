import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import initiatePayment from '../utils/esewa';


function PlaceOrder() {
    const { currency, getCartTotal, cartItems, products, setCartItems } = useContext(ShopContext);
    const shippingFee = 10;
    const totalCheckout = getCartTotal() > 0 ? (getCartTotal() + shippingFee) : 0;
    const [paymentType, setPaymentType] = useState('cod');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        try {

            let orderItems = []

            for (const [productId, sizes] of Object.entries(cartItems)) {
                const product = products.find(p => p._id === productId)
                if (!product) continue

                for (const [size, quantity] of Object.entries(sizes)) {
                    if (quantity > 0) {
                        const itemInfo = structuredClone(product);
                        itemInfo.size = size
                        itemInfo.quantity = quantity
                        orderItems.push(itemInfo)
                    }
                }
            }

            let orderData = {
                address: data,
                items: orderItems,
                amount: totalCheckout,
            }

            let response;
            console.log('inside submit button')
            switch (paymentType) {
                case 'cod':
                    response = await api.post('/order/cod', orderData);
                    if (response.data.success) {
                        setCartItems({})
                        navigate("/orders")
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'esewa':
                    response = await api.post('/order/esewa', orderData);
                    if (response.data.success) {
                        const { esewaData, esewaUrl } = response.data;
                        initiatePayment(esewaData, esewaUrl);
                    } else {
                        toast.error(response.data.message || 'Payment initiation failed');
                    }
                    break;

                case 'stripe':
                    response = await api.post('/order/stripe', orderData);
                    if (response.data.success) {
                        const { session_url } = response.data
                        window.location.replace(session_url);
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error.message);
            toast.error(error.message === 'Request failed with status code 401' ? "Login to place order" : error.message);
        }

    }
    const navigate = useNavigate();

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-10 border-t border-gray-300 py-15">

            {/* delivery info */}
            <div className="">
                <p className="text-2xl"><Title text1={'DELIVERY'} text2={'INFORMATION'} /></p>

                <div className='flex flex-col gap-3'>
                    <div className="flex gap-2">
                        <input className='flex-1 outline-none border border-gray-300 py-1.5.5 px-2 text-sm rounded' name="firstName" type="text" placeholder='First Name' required />
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="lastName" type="text" placeholder='Last Name' required />
                    </div>
                    <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="email" type="text" placeholder='Email' required />
                    <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="street" type="text" placeholder='Street Address' required />
                    <div className="flex gap-2">
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="city" type="text" placeholder='City' required />
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="state" type="text" placeholder='State' required />
                    </div>
                    <div className="flex gap-2">
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="zipcode" type="number" placeholder='Postal Code' required />
                        <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="country" type="text" placeholder='Country' required />
                    </div>
                    <input className='flex-1 outline-none border border-gray-300 py-1.5 px-2 text-sm rounded' name="phone" type="number" placeholder='Mobile Number' required />


                </div>
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
                        <h2 className="text-sm"><Title text1={'PAYMENT'} text2={'METHOD'} /></h2>

                        {/* payment options */}
                        <div className="flex flex-col sm:flex-row justify-between gap-3" >
                            {/* stripe */}
                            <div className="flex border border-gray-300 gap-6 py-1.5 px-3 items-center cursor-pointer" onClick={() => setPaymentType("stripe")} >
                                <p className={`rounded-full border border-gray-300 w-3 h-3 ${paymentType === 'stripe' ? 'bg-green-400' : null}`}></p>
                                <img src={assets.stripe_logo} className='h-5' alt="" />
                            </div>

                            <div className="flex border border-gray-300 gap-6 py-1.5 px-3 items-center cursor-pointer" onClick={() => setPaymentType("esewa")} >
                                <p className={`flex-1 rounded-full border border-gray-300 w-3 h-3 ${paymentType === 'esewa' ? 'bg-green-400' : null}`}></p>
                                <img src={assets.esewa_logo} className='flex-1 h-8 w-full' alt="" />
                            </div>

                            {/* COD*/}
                            <div className="flex border  border-gray-300 gap-6 py-1.5 px-3 items-center cursor-pointer" onClick={() => setPaymentType("cod")}>
                                <p className={`rounded-full border border-gray-300 w-3 h-3 ${paymentType === 'cod' ? 'bg-green-400' : null}`}></p>
                                <p className='font-semibold text-gray-400 text-xs px-2'>CASH ON DELIVERY</p>
                            </div>
                        </div>

                    </div>
                    {/* checkout button */}
                    <div className='flex justify-end'>
                        <button type="submit" className=" bg-black py-3 px-5 text-white text-xs font-medium mt-4 cursor-pointer" >PLACE ORDER</button>
                    </div>


                </div>
            </div>

        </form>
    )
}

export default PlaceOrder