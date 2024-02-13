import React from 'react';
import { Box, Flex, Text, Button, useColorMode, Link, IconButton, Stack } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
      <Flex align="center" mr={5}>
        <Text fontSize="lg" fontWeight="bold">
          Corkscrew Connoisseur
        </Text>
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
        mt={{ base: 4, md: 0 }}
      >
        <Link href="/">Home</Link>
        <Link href="#">Shop</Link>
        <Link href="#">About</Link>
      </Stack>

      <Box display="flex" alignItems="center">
        <Button onClick={toggleColorMode} colorScheme="teal" mr={4}>
          {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
        <IconButton
          icon={<FiShoppingCart />}
          size="lg"
          isRound="true"
          onClick={() => alert('Go to cart')}
          aria-label="Shopping Cart"
          colorScheme="teal"
        />
      </Box>
    </Flex>
  );
};

export default Header;
