import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className='w-full h-full flex bg-secondary'>
      <div className="w-[300px] bg-black h-full">

        <div className='w-full h-[100px] flex text-white items-center '>
          <img src="/logo.png" alt="logo" className='h-full' />
          <h1 className='text-2xl'> Admin </h1>
        </div>

        <div className='w-full h-[400px] text-white flex flex-col gap-5 text-2xl'>
          <Link to="/admin">Orders</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/reviews">Reviews</Link>
        </div>

      </div>

      <div className="w-[calc(100%-300px)] h-full border-[10px] bg-accent overflow-y-scroll border-secoundary rounded-2xl text-2xl">
        {/* path eka dnnma one neh */}
         <Routes path="/"> 
              <Route path='/' element={<h1>Orders</h1>} />
              <Route path='/products' element={<h1>product</h1>} />
              <Route path='/users' element={<h1>users</h1>} />
              <Route path='/reviews' element={<h1>Reviews</h1>} />
         </Routes>
      </div>
      

    </div>
  )
}

export default AdminPage