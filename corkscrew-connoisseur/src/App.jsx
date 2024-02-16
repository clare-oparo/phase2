import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import theme from "./theme";
import Header from "./components/Header";
import Catalog from "./components/Catalog";
import Details from "./components/Details";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router> 
        <Header />
        <Routes> 
          <Route path="/" element={<Catalog />} /> 
          <Route path="/product/:wineId" element={<Details />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} /> {/* Change component to element */}
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
