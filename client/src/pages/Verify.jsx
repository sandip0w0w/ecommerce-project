import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

function Verify() { // 12:45
    const { user } = useAuth();
    const {setCartItems} = useContext(ShopContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId').split('?')[0];

    const verifyPayment = async() => {
        try{

            if(!user){
                return null
            }
            console.log(orderId);
            const response = await api.post('order/verifyPayment', {success, orderId});
            console.log(response);
            if(response.data.success){
                setCartItems({});
                navigate('/orders')
            }
            else {
                navigate('/cart');
                toast.error("Payment Failed! Please try again.", {toastId: 'payment-error-id'});
            }
        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
     verifyPayment();   
    },[user]);

  return (
    <div>Verify</div>
  )
}

export default Verify