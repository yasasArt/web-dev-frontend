import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginpage'
import RegisterPage from './pages/registerpage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
 
  return (
    <BrowserRouter>
     <Toaster position='top-right'/>
      <div className='w-full h-screen bg-accent text-secondary'>
        <Routes>
          <Route path='/*' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/admin/*' element={<AdminPage/>} />
          <Route path='/test' element={<TestPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
