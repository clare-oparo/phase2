import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Image, Flex, Button, Badge, HStack } from "@chakra-ui/react";
import useStore from '../store';

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0); // State to hold the total cart amount
  const { fetchCartItems, fetchActiveUser, activeUser } = useStore();

  useEffect(() => {
    // Fetch cart items from db.json
    fetch("http://localhost:3000/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart items:", error));

    // Fetch active user when component mounts
    fetchActiveUser();
  }, []);

  useEffect(() => {
    // Calculate cart total whenever cart changes
    const total = cart.reduce((acc, item) => acc + item.total, 0);
    setCartTotal(total);
  }, [cart]);

  const increaseQuantity = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to get item details');
      }
      const item = await response.json();
      const updatedQuantity = (item.quantity || 1) + 1; // Increment quantity by 1
      const totalPrice = item.price * updatedQuantity; // Calculate new total price
      const updateResponse = await fetch(`http://localhost:3000/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: updatedQuantity, total: totalPrice }), // Update quantity and total
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to increase quantity');
      }
      const updatedItem = await updateResponse.json();
      const updatedCart = cart.map(item => item.id === itemId ? updatedItem : item);
      setCart(updatedCart);
      fetchCartItems();
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };
  
  const decreaseQuantity = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to get item details');
      }
      const item = await response.json();
      const updatedQuantity = (item.quantity || 1) - 1; // Decrement quantity by 1
      if (updatedQuantity <= 0) {
        const deleteResponse = await fetch(`http://localhost:3000/cart/${itemId}`, {
          method: 'DELETE',
        });
        if (!deleteResponse.ok) {
          throw new Error('Failed to delete item');
        }
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
      } else {
        const totalPrice = item.price * updatedQuantity; // Calculate new total price
        const updateResponse = await fetch(`http://localhost:3000/cart/${itemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: updatedQuantity, total: totalPrice }), // Update quantity and total
        });
        if (!updateResponse.ok) {
          throw new Error('Failed to decrease quantity');
        }
        const updatedItem = await updateResponse.json();
        const updatedCart = cart.map(item => item.id === itemId ? updatedItem : item);
        setCart(updatedCart);
      }
      fetchCartItems();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (activeUser) {
        window.location.href = '/checkout';
      } else {
        alert('Please log in to proceed to checkout');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error checking active user:', error);
    }
  };
  
  return (
    <Flex alignItems="center" justifyContent="center" direction="column" pt="75px">
      <Box mt={4} maxW="90%" minH='100vh'>
        <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center">
          My Cart
        </Text>
        {cart.length === 0 ? (
          <Text textAlign="center" color="gray.600" fontSize="lg" fontWeight="bold">
            Your cart is empty
          </Text>
        ) : (<>
            <Button
              position='absolute'
              right={0}
              top='10%'
              mr={[0, 4]}
              w="full"
              maxW="150px"
              onClick={handleCheckout} // Add onClick event handler
            >
              CheckOut
            </Button>

          <Flex flexWrap="no-wrap" overflowX="auto" direction="row" gap={4} boxShadow="md" >
            {cart.map((item) => (
              <Box
                key={item.id}
                p={4}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
                width="250px"
                minHeight="400px"
                borderWidth="1px"
                borderColor="gray.200"
                transition="all 0.2s"
                _hover={{
                  boxShadow: "lg",
                  borderColor: "wine.red",
                }}
              >
                <Image
                  src={item.url}
                  alt={item.name}
                  objectFit="cover"
                  borderTopRadius="md"
                  maxHeight="200px"
                  maxW="160px"
                />
                <VStack spacing={2} align="start" mt={4}>
                  <HStack alignItems="start">
                    <Badge borderRadius="full" colorScheme="wine">
                      {item.type}
                    </Badge>
                    <Text color="wine.red" isTruncated>
                      {item.name.length > 19 ? item.name.slice(0, 19) + "..." : item.name}
                    </Text>
                  </HStack>
                  <Text textAlign="left" textTransform="uppercase" fontSize="sm" fontWeight="bold" color="wine.red">
                    {item.region}
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color="wine.red">
                    ${item.price}
                  </Text>
                  <HStack>
                    <Button
                      colorScheme="wine"
                      variant="outline"
                      size="sm"
                      py={2}
                      px={3}
                      _hover={{
                        bg: "wine.black",
                        color: "white",
                      }}
                      onClick={() => increaseQuantity(item.id)}
                    >
                      Add 
                    </Button>
                    <Button
                      colorScheme="wine"
                      variant="outline"
                      size="sm"
                      py={2}
                      px={3}
                      _hover={{
                        bg: "wine.black",
                        color: "white",
                      }}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      Remove
                    </Button>
                  </HStack>
                  <Text color="wine.red" >
                    Quantity : {item.quantity || 1}
                  </Text>
                  <Text fontSize="md" fontWeight="bold" color="wine.red">
                    Total : ${item.total}
                  </Text>
                </VStack>
              </Box>
            ))}
          </Flex>
            </>
            
        )}
        <Text fontSize="xl" fontWeight="bold" mt={3} textAlign="center">
          Cart Total : ${cartTotal}
        </Text>
      </Box>
    </Flex>
  );
}  

export default Cart;
