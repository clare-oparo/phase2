import React, { useEffect, useState } from 'react';
import { Box, Flex, VStack, Image, Text, Button } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import useStore from '../store';

function Details() {
  const { wineId } = useParams();
  const [wine, setWine] = useState(null);
  const { addToCart } = useStore();

  useEffect(() => {
    const fetchWineDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/wines/${wineId}`);
        const data = await response.json();
        setWine(data);
      } catch (error) {
        console.error('Error fetching wine details:', error);
      }
    };

    fetchWineDetails();
  }, [wineId]);

  const textColor = useColorModeValue("wine.red", "wine.red"); 

  return (
    <Box pt='90px' maxW="100%" textAlign="center" minH='100vh'>
      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Details
      </Text>
      {wine ? (
        <Flex alignItems='start' justifyContent='space-around'>
          <Box align='start'>
            <Image
              src={wine.url}
              alt={wine.name}
              objectFit="cover"
              borderTopRadius="md"
              height="200px"
            />
            <Button mt={14} mr={[0, 4]} mb={0} onClick={() => addToCart(wine)} w="full" maxW="200px">
              Add To Cart
            </Button>

            <Link to="/">
              <Button mt={5} w="full" maxW="200px"
              colorScheme="wine"
              variant="outline"
              bg='white'
              _hover={{
                bg: "wine.black",
                color: "white",
              }}
              >
                Back to Catalog
              </Button>
            </Link>
          </Box>
          <Box
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            textAlign="left"
            width="700px"
            minHeight="400px"
            mb={4}
            borderWidth="1px"
            borderColor="gray.200"
            transition="all 0.2s"
          >
            <VStack spacing={2} align="start" mt={4} px={4}>
              <Text fontSize="md" mb={1} color={textColor}>
                Name: {wine.name}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Type: {wine.type}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Description: {wine.description}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Food Pairing: {wine.food_pairing}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Region: {wine.region}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Vintage: {wine.vintage}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Producer: {wine.producer}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Alcohol by Volume: {wine.abv}%
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Awards: {wine.awards}
              </Text>
              <Text fontSize="md" mb={1} color={textColor}>
                Availability: {wine.availability}
              </Text>
              <Text fontSize="md" fontWeight="bold" mb={2} color={textColor}>
                ${wine.price}
              </Text>
            </VStack>
          </Box>
        </Flex>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}

export default Details;
