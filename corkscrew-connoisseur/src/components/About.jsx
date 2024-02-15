import React from 'react';
import { Box, Container, Heading, Text, VStack, Image } from '@chakra-ui/react';
import aboutUsImage from "../assets/about-corkscrew-connoisseur.jpg"

const About = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={5} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          About Corkscrew Connoisseur
        </Heading>

        <Image
          borderRadius="lg"
          src="{aboutUsImage}" 
          alt="About Us"
          objectFit="cover"
        />

        <Text fontSize="lg" textAlign="justify">
          Welcome to Corkscrew Connoisseur, your premier destination for exploring and purchasing the world's finest wines. Founded in [Year], our mission has been to connect wine lovers with the best selections from renowned vineyards across the globe. 
        </Text>

        <Text fontSize="lg" textAlign="justify">
          At Corkscrew Connoisseur, we believe in the power of wine to bring people together, enhance meals, and celebrate the moments that matter. Our curated collection ranges from timeless classics to hidden gems, ensuring there's a perfect bottle for every palate and occasion.
        </Text>

        <Text fontSize="lg" textAlign="justify">
          Our team of wine experts is dedicated to sourcing only the highest quality wines. We prioritize sustainability, craftsmanship, and the unique stories behind each bottle. Join us on a journey through the world of wine, where every sip tells a story.
        </Text>

        <Text fontSize="lg" textAlign="justify">
          Thank you for choosing Corkscrew Connoisseur. Whether you're a seasoned aficionado or new to the world of wine, we're here to provide you with an exceptional experience. Cheers to discovering your next favorite wine with us!
        </Text>
      </VStack>
    </Container>
  );
};

export default About;
