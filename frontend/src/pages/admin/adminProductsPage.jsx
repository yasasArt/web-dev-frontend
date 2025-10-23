import React from 'react'
import { Link } from 'react-router-dom';
import { BiPlus } from "react-icons/bi";

const AdminProductsPage = () => {
  return (
    <div className='w-full h-full flex justify-center items-center text-6xl relative'>
        adminProductsPage

        <Link to="/admin/add-product"  className= "absolute right-[20px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center text-center text-6xl border-[2px] rounded-full hover:text-accent hover:bg-black text-black border-black"><BiPlus/></Link>
    </div>
  )
}

export default AdminProductsPage