// Header.jsx
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, useColorMode, Link, IconButton, Stack, Heading, Image } from '@chakra-ui/react';
import { FiShoppingCart} from 'react-icons/fi';;
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const [activeUser, setActiveUser] = useState(null);
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
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex alignItems='center'>
          <Heading
            as="h1"
            fontSize={{ base: "xl", md: "3xl" }} // Adjust font size based on screen size
            fontWeight="bold"
            fontFamily='Dancing Script'
          >
            Cockscrew Connoisseur
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
        <Link pr={10} href="#">About</Link>
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
          onClick={() => alert('Go to cart')}
          aria-label="Shopping Cart"
          colorScheme="teal"
        />
          <Text ml={1}>0</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
