import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import api from "../api/axios";
import {useAuth} from './AuthContext'

export const ShopContext = createContext();

const ShopContextProvider = (props) => { // 10:20
    const currency = '$';
    const delivery_fee = 5;
    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [orderedItems, setOrderedItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [discount, setDiscount] = useState(0);
    const { user } = useAuth();

    const fetchProducts = async () => {
        try{
            const response = await api.get("/product");
            setProducts(response.data.products);
        }catch(error){
            console.log(error.message);
        }finally{
            setLoading(false);
        }       
    }

    const fetchOrders = async () => {
        try{
            const response = await api.get("/order/items");
            setOrderedItems(response.data.orders);
        }catch(error){
            console.log(error.message);
        } 
    }
   

    const addToCart = async(itemId, size) => {
        
        if(!size){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }
        setCartItems(cartData);
        toast.success("Added to Cart");
        if(user){
            try{
                await api.post('/cart/add', {itemId, size});
            }catch(error){
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                }catch(error){
                    console.log(error.message);
                }
                
            }
        }
        return totalCount;
    }

    const getUserCart = async () => {
        try{
            const response = await api.post('/cart/get', {});
            console.log(response);
            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error){
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const updateQuantity = async(itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(user){
            try{
                await api.post('/cart/update', {itemId, size, quantity});
            }catch(error){
                console.log(error.message);
                toast.error(error.message);
            }
        }
    }

    const getCartTotal = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }catch(error){
                    console.log(error.message);
                }
            }
        }
        return totalAmount;
    }

     useEffect(() => {
    fetchProducts();
    },[])

    useEffect(() => {
        if(user){
            getUserCart();
            fetchOrders();
        }
    },[user])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch,
        setShowSearch, cartItems, addToCart, getCartCount,
        updateQuantity, getCartTotal, setCartItems, orderedItems, setOrderedItems, loading,
        getUserCart,discount, setDiscount

    }

    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;