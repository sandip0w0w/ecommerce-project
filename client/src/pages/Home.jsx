import React, { useContext } from 'react'
import Hero from '../component/Hero'
import LatestCollections from '../component/LatestCollections'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import LetterBox from '../component/LetterBox'
import FooterInfo from '../component/FooterInfo'
import Footer from '../component/Footer'
import { ShopContext } from '../context/ShopContext'

function Home() {
  const { loading } = useContext(ShopContext);
  if(loading){
    return (
      <p>
        Loading......
      </p>
    );
  }
  return (
    <div>
        <Hero />
        <LatestCollections />
        <BestSeller />
        <OurPolicy />
        <LetterBox />
    </div>
  )
}

export default Home