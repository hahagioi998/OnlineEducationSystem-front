import React from 'react';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

import HomeNav from '../components/HomeNav';
function Home() {
  return (
    <>
      <HomeNav />
      <HeroSection />
     
      <Footer />
    </>
  );
}

export default Home;