import { Badge, Text } from "@chakra-ui/layout";
import { NextLink } from "components/shared/NextLink";
import * as React from "react";

interface GrayTagProps {
  tag: string;
  blog?: boolean | undefined;
}

export const GrayTag: React.FC<GrayTagProps> = ({ tag, blog }) => {
  return (
    <NextLink key={tag} href={`/${blog ? "blog" : "guides"}/tag/${tag}`}>
      <Badge
        p={1.5}
        variant="subtle"
        bg="gray.50"
        borderRadius="md"
        colorScheme="gray"
        _hover={{ bgColor: "gray.100" }}
      >
        <Text size="label.sm">{tag.replace(/-/g, " ")}</Text>
      </Badge>
    </NextLink>
  );
};

interface BlueTagProps {
  name: string;
  href: string;
}

export const BlueTag: React.FC<BlueTagProps> = ({ name, href }) => {
  return (
    <NextLink href={href}>
      <Badge
        px={4}
        py={1}
        variant="subtle"
        borderRadius="full"
        border="1px solid"
        borderColor="gray.400"
        bgColor="white"
        _hover={{ bgColor: "primary.100", borderColor: "primary.500" }}
      >
        <Text
          fontSize="subtitle.sm"
          color="primary.500"
          fontWeight="500"
          textTransform="initial"
        >
          {name}
        </Text>
      </Badge>
    </NextLink>
  );
};
