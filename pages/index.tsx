import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PortalLayout } from "components/app-layouts/portal";
import { Card } from "components/layout/Card";
import { PORTAL_SIDEBAR_WIDTH } from "components/layout/portal-shell/Sidebar";
import { GuidesList } from "components/portal/guides-list";
import { InstallTabs } from "components/portal/InstallTabs";
import { LinkCard } from "components/portal/LinkCard";
import { PortalSection } from "components/portal/section";
import { LinkButton } from "components/shared/LinkButton";
import { NextLink } from "components/shared/NextLink";
import { useTrack } from "hooks/analytics/useTrack";
import { GetStaticProps } from "next";
import React from "react";
import { SiJavascript, SiReact } from "react-icons/si";
import { getAllGuides } from "utils/mdxUtils";
import { GuideData } from "utils/portalTypes";
import { pxToRem } from "utils/pxFunctions";
import { ConsolePage } from "./_app";

interface PortalHomeProps {
  featuredGuides: GuideData[];
}

const PortalHome: ConsolePage<PortalHomeProps> = ({ featuredGuides }) => {
  const { Track, trackEvent } = useTrack({
    page: "portal",
  });

  return (
    <Track>
      <Container
        flexShrink={1}
        maxW={{
          base: "100%",
          lg: `min(${pxToRem(
            800,
          )}, calc(100vw - ${PORTAL_SIDEBAR_WIDTH} - var(--chakra-space-20)))`,
        }}
      >
        <Stack spacing={{ base: 8, md: 16 }}>
          <Flex flexDir={{ base: "column", md: "row" }}>
            <Flex flexDir="column" flexGrow={1}>
              <Heading
                as="h1"
                size="display.sm"
                fontSize={{ base: 32, md: 44 }}
                mb={6}
              >
                Welcome to thirdweb portal
              </Heading>
              <Heading as="h2" size="subtitle.md" color="gray.700">
                Learn about building, deploying, and managing web3 apps.
              </Heading>
              <Box mb={{ base: 8, md: 0 }}>
                <LinkButton
                  bgColor="primary.500"
                  color="white"
                  _hover={{ bgColor: "primary.400" }}
                  px={16}
                  mt={6}
                  width={{ base: "100%", md: "auto" }}
                  onClick={() =>
                    trackEvent({
                      category: "landing",
                      action: "click",
                      label: "getting-started",
                    })
                  }
                  size="lg"
                  textAlign="center"
                  href="/learn-thirdweb"
                >
                  Get Started
                </LinkButton>
              </Box>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              width="70%"
              mx={16}
              display={{ base: "none", md: "flex" }}
            >
              <InstallTabs />
            </Flex>
          </Flex>

          <PortalSection title="Explore our SDKs">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <NextLink href="https://docs.thirdweb.com/typescript" isExternal>
                <Card
                  _hover={{ bgColor: "blue.100" }}
                  transition="all 0.25s ease-in-out"
                >
                  <HStack
                    role="group"
                    transition="all 0.25s ease-in-out"
                    justifyContent="center"
                  >
                    <Icon as={SiJavascript} boxSize={6} color="#F7DF1E" />
                    <Text
                      size="subtitle.md"
                      color="blue.600"
                      _groupHover={{ textDecoration: "underline" }}
                      fontWeight={500}
                    >
                      JavaScript SDK
                    </Text>
                  </HStack>
                </Card>
              </NextLink>
              <NextLink
                href="https://pkg.go.dev/github.com/thirdweb-dev/go-sdk/pkg"
                isExternal
              >
                <Card
                  _hover={{ bgColor: "blue.100" }}
                  transition="all 0.25s ease-in-out"
                >
                  <HStack
                    role="group"
                    transition="all 0.25s ease-in-out"
                    justifyContent="center"
                  >
                    <Icon as={SiReact} boxSize={6} color="#007D9C" />
                    <Text
                      size="subtitle.md"
                      color="blue.600"
                      fontWeight={500}
                      _groupHover={{ textDecoration: "underline" }}
                    >
                      React SDK
                    </Text>
                  </HStack>
                </Card>
              </NextLink>
              <NextLink href="https://python-docs.thirdweb.com/" isExternal>
                <Card
                  _hover={{ bgColor: "blue.100" }}
                  transition="all 0.25s ease-in-out"
                >
                  <HStack role="group" justifyContent="center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="26px"
                      height="26px"
                    >
                      <path
                        fill="#0277BD"
                        d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"
                      />
                      <path
                        fill="#FFC107"
                        d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764,5.896h-7.236c-2.523,0-5,1.862-5,4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5-1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"
                      />
                    </svg>
                    <Text
                      size="subtitle.md"
                      color="blue.600"
                      fontWeight={500}
                      _groupHover={{ textDecoration: "underline" }}
                    >
                      Python SDK
                    </Text>
                  </HStack>
                </Card>
              </NextLink>
            </SimpleGrid>
          </PortalSection>

          <PortalSection title="Explore our contracts">
            <SimpleGrid columns={{ base: 1, md: 4 }} gap={5}>
              <LinkCard
                bg="gray.50"
                largeIcon
                src={require("/public/assets/contract-cards/nft.png")}
                alt="token"
                href="/contracts/nfts-and-tokens"
                title="NFTs and Tokens"
                subtitle="Mint your own NFTs, packs and other tokens"
              />
              <LinkCard
                largeIcon
                bg="gray.50"
                src={require("/public/assets/contract-cards/drop.png")}
                alt="drop"
                href="/contracts/drops"
                title="Drops"
                subtitle="Set up a drop that can be claimed by others"
              />
              <LinkCard
                largeIcon
                bg="gray.50"
                src={require("/public/assets/contract-cards/marketplace.png")}
                alt="marketplace"
                href="/contracts/marketplace"
                title="Marketplaces"
                subtitle="Create marketplaces to list or auction assets"
              />
              <LinkCard
                largeIcon
                bg="gray.50"
                src={require("/public/assets/contract-cards/governance.png")}
                alt="governance"
                href="/contracts/governance"
                title="Governance & Splits"
                subtitle="Establish decentralized governance and split revenue"
              />
            </SimpleGrid>
          </PortalSection>
          <GuidesList
            title="Featured guides"
            guides={featuredGuides}
            tags
            showMore
          />
        </Stack>
      </Container>
    </Track>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredGuides = (await getAllGuides())
    .filter((guide) => guide.metadata.featuredOrder)
    .sort((a, b) => {
      if (a.metadata.featuredOrder > b.metadata.featuredOrder) {
        return -1;
      }
      if (a.metadata.featuredOrder < b.metadata.featuredOrder) {
        return 1;
      }
      return 0;
    });

  return { props: { featuredGuides } };
};

export default PortalHome;

PortalHome.Layout = PortalLayout;
