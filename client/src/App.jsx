import React from 'react'
import NavBar from './component/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Collections from './pages/Collections'
import FooterInfo from './component/FooterInfo'
import Footer from './component/Footer'
import SearchBar from './component/SearchBar'

function App() {
  return (
    <div className = 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <NavBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/collection" element = {<Collections />} />
      </Routes>
      <FooterInfo />
      <Footer />
    </div>
  )
 // 1:43
}

export default App