import React from 'react'
import NavBar from './component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import FooterInfo from './component/FooterInfo'
import Footer from './component/Footer'
import SearchBar from './component/SearchBar'
import ProductDetail from './pages/ProductDetail'
import ScrollToTop from './component/ScrollToTop'
import { ToastContainer, toast } from 'react-toastify';
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'

function App() {
  return (
    <div className = 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <NavBar />
      <SearchBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/collection" element = {<Collections />} />
        <Route path = "/product/:id" element = {<ProductDetail/>} />
        <Route path = "/cart" element = {<Cart />} />
        <Route path = "/place-order" element = {<PlaceOrder />} />

      </Routes>
      <FooterInfo />
      <Footer />
    </div>
  )
 // 1:43
}

export default App