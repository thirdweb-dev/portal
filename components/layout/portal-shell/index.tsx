import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import { BannerCta } from "components/portal/guide-cta";
import { NextLink } from "components/shared/NextLink";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { numberToPx, pxToRem } from "utils/pxFunctions";
import { PortalSidebar, PORTAL_SIDEBAR_WIDTH } from "./Sidebar";

export const PortalShell: React.FC = ({ children }) => {
  const [flag, setFlag] = useBoolean();

  const calculatedLeftValue = useMemo(() => {
    return flag ? PORTAL_SIDEBAR_WIDTH : 0;
  }, [flag]);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // close mobile sidebar if user navigates to a new page
      if (url.indexOf("/") > -1) {
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
        title="Portal"
        openGraph={{
          title: "Portal | thirdweb",
          description:
            "Guides, tutorials and code examples for building web3 applications",
          url: `https://portal.thirdweb.com/`,
          images: [
            {
              url: "https://portal.thirdweb.com/portal.png",
              width: 1200,
              height: 630,
              alt: "Portal | thirdweb",
            },
          ],
        }}
      />

      <Stack
        position="fixed"
        bg="white"
        boxShadow={{ base: "md", md: "none" }}
        w={{ base: "100%", md: "auto" }}
        maxW="100vw"
        top={0}
        left={0}
        p={{ base: 2, md: 6 }}
        flexShrink={0}
        direction="row"
        zIndex="sticky"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          variant="ghost"
          aria-label="menu"
          icon={
            flag ? (
              <Icon boxSize={6} as={FiX} />
            ) : (
              <Icon boxSize={6} as={FiMenu} />
            )
          }
          onClick={setFlag.toggle}
        />
        <NextLink display="flex" href="/">
          <Logo />
        </NextLink>
      </Stack>
      <PortalSidebar />
      <Box
        position="relative"
        as="main"
        transition="margin 350ms ease"
        zIndex="docked"
        marginLeft={[
          numberToPx(calculatedLeftValue),
          numberToPx(calculatedLeftValue),
          numberToPx(PORTAL_SIDEBAR_WIDTH),
        ]}
        width={[
          "100%",
          "100%",
          `calc(100% - ${numberToPx(PORTAL_SIDEBAR_WIDTH)})`,
        ]}
        maxW="100vw"
        flexGrow={1}
        flexShrink={0}
        flexDir="column"
        overflowY="auto"
        bg="white"
        minH="100vh"
      >
        <BannerCta />
        <Container
          position="relative"
          pt={{ base: pxToRem(220), md: pxToRem(110) }}
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
