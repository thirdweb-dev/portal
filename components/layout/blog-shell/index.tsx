import { Box, Container, Flex, Stack, useBoolean } from "@chakra-ui/react";
import { Logo } from "components/logo";
import { NextLink } from "components/shared/NextLink";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { pxToRem } from "utils/pxFunctions";

export const BlogShell: React.FC = ({ children }) => {
  const [flag, setFlag] = useBoolean();

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // close mobile sidebar if user navigates to a new page
      if (url.indexOf("/blog") > -1) {
        setFlag.off();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, setFlag]);

  return (
    <Flex position="relative" overflow="hidden">
      <NextSeo
        title="Blog"
        openGraph={{
          title: "Blog | thirdweb",
          description: "Visit thirdweb technical blog.",
          url: `https://thirdweb.com/blog`,
          images: [
            {
              url: "https://thirdweb.com/blog.png",
              width: 1200,
              height: 630,
              alt: "Blog | thirdweb",
            },
          ],
        }}
      />

      <Box
        position="relative"
        as="main"
        transition="margin 350ms ease"
        zIndex="docked"
        width="100%"
        maxW="100vw"
        flexGrow={1}
        flexShrink={0}
        flexDir="column"
        overflowY="auto"
        bg="white"
        minH="100vh"
      >
        <Stack
          bg="white"
          boxShadow={{ base: "md", md: "none" }}
          maxW="100vw"
          p={{ base: 4, md: 6 }}
        >
          <NextLink display="flex" href="/blog">
            <Logo />
          </NextLink>
        </Stack>
        <Container
          position="relative"
          pt={{ base: pxToRem(20), md: pxToRem(30) }}
          flexGrow={1}
          flexDir="column"
          maxW="container.page"
          mb={16}
        >
          {children}
        </Container>
      </Box>
    </Flex>
  );
};
