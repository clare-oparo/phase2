import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Image, Badge, SimpleGrid } from '@chakra-ui/react';

const Catalog = () => {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = async () => {
    try {
      const response = await fetch('http://localhost:3000/wines'); 
      const data = await response.json();
      setWines(data);
    } catch (error) {
      console.error('Error fetching wines:', error);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" mt={8} maxW="1200px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Our Wines
      </Text>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={8}>
        {wines.map((wine) => (
          <Box key={wine.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
            <Image src={wine.url} alt={wine.name} />
            <Box p="4">
              <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {wine.type}
                </Badge>
                <Text ml="2" textTransform="uppercase" fontSize="sm" fontWeight="bold" color="teal.800">
                  {wine.region}
                </Text>
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                {wine.name} - {wine.vintage}
              </Box>
              <Text fontSize="sm" mt={2}>
                {wine.description}
              </Text>
              <Text fontSize="sm" mt={2}>
                Price: ${wine.price}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Catalog;
