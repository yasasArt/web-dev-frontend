import React from 'react'
import Header from '../components/header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './productPage'
import ProductOverview from './productOverview'
import CartPage from './cart'
import CheckoutPage from './checkOut'
import OrdersPage from './ordersPage'
import HomeContent from './homeContent'
import AboutPage from './aboutPage'
import ContactPage from './contactPage'
import CustomerReview from './customerReview'

const HomePage = () => {
  return (
    <div className='w-full h-full overflow-y-scroll'>
      <Header/>

      <div className="w-full min-h-[calc(100%-100px)]">
        <Routes>
          <Route path='/' element={<HomeContent/>}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/overview/:productID' element={<ProductOverview/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path='/orders' element={<OrdersPage/>}/>
          <Route path='/reviews' element={<CustomerReview/>}/>
          <Route path='/*' element={<h1>Not found</h1>}/>
        </Routes>
      </div>
    </div>
  )
}

export default HomePage
