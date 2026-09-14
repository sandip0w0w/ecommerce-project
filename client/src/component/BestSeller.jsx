import React, { useContext, useEffect, useState } from 'react'
import ProductItems from './ProductItems';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

function BestSeller() {
  const { products, currency } = useContext(ShopContext);
    const [bestSeller, setBestSellers] = useState([]);

    useEffect(() => {
        setBestSellers(products.slice(10,15));
    },[])
  return (
    <div className="flex flex-col my-10">
        <div className="text-center py-7 text-2xl">
            <Title text1 = {"BEST"} text2 = {"SELLER"} />
            <p className = 'font-light text-[10px] text-gray-400 tracking-wide'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum been the.</p>
        </div>
        {/* collections */}
        <ProductItems products={bestSeller} currency={currency} />

    </div>
  )
}


export default BestSeller