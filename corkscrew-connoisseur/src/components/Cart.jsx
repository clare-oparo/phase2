import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Box, Button, Text, Image, Flex, VStack, HStack } from '@chakra-ui/react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/cart');
            const cartData = await response.json();
            setCartItems(cartData);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleIncrease = (item) => {
        const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
        if (itemInCart) {
            itemInCart.quantity += 1;
            setCartItems([...cartItems]);
        }
    };

    const handleDecrease = (item) => {
        const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
        if (itemInCart && itemInCart.quantity > 0) {
            itemInCart.quantity -= 1;
            setCartItems([...cartItems]);
        }
    };

    return (
        <Box>
            {cartItems.map((item) => (
                <Flex
                    key={item.id}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="lg"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={4}
                >
                    <Image
                        src={item.url}
                        alt={item.name}
                        boxSize="100px"
                        objectFit="cover"
                        mr={4}
                    />
                    <VStack align="start" flex="1">
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                    </VStack>
                    <HStack>
                        <Button colorScheme="blue" onClick={() => handleIncrease(item)}>Increase</Button>
                        <Button colorScheme="red" onClick={() => handleDecrease(item)}>Decrease</Button>
                    </HStack>
                </Flex>
            ))}
        </Box>
    );
};

export default Cart;