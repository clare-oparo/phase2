// src/components/ProductDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Text, Image, Badge, Flex, VStack, Center } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ProductDetails = () => {
  const { wineId } = useParams(); // Assuming each wine has a unique 'id' property
  const [wine, setWine] = useState(null);

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

  if (!wine) return <Text>Loading...</Text>;

  return (
    <VStack spacing={4} align="stretch" m={4}>
      <Button leftIcon={<ArrowBackIcon />} variant="link" onClick={() => window.history.back()}>
        Back to Catalog
      </Button>
      <Center>
        <Image src={wine.url} alt={wine.name} boxSize="300px" objectFit="cover" />
      </Center>
      <Box textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">{wine.name} - {wine.vintage}</Text>
        <Badge colorScheme="teal" m={2}>{wine.type}</Badge>
        <Text>{wine.region}</Text>
        <Text fontSize="lg" m={2}>Price: ${wine.price}</Text>
        <Button colorScheme="teal" variant="solid">Add to Cart</Button>
      </Box>
    </VStack>
  );
};

export default ProductDetails;
