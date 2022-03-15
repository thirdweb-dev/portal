import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import { ChakraNextImage } from "components/Image";
import { NextLink } from "components/shared/NextLink";
import React from "react";

interface ContractCardProps {
  title: string;
  description: string;
  slug?: string;
}

export const ContractCard: React.FC<ContractCardProps> = ({
  title,
  description,
  slug,
}) => {
  const titleToSlug = title.replace(" ", "-").toLowerCase();

  return (
    <NextLink
      href={`/guides/${titleToSlug}`}
      _hover={{ textDecoration: "none" }}
    >
      <HStack _hover={{ backgroundColor: "gray.50" }} p={6}>
        <Box boxSize={12}>
          <ChakraNextImage
            src={`/assets/tw-icons/${slug ? slug : titleToSlug}.png`}
            width={12}
            height={12}
            alt={title}
          />
        </Box>
        <Flex flexDirection="column" pl={2}>
          <Heading size="label.lg">{title}</Heading>
          <Text size="body.lg">{description}</Text>
        </Flex>
      </HStack>
    </NextLink>
  );
};
