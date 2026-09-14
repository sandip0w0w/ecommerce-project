import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems';

function AllCollections({category, subCategory, sortType}) { // 2:30
    const { products, currency } = useContext(ShopContext);
    const [selectedProducts, setSeletectedProducts] = useState([]);
   
    const applyFilters = () => {
        let productCopy = products.slice();

        if(category.length > 0){
            productCopy = productCopy.filter(item => category.includes(item.category))
        }

        if(subCategory.length > 0){
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }

        setSeletectedProducts(productCopy);
    }

    const sortProducts = () => {
        let fpCopy = selectedProducts.slice();
    
        switch(sortType){
            case 'low-high':
                setSeletectedProducts(fpCopy.sort((a,b) => (a.price - b.price)));
                break;
            case 'high-low':
                setSeletectedProducts(fpCopy.sort((a,b) => (b.price - a.price)));
                break;
            default:
                applyFilters();
                break;
        }
    }

    useEffect(() => {
        applyFilters();
    },[category, subCategory]);

    useEffect(() => {
        sortProducts();
    },[sortType])

    return (
        <ProductItems products={selectedProducts} currency={currency} />


    )
}
export default AllCollections;