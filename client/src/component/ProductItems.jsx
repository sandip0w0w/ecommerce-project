import React from 'react'
import { Link } from 'react-router-dom'

function ProductItems({products, currency}) { 
  return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,0.8fr))] gap-4 place-content-center">
        {products.map((product) => (
            <Link to = {`/product/${product._id}`} key = {product._id}  className="flex flex-col mb-5 h-80">
                <div className="flex-3 overflow-hidden">
                    <img src = {product.image} className='w-full h-full object-fill hover:scale-110 transition ease-in-out duration-400' />
                </div>
                <div className="flex-1 mt-5">
                    <p className="font-medium text-[11px]">{product.name}</p>
                    <p className="font-medium text-[13px] mt-0.5">{`${currency}${product.price}`}</p>

                </div>
            </Link>
        ))}
        </div>
  )
}

export default ProductItems