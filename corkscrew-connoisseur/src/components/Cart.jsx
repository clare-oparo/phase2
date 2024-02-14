// Cart.jsx
import React from 'react';
import { useCart } from './CartContext';
import { Box, Button, Text } from '@chakra-ui/react';

const Cart = () => {
  const { cartItems, setCartItems, fetchCartItems } = useCart();

  const handleIncrease = (item) => {
    // Increase the quantity of the specified item in the cart
  };

  const handleDecrease = (item) => {
    // Decrease the quantity of the specified item in the cart
  };

  return (
    <Box>
      {cartItems.map((item) => (
        <Box key={item.id}>
          <Text>{item.name}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Button onClick={() => handleIncrease(item)}>Increase</Button>
          <Button onClick={() => handleDecrease(item)}>Decrease</Button>
        </Box>
      ))}
    </Box>
  );
};

export default Cart;
