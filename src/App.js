import React, { useEffect, useState } from 'react';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import OneProduct from './components/OneProduct/OneProduct';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import LoginSignup from './components/Authentification/LoginSignup';
import OurStory from './components/OurStory/OurStory';
import UserDashboard from './components/Client/UserDashbord';
import AppAdmin from '../src/Admin/AppAdmin'
import LikedPage from './components/Liked/LikedPage';
import SalePage from './components/Solde/SalePage';
import PackPage from './components/Pack/PackPage';
import './App.css';
import axios from 'axios';

function App() {
  const [product,setProduct]=useState([]) ;

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
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home/>}/><Route/>
        <Route path="/product/:id" element={<OneProduct products={product} />} /><Route/>
        <Route path="/shop" element={<Shop products={product} />} /><Route/>
        <Route path="/cart" element={<Cart />} /><Route/>
        <Route path="/Auth" element={<LoginSignup />} /><Route/>
        <Route path="/About" element={<OurStory />} /><Route/>
        <Route path="/Profile" element={<UserDashboard />} /><Route/>
        <Route path="/solde" element={<SalePage products={product} />} /><Route/>
        <Route path="/packs" element={<PackPage products={product} />} /><Route/>
        <Route path="/likes" element={<LikedPage />} /><Route/>
        <Route path="/admin/*" element={<AppAdmin />} /> {/* Le chemin de base pour le tableau de bord admin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
