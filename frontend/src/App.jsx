import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginpage'
import RegisterPage from './pages/registerpage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test.jsx'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPasswordPage.jsx'

// 491094543732-m8sb4v5r6bq6sgcg6qc2fuijsbtqf2l7.apps.googleusercontent.com

function App() {
 
  return (
    <GoogleOAuthProvider clientId ="491094543732-m8sb4v5r6bq6sgcg6qc2fuijsbtqf2l7.apps.googleusercontent.com">
    <BrowserRouter>
     <Toaster position='top-right'/>
      <div className='w-full h-screen bg-accent text-secondary'>
        <Routes>
          <Route path='/*' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/admin/*' element={<AdminPage/>} />
          <Route path='/test' element={<TestPage/>} />
          <Route path="/forgot-password" element={<ForgetPasswordPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App
