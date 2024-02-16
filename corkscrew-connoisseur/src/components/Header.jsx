import React, { useEffect } from 'react';
import { Box, Flex, Heading, IconButton, Image, Icon, Text } from "@chakra-ui/react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import useStore from '../store';

function Header() {
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
          <Text ml={1}>{cartItems}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
