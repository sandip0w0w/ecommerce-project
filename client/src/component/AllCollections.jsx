import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems';

function AllCollections({category, subCategory, sortType}) { // 2:30
    const { products, currency, search, showSearch, loading } = useContext(ShopContext);
    const [selectedProducts, setSeletectedProducts] = useState([]);
   const applyFiltersAndSort = () => {
        let productCopy = products.slice();

        // 1. Search Filter
        if (search && showSearch) {
            productCopy = productCopy.filter(item => 
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 2. Category Filter
        if (category && category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category));
        }

        // 3. SubCategory Filter
        if (subCategory && subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }

        // 4. Sorting
        switch (sortType) {
            case 'low-high':
                productCopy.sort((a, b) => a.price - b.price);
                break;
            case 'high-low':
                productCopy.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setSeletectedProducts(productCopy);
    }

    useEffect(() => {
        applyFiltersAndSort();
    }, [products, category, subCategory, search, showSearch, sortType]);

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <ProductItems products={selectedProducts} currency={currency} />
    )
}
export default AllCollections;