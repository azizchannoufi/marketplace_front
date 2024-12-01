import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios'


function ProductList() {

 const [product,setProduct]=useState([]) ;

console.log('hello');


 const getAllProduct=async()=>{
  try{
    const response = await axios.get('http://localhost:3001/api/products');
    if(response.status===200){
      setProduct(response.data)
    }
  }catch(e){
    console.log("error :"+e);
    
  }
 }

 useEffect(()=>{
  getAllProduct()
 },[])


  return (
    <div className="row">
       {product.slice(6,12).map((product) => (
    <div className="col-md-4 mb-4" >
      <ProductCard product={product} />
    </div>
  ))}
    </div>
  );
}

export default ProductList;
