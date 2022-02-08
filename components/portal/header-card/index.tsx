import { Flex, Heading, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import React from "react";

interface PortalHeaderCardProps {
  title: string;
  subtitle?: string | JSX.Element;
  src: string;
}

export const PortalHeaderCard: React.FC<PortalHeaderCardProps> = ({
  title,
  subtitle,
  src,
}) => {
  return (
    <Flex w="full" borderRadius="3xl" position="relative" overflow="hidden">
      <ChakraNextImage
        borderRadius="3xl"
        alt=""
        src={src}
        layout="fill"
        objectFit="cover"
        w="100%"
        position="absolute"
        h="100%"
      />
      <Stack zIndex={1} px={10} py={20} w="full" alignItems="center">
        <Heading
          as="h2"
          size="display.sm"
          margin={{ base: "auto", md: 0 }}
          variant="dark"
          textTransform="capitalize"
        >
          {title}
        </Heading>
        {subtitle && (
          <Heading as="h3" size="subtitle.lg" textAlign="center" variant="dark">
            {subtitle}
          </Heading>
        )}
      </Stack>
    </Flex>
  );
};
