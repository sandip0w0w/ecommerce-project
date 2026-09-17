import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { ShopContext } from '../context/ShopContext'

function Orders() {
    const { products, cartItems } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

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
    
    return (
        <div className="border-t border-gray-300 py-18">
            <h2 className='text-xl'><Title text1={'MY'} text2={'ORDERS'} /></h2>
            <div className="flex flex-col">
                {cartData.map((item, idx) => {
                    const productDetail = products.find((product) => product._id === item._id);
                    return (
                        <div key={idx} className="flex flex-col sm:flex-row gap-2 border-t border-b border-gray-300 py-3">
                            <div className='flex-1 flex gap-4'>
                                <img src={productDetail.image[0]} className='w-18' alt="" />
                                <div className='flex flex-col gap-2'>
                                    <p className='font-normal text-sm'>{productDetail.name}</p>
                                    <div className="flex gap-3 text-xs">
                                        <p className='font-light'>${productDetail.price}</p>
                                        <p>{`Quantity: ${item.quantity}`}</p>
                                        <p>{`Size: ${item.size}`}</p>
                                    </div>
                                    <p className='text-xs'>Date: <span className='font-light text-gray-400'>{today}</span> </p>
                                </div>
                            </div>

                            <div className="flex-1 flex items-center justify-between">
                                <div className='flex items-center gap-2'>
                                    <p className='w-2 h-2 rounded-full border border-green-300 bg-green-300'></p>
                                    <p className='text-xs'>Ready to ship</p>
                                </div>
                                <button className='font-normal text-xs border border-gray-300 py-1.5 px-5 rounded'>Track Order</button>
                            </div>

                        </div>
                    );

                }
                )}
            </div>
        </div>
    )
}

export default Orders