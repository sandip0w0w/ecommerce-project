import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/axios';
import { Toaster } from 'react-hot-toast';

function List() {
  
  const [list, setList] = useState([]);

  const fetchProducts = async () => {
    try{
      const response = await api.get("/product");
      setList(response.data.products);
    }catch(error){
      Toaster.error(error.message);
    }
  
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div>List</div>
  )
}

export default List