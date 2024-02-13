import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './components/Catalog';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          
          <Route path="/product/:wineId" element={<ProductDetails />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
