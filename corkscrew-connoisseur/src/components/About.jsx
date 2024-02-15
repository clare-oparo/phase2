import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';


const About = () => {
  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={5}>
        <Heading as="h1">About Corkscrew Connoisseur</Heading>
        
        <Text>
          Welcome to Corkscrew Connoisseur, the best place to discover and enjoy the finest wines. Our mission is to bring the world's best wines right to your doorstep, providing detailed knowledge and exceptional customer service.
        </Text>
        <Text>
          Founded by wine lovers, for wine lovers, Corkscrew Connoisseur has been at the forefront of the wine industry since 2024. We pride ourselves on our curated selection, sourced from renowned vineyards across the globe.
        </Text>
        <Text>
          Whether you're a seasoned connoisseur or new to the wine world, we're here to guide you through your wine journey. Explore our collection and find your perfect bottle today.
        </Text>
      </VStack>
    </Container>
  );
};

export default About;
