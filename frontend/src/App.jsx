import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/homePage';
import RegisterPage from './pages/registerPage';
import AdminPage from './pages/adminPage';
import TestPage from './pages/test.jsx';
import ForgetPasswordPage from './pages/forgetPasswordPage.jsx';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/loginpage.jsx';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user'); // or your auth logic
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId="491094543732-m8sb4v5r6bq6sgcg6qc2fuijsbtqf2l7.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="w-full h-screen bg-accent text-secondary">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login/forgot-password" element={<ForgetPasswordPage />} />
            <Route path="/test" element={<TestPage />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* REDIRECT ANY UNKNOWN ROUTE */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;








// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import HomePage from './pages/homePage'
// import LoginPage from './pages/loginPage'
// import RegisterPage from './pages/registerPage'
// import AdminPage from './pages/adminPage'
// import TestPage from './pages/test.jsx'
// import { Toaster } from 'react-hot-toast'
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import ForgetPasswordPage from './pages/forgetPasswordPage.jsx'




// function App() {
 
//   return (
//     <GoogleOAuthProvider clientId ="491094543732-m8sb4v5r6bq6sgcg6qc2fuijsbtqf2l7.apps.googleusercontent.com">
//     <BrowserRouter>
//      <Toaster position='top-right'/>
//       <div className='w-full h-screen bg-accent text-secondary'>
//         <Routes>
//           <Route path='/*' element={<HomePage/>} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login/forgot-password" element={<ForgetPasswordPage />} />
//           <Route path="/admin/*" element={<AdminPage />} />
//           <Route path="/test" element={<TestPage />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//     </GoogleOAuthProvider>
//   );
// }

// export default App
