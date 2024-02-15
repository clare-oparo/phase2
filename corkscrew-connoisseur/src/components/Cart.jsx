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
            const parsedCartData = cartData.map(item => ({
                ...item,
                quantity: 1 // Initialize quantity for each item
            }));
            setCartItems(parsedCartData);
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
        if (itemInCart) {
            itemInCart.quantity -= 1;
            const updatedCartItems = cartItems.filter(cartItem => cartItem.quantity > 0);
            setCartItems(updatedCartItems);
        }
    };

    // Calculate the total
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <Flex direction="column" align="center">
            <Box width="50%">
                {cartItems.map((item) => (
                    <Flex key={item.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" alignItems="center" justifyContent="space-between" mb={4}>
                        <Image src={item.url} alt={item.name} boxSize="100px" objectFit="cover" mr={4} />
                        <VStack align="start" flex="1">
                            <Text fontWeight="bold">{item.name}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                            <Text>Price: {item.quantity * item.price}</Text>
                        </VStack>
                        <HStack>
                            <Button colorScheme="blue" onClick={() => handleIncrease(item)}>Increase</Button>
                            <Button colorScheme="red" onClick={() => handleDecrease(item)}>Decrease</Button>
                        </HStack>
                    </Flex>
                ))}
            </Box>
            <Box width="50%" mt={5}>
                <Text fontSize="xl">Total: {total}</Text>
                <Button colorScheme="green" mt={5}>Checkout</Button>
            </Box>
        </Flex>
    );
};

export default Cart;
