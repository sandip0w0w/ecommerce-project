import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { RefreshCw, Loader2 } from 'lucide-react';

function Verify() {
    // const { user } = useAuth();
    // const {setCartItems} = useContext(ShopContext);
    // const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const success = searchParams.get('success');
    // const orderId = searchParams.get('orderId').split('?')[0];
    const [loading, setLoading] = useState(true);


    // const verifyPayment = async() => {
    //     try{

    //         if(!user){
    //             return null
    //         }
    //         console.log(orderId);
    //         const response = await api.post('order/verifyPayment', {success, orderId});
    //         console.log(response);
    //         if(response.data.success){
    //             setCartItems({});
    //             navigate('/orders')
    //         }
    //         else {
    //             navigate('/cart');
    //             toast.error("Payment Failed! Please try again.", {toastId: 'payment-error-id'});
    //         }
    //     }catch(error){
    //         console.log(error);
    //         toast.error(error.message);
    //     }finally{
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //  verifyPayment();   
    // },[user]);
if(loading){
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
        <RefreshCw className="animate-spin text-blue-500 w-30 h-30" />
        <p className='text-2xl font-bold'>Verifying Payment</p>
    </div>
  )
}
}

export default Verify;