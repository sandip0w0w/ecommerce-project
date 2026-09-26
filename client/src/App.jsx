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
import Orders from './pages/Orders'
import LoginPage from './pages/LoginPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Verify from './pages/Verify'
import NA from './pages/NA'

function App() { // 9:51
  return (
    <div className = 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-b'>
      <ToastContainer />
      <header className='fixed left-0 top-0 w-full bg-white px-5 z-50'>
      <NavBar />
      <SearchBar />
      </header>
      <ScrollToTop />
      <main className='mt-15'>
      <Routes>
        <Route path = "/login" element = {<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path = "/collection" element = {<Collections />} />
        <Route path = "/product/:id" element = {<ProductDetail/>} />
        <Route path = "/cart" element = {<Cart />} />
        <Route path = "/place-order" element = {<PlaceOrder />} />
        <Route path = "/orders" element = {<Orders />} />
        <Route path =  "/about" element = {<About />} />
        <Route path = "/contact" element = {<Contact />} />
        <Route path = "/verify" element = {<Verify />} />
        <Route path = '*' element = {<NA />} />
      </Routes>
      </main>
      
      <FooterInfo />
      <Footer />
    </div>
  )
 // 1:43
}

export default App