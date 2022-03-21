import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  LinkBox,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PortalLayout } from "components/app-layouts/portal";
import { ChakraNextImage } from "components/Image";
import { Card } from "components/layout/Card";
import { PORTAL_SIDEBAR_WIDTH } from "components/layout/portal-shell/Sidebar";
import { ContractCard } from "components/portal/ContractCard";
import { GuidesList } from "components/portal/guides-list";
import { InstallTabs } from "components/portal/InstallTabs";
import { PortalSection } from "components/portal/section";
import { NextLink } from "components/shared/NextLink";
import { useTrack } from "hooks/analytics/useTrack";
import { GetStaticProps } from "next";
import React from "react";
import { MdMenuBook, MdOutlineIntegrationInstructions } from "react-icons/md";
import { SiDiscord, SiGo, SiJavascript } from "react-icons/si";
import { getAllGuides } from "utils/mdxUtils";
import { GuideData } from "utils/portalTypes";
import { pxToRem } from "utils/pxFunctions";
import { ConsolePage } from "./_app";

interface PortalHomeProps {
  featuredGuides: GuideData[];
}

const PortalHome: ConsolePage<PortalHomeProps> = ({ featuredGuides }) => {
  const { Track } = useTrack({
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
          <Box>
            <Heading as="h1" size="display.sm" mb={2}>
              Portal
            </Heading>
            <Heading as="h2" size="title.md">
              Learn about building, deploying, and managing web3 apps.
            </Heading>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={15}>
            <SimpleGrid spacing={7} flexGrow={1}>
              <Box>
                <ChakraNextImage
                  src={require("/public/assets/portal/thirdweb.png")}
                  sizes="48px"
                  boxSize={6}
                  alt="thirdweb"
                />
                <Heading as="h3" size="title.sm" my={2}>
                  What is thirdweb?
                </Heading>
                <Text size="body.lg">
                  We provide smart contracts, SDKs and UI components that
                  creators, game studios and developers can integrate into their
                  app.
                </Text>
              </Box>
              <Box>
                <ChakraNextImage
                  src="/assets/portal/square.png"
                  boxSize={6}
                  width={6}
                  height={6}
                  alt="thirdweb"
                />
                <Heading as="h3" size="title.sm" my={2}>
                  What can you do?
                </Heading>
                <Text size="body.lg">
                  Create NFTs and custom tokens, manage drops, develop your own
                  white label marketplace, and much more.
                </Text>
              </Box>
              <Box>
                <ChakraNextImage
                  src="/assets/portal/dollar.png"
                  boxSize={6}
                  width={6}
                  height={6}
                  alt="thirdweb"
                />
                <Heading as="h3" size="title.sm" my={2}>
                  How much does it cost?
                </Heading>
                <Text size="body.lg">
                  Our tools and SDKs are free to use. We don&apos;t take any
                  fees on anything you do with our platform.
                </Text>
              </Box>
            </SimpleGrid>
            <Flex direction="column">
              <InstallTabs />
              <SimpleGrid mt={5} columns={{ base: 1, md: 2 }} spacing={5}>
                <LinkBox role="group">
                  <NextLink
                    href="/learn-thirdweb"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Card
                      _groupHover={{ borderColor: "blue.600" }}
                      transition="all 0.25s ease-in-out"
                    >
                      <Icon
                        as={MdOutlineIntegrationInstructions}
                        boxSize={6}
                        color="gray.300"
                      />
                      <Text
                        size="subtitle.md"
                        color="blue.600"
                        mb={1.5}
                        mt={3}
                        _groupHover={{ textDecoration: "underline" }}
                        fontWeight={500}
                      >
                        Get Started
                      </Text>
                      <Text size="body.md">
                        Get up and running with libraries, keys, and integration
                        tools.
                      </Text>
                    </Card>
                  </NextLink>
                </LinkBox>
                <Card p={0}>
                  <SimpleGrid>
                    <NextLink href="https://docs.thridweb.com/typescript">
                      <HStack
                        role="group"
                        _hover={{ bgColor: "blue.100", borderTopRadius: "xl" }}
                        transition="all 0.25s ease-in-out"
                        py="13px"
                        px={4}
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
                    </NextLink>
                    <NextLink href="https://python-docs.thirdweb.com/">
                      <HStack
                        role="group"
                        _hover={{ bgColor: "blue.100" }}
                        transition="all 0.25s ease-in-out"
                        py="13px"
                        px={4}
                      >
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
                    </NextLink>
                    <NextLink href="https://pkg.go.dev/github.com/thirdweb-dev/go-sdk/pkg">
                      <HStack
                        role="group"
                        _hover={{
                          bgColor: "blue.100",
                          borderBottomRadius: "xl",
                        }}
                        transition="all 0.25s ease-in-out"
                        py="13px"
                        px={4}
                        fontWeight={500}
                      >
                        <Icon as={SiGo} boxSize={6} color="#007D9C" />
                        <Text
                          size="subtitle.md"
                          color="blue.600"
                          fontWeight={500}
                          _groupHover={{ textDecoration: "underline" }}
                        >
                          Go SDK
                        </Text>
                      </HStack>
                    </NextLink>
                  </SimpleGrid>
                </Card>
                <LinkBox role="group">
                  <NextLink href="/guides" _hover={{ textDecoration: "none" }}>
                    <Card
                      _groupHover={{ borderColor: "blue.600" }}
                      transition="all 0.25s ease-in-out"
                    >
                      <Icon as={MdMenuBook} boxSize={6} color="gray.300" />
                      <Text
                        size="subtitle.md"
                        color="blue.600"
                        mb={1.5}
                        mt={3}
                        _groupHover={{ textDecoration: "underline" }}
                        fontWeight={500}
                      >
                        Guides
                      </Text>
                      <Text size="body.md">
                        Find tutorials, sample code, and developer guides.
                      </Text>
                    </Card>
                  </NextLink>
                </LinkBox>
                <LinkBox role="group">
                  <NextLink
                    href="https://discord.gg/thirdweb"
                    _hover={{ textDecoration: "none" }}
                  >
                    <Card
                      _groupHover={{ borderColor: "blue.600" }}
                      transition="all 0.25s ease-in-out"
                    >
                      <Icon as={SiDiscord} boxSize={6} color="gray.300" />
                      <Text
                        size="subtitle.md"
                        color="blue.600"
                        mb={1.5}
                        mt={3}
                        _groupHover={{ textDecoration: "underline" }}
                        fontWeight={500}
                      >
                        Join 30K+ builders
                      </Text>
                      <Text size="body.md">
                        Join our supportive Discord community & ship products.
                      </Text>
                    </Card>
                  </NextLink>
                </LinkBox>
              </SimpleGrid>
            </Flex>
          </SimpleGrid>
          <GuidesList title="Featured guides" guides={featuredGuides} tags />
          <PortalSection title="Explore our contracts">
            <Flex
              p={0}
              as={Card}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="2xl"
              overflow="hidden"
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box
                borderRight="1px solid"
                w={{ base: "100%", md: "50%" }}
                borderColor="gray.200"
              >
                <ContractCard
                  title="NFT Collection"
                  description="ERC721 standard"
                />
                <ContractCard title="Edition" description="ERC1155 standard" />
                <ContractCard
                  title="NFT Drop"
                  description="ERC721 with lazy minting"
                  slug="drop"
                />
                <ContractCard
                  title="Edition Drop"
                  description="ERC1155 standard with lazy minting"
                  slug="drop"
                />
                <ContractCard title="Token" description="ERC20 standard" />
              </Box>
              <Box w={{ base: "100%", md: "50%" }}>
                <ContractCard
                  title="Marketplace"
                  description="Whitelabel Marketplace"
                />
                <ContractCard
                  title="Pack"
                  description="Collection of NFTs with random NFT on open"
                />
                <ContractCard
                  title="Vote"
                  description="Decentralized voting and governance protocol"
                />
                <ContractCard
                  title="Split"
                  description="Custom royalty splits and fund distribution"
                />
              </Box>
            </Flex>
          </PortalSection>
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
