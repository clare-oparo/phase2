import React from 'react';
import { Box, Container, Stack, Text, Link, Icon, HStack, Divider, VStack } from '@chakra-ui/react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
  return (
    <Box
      bg='white'
      color='wine.red'
      mt="auto"
      py={{ base: 4, md: 5 }}
    >
      <Container as={Stack} maxW={'6xl'} spacing={4}>
        <Divider borderColor='wine.red' my={4} />

        <VStack spacing={4}>
          
          <HStack spacing={{ base: 3, md: 6 }} justify="center" wrap="wrap">
            <HStack spacing={2}>
              <Icon as={FiMapPin} w={5} h={5} />
              <Text fontSize="sm">123 Vineyard Lane, Wine Country</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FiPhone} w={5} h={5} />
              <Text fontSize="sm">+123 456 7890</Text>
            </HStack>
            <HStack spacing={2}>
              <Icon as={FiMail} w={5} h={5} />
              <Text fontSize="sm">contact@winecountry.com</Text>
            </HStack>
          </HStack>

          <HStack spacing={{ base: 3, md: 6 }} justify="center">
            <Link href="https://facebook.com" isExternal><Icon as={FaFacebookF} w={5} h={5} /></Link>
            <Link href="https://twitter.com" isExternal><Icon as={FaTwitter} w={5} h={5} /></Link>
            <Link href="https://instagram.com" isExternal><Icon as={FaInstagram} w={5} h={5} /></Link>
            <Link href="https://www.tiktok.com" isExternal><Icon as={SiTiktok} w={5} h={5} /></Link>
          </HStack>
        </VStack>

        <Text textAlign="center" fontSize="sm" mt={4}>
          © {new Date().getFullYear()} Corkscrew Connoisseur. All rights reserved.
        </Text>
        <Text textAlign="center" fontSize="sm">
          Designed by Team Connoisseur.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
