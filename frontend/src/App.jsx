import { useState } from 'react'
import './App.css'
import Test from './components/test'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginpage'
import RegisterPage from './pages/registerpage'
import AdminPage from './pages/adminPage'

//import ProductCard from './components/productCard'

function App() {
 
  return (
    <BrowserRouter>
      <div className='w-full h-screen bg-accent text-secondary'>
        <Routes path="/">
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/admin/*' element={<AdminPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
