import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider  } from './components/CartContext'; // Import the CartProvider from Header.jsx
import Header from './components/Header';
import Catalog from './components/Catalog';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import About from './components/About';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider> 
      <Router>
        <>
          <Header  />
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/product/:wineId" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />

          </Routes>
          <Footer />
        </>
      </Router>
    </CartProvider>
  );
}

export default App;
