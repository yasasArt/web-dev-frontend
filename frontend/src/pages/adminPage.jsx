import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { LuClipboardList } from "react-icons/lu";
import { LuBoxes } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductsPage from './admin/adminProductsPage';
import AdminAddProductPage from './admin/adminAddProductPage';
import AdminUpdateProductPage from './admin/adminUpdateProductPage';
import AdminOrdersPage from './admin/adminOrders';
import axios from 'axios';
import { useEffect } from 'react';
import AdminUserPage from './admin/adminUserPage';
import AdminReview from './admin/adminReview';


const AdminPage = () => {
  const [user, setUser] = useState(null)

  useEffect(()=> { //backend ekta call krla userge adala wistara tika genna gnnw
    const token = localStorage.getItem  ("token")
    if(token == null) {
      window.location.href = "/"
      return;
    }

    axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    }).then((response) => {
      if(response.data.role?.toLowerCase() == "admin"){ //user admin kenek newai nm home page ekta ywnw.
        setUser(response.data);
      }else{
        window.location.href = "/";
      }
    }).catch(()=> {
      window.location.href = "/";
    })
  },[])
  return (
    <div className='w-full h-full flex bg-secondary'>

      <>
      <div className="w-[300px] bg-black h-full">

        <div className='w-full h-[100px] flex text-white items-center '>
          <img src="/logo.png" alt="logo" className='h-full' />
          <h1 className='text-2xl pl-[30px]'> Admin </h1> {/* pl = padding left */}
        </div>

        <div className='w-full h-[400px] text-white flex flex-col gap-5 text-2xl pl-[20px] pt-[20px]'>
          <Link to="/admin" className='w-full flex items-center h-[50px] gap-[10px]'> <LuClipboardList /> Orders</Link>
          <Link to="/admin/products" className='w-full flex items-center h-[50px] gap-[10px]'> <LuBoxes /> Products</Link>
          <Link to="/admin/users" className='w-full flex items-center h-[50px] gap-[10px]'><FiUsers /> Users</Link>
          <Link to="/admin/reviews" className='w-full flex items-center h-[50px] gap-[10px]'><MdOutlineRateReview /> Reviews</Link>
        </div>

      </div>

      <div className="w-[calc(100%-300px)] h-full border-[10px] bg-accent overflow-y-scroll border-secoundary rounded-2xl text-2xl">
        {/* path eka dnnma one neh */}
         <Routes path="/"> 
              <Route path='/' element={<h1><AdminOrdersPage/></h1>} />
              <Route path='/products' element={<AdminProductsPage/>} />
              <Route path='/add-product' element={<AdminAddProductPage/>} />
              <Route path='/update-product' element={<AdminUpdateProductPage/>} />
              <Route path='/users' element={<AdminUserPage/>} />
              <Route path='/reviews' element={<AdminReview />} />
         </Routes>
      </div>
      </>  

    </div>
  )
}

export default AdminPage