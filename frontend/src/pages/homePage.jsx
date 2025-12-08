import React from 'react'
import Header from '../components/header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './productPage'
import ProductOverview from './productOverview'
import CartPage from './cart'



const HomePage = () => {
  return (
    <div className='w-full f-full overflow-y-scroll max-h-full'>
        <Header/>
        <div className="w-full min-h-[calc(100%-100px)]">
          <Routes>
                <Route path='/' element={<h1>Home Page</h1>}/>
                <Route path='/products' element={<ProductPage/>}/>
                <Route path='/about' element={<h1>About Page</h1>} />
                <Route path='/contact' element={<h1>Contact Page</h1>} />
                <Route path='/overview/:productID' element={<ProductOverview/>} />
                <Route path='/cart' element={<CartPage/>} />
                <Route path='/*' element={<h1>Not found</h1>}/>
          </Routes>
        </div>
    </div>
  )
}

export default HomePage