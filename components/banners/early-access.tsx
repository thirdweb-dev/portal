import { Center, Link } from "@chakra-ui/layout";
import { Alert, AlertIcon, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const EarlyAccessBanner: React.FC = () => {
  return (
    <Alert
      colorScheme="purple"
      bg="purple.100"
      status="info"
      flexShrink={0}
      py={2}
    >
      <Center w="100%">
        <Stack direction="row" spacing={4} align="center">
          <AlertIcon color="purple.800" boxSize={4} />
          <Text color="purple.800" fontSize="body.md">
            <strong>Early access.</strong> Please report any issues and bugs in
            our{" "}
            <Link
              fontWeight="bold"
              color="inherit"
              href="https://discord.gg/thirdweb"
              isExternal
            >
              Discord
            </Link>
            .
          </Text>
        </Stack>
      </Center>
    </Alert>
  );
};
