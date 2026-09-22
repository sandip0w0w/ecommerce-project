import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import api from "../api/axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 5;
    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [orderedItems, setOrderedItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
    useEffect(() => {
    fetchProducts();
    },[])

    const addToCart = async(itemId, productSize) => {
        
        if(!productSize){
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][productSize]){
                cartData[itemId][productSize] += 1;
            }
            else {
                cartData[itemId][productSize] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][productSize] = 1;

        }
        setCartItems(cartData);
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

    const updateQuantity = async(itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);
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

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch,
        setShowSearch, cartItems, addToCart, getCartCount,
        updateQuantity, getCartTotal, setCartItems, orderedItems, setOrderedItems, loading

    }

    return (
        <ShopContext.Provider value = {value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;