import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext';

function CartCheckout({cartData}) { // 4:04
    const { currency} = useContext(ShopContext);
    const [subTotal, setSubTotal] = useState(0);
    const shippingFee = 10;
    const totalCheckout =  subTotal > 0 ? (subTotal + shippingFee) : 0;
    
    useEffect(() =>{
        setSubTotal(0);
    },[cartData])

    useEffect(() =>{
        cartData.map((item) => {
            setSubTotal((prev) => prev + (item.price * item.quantity))
        })
    },[cartData])

    return (
        <div className="flex justify-end my-20 ">
            <div className='w-full sm:w-100'>
                <h2 className="text-xl"><Title text1={'CART'} text2={'TOTALS'} /></h2>
                {/* subtotal */}
                <div className='flex justify-between border-b border-gray-300 p-2'>
                    <p className='text-xs'>Subtotal</p>
                    <p className = 'text-xs'>{currency}{subTotal}</p>
                </div>

                {/* shipping fee */}
                 <div className='flex justify-between border-b border-gray-300 p-2'>
                    <p className='text-xs'>Shipping Fee</p>
                    <p className = 'text-xs'>{currency}{shippingFee}</p>
                </div>

                {/* total */}
                 <div className='flex justify-between  p-2'>
                    <p className='font-semibold text-xs'>Total</p>
                    <p className = 'font-semibold text-xs'>{currency}{totalCheckout}</p>
                </div>

                {/* checkout button */}
                <div className='flex justify-end'>
                    <button className=" bg-black py-3 px-5 text-white text-xs font-medium mt-4">PROCEED TO CHECKOUT</button>
                </div>
                



            </div>

        </div>
    )
}

export default CartCheckout