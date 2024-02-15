import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, useColorMode, Link, IconButton, Stack, Heading, Image } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useCart } from './CartContext'; // Import the useCart hook
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState(null);
  const { cartItems, fetchCartItems } = useCart(); // Use the useCart hook
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/active-user');
        const userData = await response.json();
        setActiveUser(userData[0].username);
      } catch (error) {
        console.error('Error fetching active user:', error);
      }
    };

fetchActiveUser();
fetchCartItems();
  }, []);

  const handleLogout = async () => {
    try {
      // Send DELETE request to sign out
      await fetch('http://localhost:3000/active-user/1', {
        method: 'DELETE',
      });

  // Update active user state
  setActiveUser(null);
} catch (error) {
  console.error('Logout error:', error);
}
  };
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white"
    position='fixed'w='100%'zIndex={10}>
      <Flex alignItems='center'>
          <Heading
            as="h1"
            fontSize={{ base: "xl", md: "3xl" }} // Adjust font size based on screen size
            fontWeight="bold"
            fontFamily='Dancing Script'
          >
            Corkscrew Connoisseur
        </Heading>

    </Flex>

  <Box display={{ base: 'block', md: 'none' }} onClick={() => {}}>
    <IconButton
      icon={<HamburgerIcon />}
      variant="outline"
      aria-label="Open Menu"
    />
  </Box>

  <Stack
    direction={{ base: 'column', md: 'row' }}
    display={{ base: 'none', md: 'flex' }}
    width={{ base: 'full', md: 'auto' }}
    alignItems="center"
    flexGrow={1}
    ml={10}
    mt={{ base: 4, md: 0 }}
    spacing={5}
  >
    <Link href="/">Home</Link>
    <Link as={RouterLink} to="/about" pr={10}>About</Link>
    
    {activeUser ? (
      <>
        <Text>{activeUser}</Text>
        <Link onClick={handleLogout}>Sign out</Link>
      </>
    ) : (
      <Link href="/login">Login | SignUp</Link>
    )}
  </Stack>

  <Box display="flex" alignItems="center">
    <Button onClick={toggleColorMode} colorScheme="teal" mr={4}>
      {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
    <Flex alignItems='center'>
    <IconButton
      icon={<FiShoppingCart />}
      size="lg"
      isRound="true"
      onClick={() => navigate('/cart')}
  aria-label="Shopping Cart"
  colorScheme="teal"
    />
      <Text ml={1}>{cartItems}</Text>
    </Flex>
  </Box>
</Flex>
  );
};

export default Header;