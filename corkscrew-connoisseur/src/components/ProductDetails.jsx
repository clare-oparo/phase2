import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Button, Text, Image, Badge, VStack, Center, Heading, Container, Grid, GridItem, Stack, IconButton
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ProductDetails = () => {
  const { wineId } = useParams();
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
    <Container maxW="container.lg" py={5}>
      <IconButton
        icon={<ArrowBackIcon />}
        variant="ghost"
        aria-label="Back to Catalog"
        onClick={() => window.history.back()}
        mb={5}
      />
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={10}
      >
        <GridItem>
          <Center>
            <Image src={wine.url} alt={wine.name} boxSize="300px" objectFit="cover" borderRadius="lg" />
          </Center>
        </GridItem>
        <GridItem>
          <VStack align="start" spacing={4}>
            <Heading as="h2" size="xl">{wine.name}</Heading>
            <Text fontSize="2xl" fontWeight="bold">{wine.vintage}</Text>
            <Badge colorScheme="purple">{wine.type}</Badge>
            <Text fontWeight="semibold">{wine.region}</Text>
            <Text>Produced by {wine.producer}</Text>
            <Text fontSize="lg">Price: ${wine.price}</Text>
            <Stack spacing={2}>
              <Text>Description: {wine.description}</Text>
              <Text>Food Pairing: {wine.food_pairing}</Text>
              <Text>ABV: {wine.abv}%</Text>
              <Text>Awards: {wine.awards}</Text>
              <Text>Availability: {wine.availability}</Text>
            </Stack>
            <Button colorScheme="purple" size="lg" variant="solid">Add to Cart</Button>
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
