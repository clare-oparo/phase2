import React, { useEffect } from 'react';
import { Box, Flex, Heading, IconButton, Image, Icon, Text, Button } from "@chakra-ui/react";
import { FaCartPlus, FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import useStore from '../store';
import { useColorMode } from '@chakra-ui/react'; // Import useColorMode hook

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = "white"
  const textColor ="wine.red"

  const { cartItems, fetchCartItems, fetchActiveUser, activeUser, logout } = useStore();

  useEffect(() => {
    fetchActiveUser();
    fetchCartItems();
  }, [cartItems]); // Trigger the effect whenever cartItems changes

  const handleLogout = async () => {
    logout(); // Call the logout function from useStore
  };

  return (
    <Box bg={bgColor} boxShadow="sm" py={1} position='fixed' w='100%' zIndex={10}>
      <Flex align="center" justify="space-between" maxW="6xl" mx="auto">

        <Flex alignItems='center'>
        <Image
              src='src/assets/bottle and glass.avif'
              alt='Bootle $ glass icon'
              objectFit="contain"
              height='69px'
            />
         <Heading
          as="h1"
          fontSize={{ base: "xl", md: "5xl" }}
          fontWeight="bold" // Increase the font weight to extrabold
          color={textColor}
          fontFamily="Rancho"
        >
          Corkscrew Connoisseur
        </Heading>

        </Flex>
       

        {/* Navigation Links */}
        <Flex>
          <Box as={Link} to="/" mr={10} fontSize='18px'  color={textColor} _hover={{ textDecoration: "underline" }}>Home</Box>
          <Box as={Link} to="/about" mr={10} fontSize='18px' color={textColor} _hover={{ textDecoration: "underline" }}>About</Box>
          {activeUser ? (
          <>
            <Box as={Link}  mr={10}  fontSize='18px' color={textColor} _hover={{ textDecoration: "underline" }} onClick={handleLogout}>Sign out</Box>
            <Text  fontWeight='bold' fontSize='18px' color={textColor} >{activeUser}</Text>
          </>
        ) : (
          <Box as={Link} to="/login" mr={10}  fontSize='18px' color={textColor} _hover={{ textDecoration: "underline" }}>Login | SignUp</Box>
        )}
        </Flex>

        {/* Color Mode Toggle Button */}
        <Button
          onClick={toggleColorMode} // Toggle color mode on button click
          variant="ghost"
          size="md"
          fontSize="xl"
          color={textColor}
          _hover={{ color: "wine.gold" }}
          leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />} // Show appropriate icon based on current color mode
        >
        </Button>

        {/* Cart Icon */}
        <Flex as={Link} to="/cart" alignItems="center">
          <IconButton
            aria-label="Shopping Cart"
            icon={<Icon as={FaCartPlus} boxSize={7} />} 
            bg="transparent"
            borderStyle='none'
            color={textColor}
            _hover={{ color: "wine.gold" }}
          />
          <Text color='black' ml={1}>{cartItems}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
