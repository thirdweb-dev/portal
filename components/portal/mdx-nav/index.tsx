import Icon from "@chakra-ui/icon";
import { Flex, LinkOverlay, Stack, Text } from "@chakra-ui/layout";
import { LinkBox } from "@chakra-ui/react";
import { NextLink } from "components/shared/NextLink";
import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface MdxNavItemProps {
  next?: boolean;
  title: string;
  href: string;
}

export const MdxNavigationItem: React.FC<MdxNavItemProps> = ({
  href,
  next,
  title,
}) => {
  return (
    <LinkBox
      w="100%"
      as={Flex}
      border="1px solid lightgray"
      p={4}
      borderRadius="md"
      shadow="sm"
      justifyContent="space-between"
      alignItems="center"
      _hover={{ borderColor: "primary.500", color: "primary.500" }}
      role="group"
    >
      <Stack
        spacing={1.5}
        order={next ? 0 : 1}
        textAlign={next ? "left" : "right"}
      >
        <Text size="label.sm" _groupHover={{ color: "primary.500" }}>
          {next ? "Next" : "Previous"}
        </Text>
        <Text size="label.lg" _groupHover={{ color: "primary.500" }}>
          <LinkOverlay
            _hover={{ textDecoration: "none" }}
            as={NextLink}
            href={href}
          >
            {title}
          </LinkOverlay>
        </Text>
      </Stack>
      <Icon as={next ? FiArrowRight : FiArrowLeft} boxSize={5} />
    </LinkBox>
  );
};
export const MdxNavigation: React.FC = ({ children }) => {
  return (
    <Stack
      w="full"
      direction={{ base: "column", md: "row" }}
      spacing={2}
      mt={5}
    >
      {children}
    </Stack>
  );
};

export default { Wrapper: MdxNavigation, Item: MdxNavigationItem };
