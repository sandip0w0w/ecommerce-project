import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import {LoaderCircle} from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';

function Cart() { 
    const { products, cartItems, currency, updateQuantity, getCartTotal, loading, discount, setDiscount } = useContext(ShopContext);
    const shippingFee = 10;
    const totalCheckout = getCartTotal() > 0 ? (getCartTotal() + shippingFee)  : 0;
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    const [isChecking, setIsChecking] = useState(false);

    const finalTotal = Math.max(0, totalCheckout - discount);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    })
                }
            }
        }
        setCartData(tempData);
    }, [cartItems])

    const handleCouponCode = async(e) => {
        e.preventDefault();
        setIsChecking(true);
        const formElement = e.target;
        const formData = new FormData(formElement);
        formData.append("cartTotal", totalCheckout);
        const data = Object.fromEntries(formData);
        try{
            console.log("inside try");
            const response = await api.post("/coupon/redeem", data);
            console.log("response got");
            console.log(response);
            if(response?.data?.success){
                toast.success(response.data.message);
                const discountValue = Number(response.data.discountValue) || 0;
                setDiscount(discountValue);
            }else {
                toast.error(response.data.message);
            }
        }catch(error){
            toast.error(error.message)
        }finally{
            formElement.reset();
            setIsChecking(false);
        }
    }

    if(loading){
        return(
            <p>
                Loading......
            </p>
        )
    }
    
    return (
        <div className="pt-15">
            <h2 className="text-2xl"><Title text1='YOUR' text2='CART' /></h2>
            <div>
                {
                    cartData.map((item, idx) => {

                        const productData = products.find((product) => product._id === item._id);
                        item.price = productData.price;
                        return (
                            <div key={idx} className='py-4 border-t border-b border-gray-400 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                                <div className="flex items-start gap-6">
                                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>{currency}{productData.price}</p>
                                            <p className="px-2 sm:px-3 sm:py-1  bg-slate-50">{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                            </div>
                        )
                    })
                }
                <div className="flex flex-col sm:flex-row justify-between gap-3 my-20 ">

                    {/* apply discount */}

                    <div className=''>
                    <form onSubmit={handleCouponCode} className='flex flex-col gap-1'>
                        <p><Title text1={"Apply"} text2 = {"Discount"} /></p>
                        <input type="text" name = "code" placeholder='Enter coupon code' className='border border-gray-700 py-1 px-3 text-xs rounded focus:outline-none focus:border-0 focus:ring-2 focus:ring-pink-400' />
                        <button type = "submit" className='bg-green-500 text-white p-1 rounded text-xs w-20 cursor-pointer'>
                            {isChecking ? <LoaderCircle className='animate-spin h-5 w-5' /> : "Check"}</button>
                    </form>
                    </div>


                    {/* checkout option */}
                    <div className='w-full sm:w-100'>
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

                        {discount > 0 && (
                            <div className='flex justify-between border-b border-gray-300 p-2 text-green-600'>
                                <p className='text-xs'>Discount Applied</p>
                                <p className='text-xs'>-{currency}{discount}</p>
                            </div>
                        )}

                        <div className='flex justify-between p-2'>
                            <p className='font-semibold text-xs'>Total</p>
                            <p className='font-semibold text-xs'>{currency}{finalTotal}</p>
                        </div>


                        {/* checkout button */}
                        <div className='flex justify-end'>
                            <button className=" bg-black py-3 px-5 text-white text-xs font-medium mt-4 cursor-pointer" onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart