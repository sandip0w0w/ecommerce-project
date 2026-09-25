import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import AllCollections from '../component/AllCollections'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

function Collections() {
    
    const [filterHidden, setFilterHidden] = useState(true);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (e) => {

        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }


    return ( 
        <div className="flex flex-col sm:flex-row py-15 gap-10">
            {/* filters */}
            <div className="flex-1 py-5">
                <div className='flex gap-2 items-center'>
                    <p className="font-normal text-md cursor-pointer">FILTERS</p>
                    <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${filterHidden ? 'rotate-0' : 'rotate-90'}`} onClick={() => setFilterHidden((e) => !e)} />
                </div>
                {/* categories filter */}
                <div className={`border border-gray-400 p-3 mt-5 ${filterHidden ? "hidden" : "block"} sm:block`}>
                    <p className="font-medium text-sm">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700 mt-3">
                        <p className="flex gap-2 items-center">
                            <input type="checkbox" className="w-3" value="Men" onChange={toggleCategory} />
                            Men
                        </p>
                        <p className="flex gap-2 items-center">
                            <input type="checkbox" className="w-3" value="Women" onChange={toggleCategory} />
                            Women
                        </p>

                        <p className="flex gap-2 items-center">
                            <input type="checkbox" className="w-3" value="Kids" onChange={toggleCategory} />
                            Kids
                        </p>
                    </div>
                </div>

                {/* type filter */}
                <div className={`border border-gray-400 p-3 mt-5 ${filterHidden ? "hidden" : "block"} sm:block`}>
                    <p className="font-medium text-sm">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700 mt-3">
                        <p className="flex gap-2 items-center">
                            <input type="checkbox" className="w-3" value="Topwear" onChange={toggleSubCategory} />
                            Topwear
                        </p>

                        <p className="flex gap-2 items-center">
                            <input type="checkbox" className="w-3" value="Bottomwear" onChange={toggleSubCategory} />
                            Bottomwear
                        </p>

                        <p className="flex gap-2 items-center">
                            <input type="checkbox" className="w-3" value="Winterwear" onChange={toggleSubCategory} />
                            Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* collection items */}
            <div className="flex-4 flex flex-col gap-10">

                {/* title and filter */} 
                <div className="flex flex-col sm:flex-row justify-between sm:items-center ">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    <select className='border border-gray-400 text-xs py-2 pl-1 pr-5 outline-none' onChange={(e) => setSortType(e.target.value)}>
                        <option value="relevant">Sort by: Relevent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                {console.log(sortType)}
                {/* items */}
                <AllCollections category = {category} subCategory = {subCategory} sortType = {sortType} />



            </div>

        </div>
    )
}

export default Collections