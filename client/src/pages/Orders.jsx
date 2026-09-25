import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { ShopContext } from '../context/ShopContext';
import formatDate  from '../utils/formatDate';

function Orders() {
  const { orderedItems, products } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    setCartData(orderedItems || []);
  }, [orderedItems]);
  console.log(cartData);

  return (
    <div className="py-18">
      <h2 className="text-xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </h2>
      <div className="flex flex-col">
        {cartData.flatMap((order, orderIdx) =>
          order.items.map((item, itemIdx) => {
            const productDetail = products.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={`${order._id || orderIdx}-${item._id || itemIdx}`}
                className="flex flex-col sm:flex-row gap-2 border-t border-b border-gray-300 py-3"
              >
                <div className="flex-1 flex gap-4">
                  <img
                    src={productDetail?.image?.[0]}
                    className="w-18"
                    alt={productDetail?.name || 'Product'}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-normal text-sm">
                      {productDetail?.name}
                    </p>
                    <div className="flex gap-3 text-xs">
                      <p className="font-light">
                        ${productDetail?.price}
                      </p>
                      <p>{`Quantity: ${item.quantity}`}</p>
                      <p>{`Size: ${item.size}`}</p>
                    </div>
                    <p className="text-xs">
                      Date:
                      <span className="font-light text-gray-400">
                        {formatDate(order?.date)}
                      </span>
                    </p>
                    <p className="text-xs">
                      Payment: 
                      <span className="font-light text-gray-400">
                        {order?.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="w-2 h-2 rounded-full border border-green-300 bg-green-300"></p>
                    <p className="text-xs">{order.status}</p>
                  </div>
                  <button className="font-normal text-xs border border-gray-300 py-1.5 px-5 rounded">
                    Track Order
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Orders;