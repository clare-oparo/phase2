import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider  } from './components/CartContext'; 
import Header from './components/Header';
import Catalog from './components/Catalog';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import About from './components/About';
import Cart from './components/Cart';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <CartProvider> 
      <Router>
        <>
          <Header  />
          <Box pt="80px" pb="100px">
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/product/:wineId" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />

            </Routes>
          </Box>
          
          <Footer />
          
        </>
      </Router>
    </CartProvider>
  );
}

export default App;
