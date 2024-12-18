import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Screenings from './pages/Screenings/Screenings';
import Contact from './pages/Contact/Contact';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import Reviews from './pages/Reviews/Reviews';
import Confirmed from './pages/Confirmed/Confirmed';
import { useState } from 'react';
import './App.css';

function App() {
  const [overlayCategories, setOverlayCategories] = useState({});

  return (
    <div className="App">
      <Header {...{overlayCategories, setOverlayCategories}} />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/menu" element={<Menu {...{setOverlayCategories, overlayCategories}} />} />
        <Route path="/screenings" element={<Screenings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/confirm" element={<Confirmed />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;