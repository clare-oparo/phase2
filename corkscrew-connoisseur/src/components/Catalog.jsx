import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Image, Flex, Button, Input, Badge, HStack } from "@chakra-ui/react";
import { InfoIcon, AddIcon } from '@chakra-ui/icons'; 
import { Link } from "react-router-dom";
import useStore from '../store';

function Catalog() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useStore()
  
  useEffect(() => {
    fetch("http://localhost:3000/wines")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const filteredItems = items.filter(item => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return (
      item.type.toLowerCase().includes(searchQueryLowerCase) ||
      item.name.toLowerCase().includes(searchQueryLowerCase) ||
      item.description.toLowerCase().includes(searchQueryLowerCase) ||
      item.region.toLowerCase().includes(searchQueryLowerCase) ||
      item.producer.toLowerCase().includes(searchQueryLowerCase)
    );
  });
  

  return (
    <Flex alignItems='center' justifyContent='center' direction='column' pt='75px'>
      <Box mt={4} maxW="90%" >
        <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center">
          Catalog
        </Text>
        <Flex justifyContent='center' alignItems='center'>
          <Input
            placeholder="Search wines"
            variant="filled"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb={5}
            maxW='95%'
            boxShadow="md"
          />
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center" alignItems="stretch" gap={4} boxShadow='2xl' pb={5} mb={5}>
          {filteredItems.map((item) => (
            <Box
            key={item.id}
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            width="250px"
            minHeight="400px"
            mb={4}
            borderWidth="1px"
            borderColor="gray.200"
            transition="all 0.2s"
              _hover={{
                boxShadow: "lg",
                borderColor: "wine.red",
              }}
            >
              <Image
                src={item.url}
                alt={item.name}
                objectFit="cover"
                borderTopRadius="md"
                maxHeight="200px"
                maxW='160px'
              />
              <VStack spacing={2} align="start" mt={4}>
                <HStack alignItems='start'>
                  <Badge borderRadius="full"  colorScheme="wine">
                    {item.type}
                  </Badge>
                  <Text color="wine.red" isTruncated>
                    {/* Truncate the wine name if it's too long */}
                    {item.name.length > 19 ? item.name.slice(0, 19) + '...' : item.name}
                  </Text>
                </HStack>
                <Text textAlign="left" textTransform="uppercase" fontSize="sm" fontWeight="bold" color="wine.red">
                  {item.region}
                </Text>
                <Text fontSize="md" fontWeight="bold"  color="wine.red">
                  ${item.price}
                </Text>
                <Button
                  as={Link}
                  to={`/product/${item.id}`}
                  leftIcon={<InfoIcon />}
                  colorScheme="wine"
                  variant="outline"
                  size="sm"
                  py={2}
                  px={3}
                  _hover={{
                    bg: "wine.black",
                    color: "white",
                  }}
                >
                  Read More
                </Button>
                <Button
                  onClick={() => addToCart(item)}
                  leftIcon={<AddIcon />}
                  colorScheme="wine"
                  variant="solid"
                  size="sm"
                  py={2}
                  px={3}
                >
                  Add to Cart
                </Button>
              </VStack>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Catalog;
