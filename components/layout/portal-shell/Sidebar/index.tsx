import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { NextLink } from "components/shared/NextLink";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { TiChevronRight } from "react-icons/ti";
import { numberToPx, pxToRem } from "utils/pxFunctions";

export const PORTAL_SIDEBAR_WIDTH = 260;
export const PortalSidebar: React.FC = () => {
  return (
    <Flex
      position="fixed"
      bg="white"
      flexShrink={0}
      as="aside"
      flexDir="column"
      overflowY="auto"
      left={0}
      top={0}
      h="100%"
      w={numberToPx(PORTAL_SIDEBAR_WIDTH)}
      borderRight="1px solid var(--chakra-colors-gray-100)"
      pt={pxToRem(75)}
    >
      <Stack px={2} my={4} spacing={1}>
        <SidebarItem label="Home" href="/portal" matchExact />
        <SidebarItem label="Getting Started" matchExact href="/portal/learn">
          <SidebarItem
            label="Introduction"
            matchExact
            href="/portal/learn/introduction"
          />
          <SidebarItem
            label="Projects"
            matchExact
            href="/portal/learn/projects"
          />
          <SidebarItem label="Modules" matchExact href="/portal/learn/modules">
            <SidebarItem
              label="NFT Collection"
              matchExact
              href="/portal/learn/modules/nft-collection"
            />
            <SidebarItem
              label="Pack"
              matchExact
              href="/portal/learn/modules/pack"
            />
          </SidebarItem>
          <SidebarItem
            label="Connect to the blockchain"
            matchExact
            href="/portal/learn/connect-to-blockchain"
          />
          <SidebarItem label="Recipes" matchExact href="/portal/learn/recipes">
            <SidebarItem
              label="Sell YOUR NFTs in YOUR..."
              matchExact
              href="/portal/learn/recipes/nft-token-marketplace"
            />
          </SidebarItem>
        </SidebarItem>
        <SidebarItem
          label="Code Examples"
          matchExact
          href="/portal/learn/code-examples"
        >
          <SidebarItem
            label="NFT Collection"
            matchExact
            href="/portal/learn/code-examples/nft-collection"
          />
          <SidebarItem
            label="Bundle Collection"
            matchExact
            href="/portal/learn/code-examples/bundle-collection"
          />
          <SidebarItem
            label="NFT Drop"
            matchExact
            href="/portal/learn/code-examples/nft-drop"
          />
          <SidebarItem
            label="Bundle Drop"
            matchExact
            href="/portal/learn/code-examples/bundle-drop"
          />
          <SidebarItem
            label="Token"
            matchExact
            href="/portal/learn/code-examples/token"
          />
          <SidebarItem
            label="Marketplace"
            matchExact
            href="/portal/learn/code-examples/marketplace"
          />
          <SidebarItem
            label="Pack"
            matchExact
            href="/portal/learn/code-examples/pack"
          />
          <SidebarItem
            label="Vote"
            matchExact
            href="/portal/learn/code-examples/vote"
          />
          <SidebarItem
            label="Splits"
            matchExact
            href="/portal/learn/code-examples/splits"
          />
        </SidebarItem>
        <SidebarItem
          label="Developer Guides"
          href="/portal/guides"
          matchExact
          initialOpen
        >
          <SidebarItem label="General" href="/portal/guides/general" />
          <SidebarItem
            label="NFT Collection"
            href="/portal/guides/nft-collection"
          />
          <SidebarItem
            label="Bundle Collection"
            href="/portal/guides/bundle-collection"
          />
          <SidebarItem label="NFT Drop" href="/portal/guides/nft-drop" />
          <SidebarItem label="Bundle Drop" href="/portal/guides/bundle-drop" />
          <SidebarItem label="Token" href="/portal/guides/token" />
          <SidebarItem label="Marketplace" href="/portal/guides/marketplace" />
          <SidebarItem label="Pack" href="/portal/guides/pack" />
          <SidebarItem label="Vote" href="/portal/guides/vote" />
          <SidebarItem label="Splits" href="/portal/guides/splits" />
          <SidebarItem label="UI" href="/portal/guides/ui" />
        </SidebarItem>

        <SidebarItem label="SDKs" initialOpen>
          <SidebarItem
            label="TypeScript"
            href="https://nftlabs.github.io/nftlabs-sdk-ts/sdk.html"
            isExternal
          />
          <SidebarItem
            label="Python"
            href="https://python-docs.thirdweb.com/"
            isExternal
          />
          <SidebarItem
            label="Go"
            href="https://pkg.go.dev/github.com/nftlabs/nftlabs-sdk-go/pkg/nftlabs"
            isExternal
          />
        </SidebarItem>
      </Stack>
    </Flex>
  );
};

interface SidebarItemProps {
  href?: string;
  label: string;
  level?: number;
  matchExact?: boolean;
  isExternal?: boolean;
  initialOpen?: true;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  children,
  level = 0,
  href,
  matchExact,
  isExternal,
  initialOpen,
}) => {
  const hasChildren = !!children;
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { level: level + 1 });
    }
    return child;
  });
  const { asPath } = useRouter();
  const isActive = useMemo(() => {
    if (!href) {
      return false;
    }

    return matchExact ? asPath === href : asPath.startsWith(href);
  }, [asPath, href, matchExact]);

  const [isOpen, setIsOpen] = useState(initialOpen || false);

  const toggleOpen = useCallback(() => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  }, [hasChildren, isOpen]);

  return (
    <>
      <Button
        boxShadow="none!important"
        as={href ? NextLink : (undefined as any)}
        _active={{ bg: "primary.50" }}
        {...(href ? { href, isExternal: !!isExternal } : {})}
        m={0}
        textDecor="none!important"
        justifyContent="flex-start"
        w="100%"
        h="auto"
        textAlign="left"
        variant="ghost"
        iconSpacing={1}
        _hover={{
          color: isActive ? "primary.500" : "black",
          bgColor: isActive ? "primary.50" : "gray.50",
        }}
        bg={isActive ? "primary.50" : "transparent"}
        color={isActive ? "primary.500" : ""}
        padding="auto"
        px={4}
        pl={4 + level * 4}
        py={2}
        borderRadius="md"
        position="relative"
        fontWeight={level === 0 ? 600 : isActive ? 600 : isOpen ? 500 : 400}
        onClick={
          href ? () => (hasChildren ? setIsOpen(true) : null) : toggleOpen
        }
        leftIcon={
          hasChildren ? (
            <Icon
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleOpen();
              }}
              flexShrink={0}
              boxSize={3}
              mx={0}
              as={TiChevronRight}
              transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
              transition="transform 200ms ease"
            />
          ) : undefined
        }
        rightIcon={isExternal ? <Icon as={FiExternalLink} /> : undefined}
      >
        <Text fontWeight="inherit" color="inherit">
          {label}
        </Text>
      </Button>
      {isOpen ? childrenWithProps : null}
    </>
  );
};
