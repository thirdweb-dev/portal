import {
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/layout";
import { Alert } from "@chakra-ui/react";
import { GeneralCta } from "components/shared/GeneralCta";
import React from "react";

export const GuideCta: React.FC = () => {
  return (
    <Flex
      w="100%"
      bgColor="gray.50"
      p={{ base: 4, md: 12 }}
      py={6}
      borderRadius="xl"
      mb={6}
      flexDirection="column"
    >
      <Heading size="title.md" textAlign="center" mb={6}>
        Ready to build your first web3 app? Get early access & add web3 features
        to your project today.
      </Heading>
      <GeneralCta />
    </Flex>
  );
};

export const BannerCta: React.FC = () => {
  return (
    <Alert
      colorScheme="gray"
      bg="yellow.100"
      status="info"
      position="absolute"
      top={{ base: 14, md: 0 }}
      zIndex={1}
      display="flex"
      boxShadow="sm"
    >
      <Container maxW="container.page">
        <SimpleGrid
          spacing={4}
          columns={{ base: 1, md: 2 }}
          w="100%"
          px={{ base: 0, md: "15%" }}
        >
          <Center>
            <Heading
              textAlign="center"
              maxW="55vw"
              lineHeight={1.8}
              size="label.lg"
            >
              🎉${"  "}⏱$ Ready to build? Get early access now!⏱${"  "}🎉
            </Heading>
          </Center>
          <GeneralCta />
        </SimpleGrid>
      </Container>
    </Alert>
  );
};
