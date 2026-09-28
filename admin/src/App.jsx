import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Coupon from './pages/Coupon'


function App() { 
  return (
    <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/coupons" element={<Coupon />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  );
}

export default App;