import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider  } from './components/CartContext'; // Import the CartProvider from Header.jsx
import Header from './components/Header';
import Catalog from './components/Catalog';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <CartProvider> {/* Wrap your App with CartProvider */}
      <Router>
        <>
          <Header  />
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/product/:wineId" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </>
      </Router>
    </CartProvider>
  );
}

export default App;
