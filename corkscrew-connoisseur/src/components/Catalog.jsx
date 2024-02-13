import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Image, Badge, SimpleGrid, Button, VStack, Center } from '@chakra-ui/react';
import WineSearch from './WineSearch';
import { InfoIcon, AddIcon } from '@chakra-ui/icons'; // Importing icons for buttons
import { Link } from 'react-router-dom';

const Catalog = () => {
  const [wines, setWines] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredWines = wines.filter(wine =>
    wine.name.toLowerCase().includes(search.toLowerCase())
    ||
    wine.type.toLowerCase().includes(search.toLowerCase())
    ||
    wine.description.toLowerCase().includes(search.toLowerCase())
    ||
    wine.region.toLowerCase().includes(search.toLowerCase()) 
    ||
    wine.producer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <WineSearch search={search} setSearch={setSearch} />

      <Flex direction="column" align="center" justify="center" mt={8} maxW="1200px" mx="auto">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Our Wines
        </Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={8}>
          {filteredWines.map((wine) => (
            <Box key={wine.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" maxW="350px">
              <Center> {/* Center the image */}
                <Image src={wine.url} alt={wine.name} maxH="250px" objectFit="cover" />
              </Center>
              <VStack p="4" spacing={4}>
                <Center> {/* Use Center for badge alignment */}
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {wine.type}
                  </Badge>
                  <Text ml="2" textTransform="uppercase" fontSize="sm" fontWeight="bold" color="teal.800">
                    {wine.region}
                  </Text>
                </Center>
                <Text textAlign="center" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  {wine.name} - {wine.vintage}
                </Text>
                <Text fontSize="sm" textAlign="center">
                  Price: ${wine.price}
                </Text>
                <Flex justifyContent="center" alignItems="center" gap="2">
                  
                  <Button as={Link} to={`/product/${wine.id}`} leftIcon={<InfoIcon />} colorScheme="teal" variant="outline">Read More</Button>
                  <Button leftIcon={<AddIcon />} colorScheme="teal" variant="solid">
                    Add to Cart
                  </Button>
                </Flex>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Catalog;
