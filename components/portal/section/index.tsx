import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { NextLink } from "components/shared/NextLink";
import React from "react";

interface PortalSectionProps {
  title: string;
  href?: string;
}

export const PortalSection: React.FC<PortalSectionProps> = ({
  title,
  href,
  children,
}) => {
  return (
    <Stack spacing={5}>
      <Flex justify="space-between" align="center">
        <Heading size="title.md">{title}</Heading>
        {href && (
          <NextLink
            fontSize="label.lg"
            fontWeight="label"
            color="primary.500"
            href={href}
          >
            Show more
          </NextLink>
        )}
      </Flex>
      <Box>{children}</Box>
    </Stack>
  );
};
