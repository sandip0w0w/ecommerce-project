import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems';

function LatestCollections() {
    const { products, currency } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,10));
    },[products]);
  return (
    <div className="flex flex-col my-10">
        <div className="text-center py-7 text-2xl">
            <Title text1 = {"LATEST"} text2 = {"COLLECTIONS"} />
            <p className = 'font-light text-[10px] text-gray-400 tracking-wide'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum been the.</p>
        </div>
        {/* collections */}
        <ProductItems products={latestProducts} currency={currency} />

    </div>
  )
}

export default LatestCollections