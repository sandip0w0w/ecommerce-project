import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../component/Title';
import ProductItems from '../component/ProductItems';

function ProductDetail() { // 3:34
    const { id } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [productSize, setProductSize] = useState('');
    const ratings = () => {
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
    const [relatedProducts, setRelatedProducts] = useState([])
    useEffect(() => {
        setCurrentProduct(products.find(item => item._id === id));
        setRelatedProducts(products.filter(item => (item.name).includes(products.find(item => item._id === id).name)));
    }, [id, products]);

    return currentProduct ? (
        <div className="border-t-2 border-t-gray-300 pt-10">

            {/* product overview */}

            <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">

                {/* product images */}
                <div className='flex flex-col-reverse sm:flex-row gap-4'>
                    <div className='flex sm:flex-col justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        <img src={currentProduct.image} alt="" className=" w-[24%] sm:w-full sm:mb-3 shrink-0" />
                        <img src={currentProduct.image} alt="" className=" w-[24%] sm:w-full sm:mb-3 shrink-0" />
                        <img src={currentProduct.image} alt="" className=" w-[24%] sm:w-full sm:mb-3 shrink-0" />
                        <img src={currentProduct.image} alt="" className=" w-[24%] sm:w-full sm:mb-3 shrink-0" />

                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className='w-full h-auto' src={currentProduct.image} alt="" />
                    </div>
                </div>

                {/* product info */}
                <div>
                    <h1 className='font-semibold text-2xl mt-2'>{currentProduct.name}</h1>
                    <div className="flex gap-1 mt-2">
                        {ratings > 5 ?
                            <>
                                <img src={assets.star_icon} alt="" className='w-3' />
                                <img src={assets.star_icon} alt="" className='w-3' />
                                <img src={assets.star_icon} alt="" className='w-3' />
                                <img src={assets.star_icon} alt="" className='w-3' />
                            </>
                            : <>
                                <img src={assets.star_icon} alt="" className='w-3' />
                                <img src={assets.star_icon} alt="" className='w-3' />
                                <img src={assets.star_icon} alt="" className='w-3' />
                                <img src={assets.star_dull_icon} alt="" className='w-3' />

                            </>
                        }
                    </div>
                    <h1 className="font-semibold text-2xl mt-5">${currentProduct.price}</h1>
                    <p className="font-normal text-sm text-gray-400 mt-5 ">{currentProduct.description}</p>

                    <div className="flex flex-col my-8 gap-2">
                        <p className="font-normal text-sm">Select Size</p>
                        <div className="flex gap-2">
                            {currentProduct.sizes.map((size, idx) => (
                                <button onClick ={() => setProductSize(size)}  className={`border py-1 px-3 bg-gray-200 ${size === productSize ? 'border-amber-500':"border-gray-300"} cursor-pointer`}  key = {idx}>{size}</button>
                            ))}
                        </div>
                    </div>

                    <button className=" bg-black text-white py-2 px-6 text-sm cursor-pointer active:opacity-75 active:scale-105 transition ease-in-out" onClick = {() => addToCart(currentProduct._id, productSize)}>ADD TO CART</button>
                    <div className="mt-5 border-t border-t-gray-300"></div>
                    <div className="mt-4 flex flex-col gap-1 font-base text-xs text-gray-500">
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product</p>
                        <p>Easy return and exchange policy within 7 days</p>
                    </div>
                </div>
            </div>

            {/* descriptions */}
            <div className="mt-20">
                <div className="flex">
                    <p className='font-semibold text-xs border p-3 border-gray-400'>Description</p>
                    <p className='font-normal text-xs border p-3 border-gray-400'>Reviews(122)</p>
                </div>

                <div className="flex flex-col gap-2 p-4 border border-gray-400">
                    <p className="font-normal text-xs text-gray-500 leading-normal">An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                    <p className="font-normal text-xs text-gray-500 leading-normal"> 
                        E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                    </p>
                </div>
            </div>

            {/* related products */}
            
            <div className="my-24">
            <div className="text-center text-2xl"><Title text1 = {'RELATED'} text2 = {'PRODUCTS'} /></div>
            <ProductItems products={relatedProducts.slice(0,6)} currency={currency} />
            </div>  
        </div>
    ) : null
}

export default ProductDetail