import React from 'react'
import Hero from '../component/Hero'
import LatestCollections from '../component/LatestCollections'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import LetterBox from '../component/LetterBox'
import FooterInfo from '../component/FooterInfo'
import Footer from '../component/Footer'

function Home() {
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