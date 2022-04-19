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
        <SidebarItem label="Home" href="/" matchExact />
        <SidebarItem label="Getting Started" matchExact href="/learn-thirdweb">
          <SidebarItem
            label="Connect to the blockchain"
            matchExact
            href="/learn-thirdweb/connect-to-blockchain"
          />
        </SidebarItem>
        <SidebarItem
          label="Quick start for Developers"
          matchExact
          href="/learn-thirdweb/quick-start-dev"
        />
        <SidebarItem
          label="NFTs and Tokens"
          matchExact
          href="/contracts/nfts-and-tokens"
        >
          <SidebarItem
            label="NFT Collection"
            matchExact
            href="/contracts/nft-collection"
          >
            <SidebarItem
              label="Guides"
              matchExact
              href="/guides/nft-collection"
            />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.nftcollection"
              isExternal
            />
            <SidebarItem
              label="Python docs"
              matchExact
              href="https://docs.thirdweb.com/python/nft-collection"
              isExternal
            />
          </SidebarItem>
          <SidebarItem label="Edition" matchExact href="/contracts/edition">
            <SidebarItem label="Guides" matchExact href="/guides/edition" />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.edition"
              isExternal
            />
            <SidebarItem
              label="Python docs"
              matchExact
              href="https://docs.thirdweb.com/python/edition"
              isExternal
            />
          </SidebarItem>
          <SidebarItem label="Token" matchExact href="/contracts/token">
            <SidebarItem label="Guides" matchExact href="/guides/token" />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.token"
              isExternal
            />
            <SidebarItem
              label="Python docs"
              matchExact
              href="https://docs.thirdweb.com/python/token"
              isExternal
            />
          </SidebarItem>
          <SidebarItem label="Pack" matchExact href="/contracts/pack">
            <SidebarItem label="Guides" matchExact href="/guides/pack" />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.pack"
              isExternal
            />
          </SidebarItem>
        </SidebarItem>
        <SidebarItem label="Drops" matchExact href="/contracts/drops">
          <SidebarItem label="NFT Drop" matchExact href="/contracts/nft-drop">
            <SidebarItem label="Guides" matchExact href="/guides/nft-drop" />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.nftdrop"
              isExternal
            />
            <SidebarItem
              label="Python docs"
              matchExact
              href="https://docs.thirdweb.com/python/nft-drop"
              isExternal
            />
          </SidebarItem>
          <SidebarItem
            label="Edition Drop"
            matchExact
            href="/contracts/edition-drop"
          >
            <SidebarItem
              label="Guides"
              matchExact
              href="/guides/edition-drop"
            />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.editiondrop"
              isExternal
            />
            <SidebarItem
              label="Python docs"
              matchExact
              href="https://docs.thirdweb.com/python/edition-drop"
              isExternal
            />
          </SidebarItem>
        </SidebarItem>
        <SidebarItem
          label="Marketplace"
          matchExact
          href="/contracts/marketplace"
        >
          <SidebarItem label="Guides" matchExact href="/guides/marketplace" />
          <SidebarItem
            label="JavaScript docs"
            matchExact
            href="https://docs.thirdweb.com/typescript/sdk.marketplace"
            isExternal
          />
          <SidebarItem
            label="Python docs"
            matchExact
            href="https://docs.thirdweb.com/python/marketplace"
            isExternal
          />
        </SidebarItem>
        <SidebarItem
          label="Governance and Splits"
          matchExact
          href="/contracts/governance"
        >
          <SidebarItem label="Vote" matchExact href="/contracts/vote">
            <SidebarItem label="Guides" matchExact href="/guides/vote" />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.vote"
              isExternal
            />
          </SidebarItem>
          <SidebarItem label="Split" matchExact href="/contracts/split">
            <SidebarItem label="Guides" matchExact href="/guides/split" />
            <SidebarItem
              label="JavaScript docs"
              matchExact
              href="https://docs.thirdweb.com/typescript/sdk.split"
              isExternal
            />
          </SidebarItem>
        </SidebarItem>
        <SidebarItem label="Developer Guides" href="/guides" matchExact />
        <SidebarItem label="Learn web3" matchExact href="/learn-web3" />

        <SidebarItem label="Developer References">
          <SidebarItem
            label="TypeScript"
            href="https://docs.thirdweb.com/typescript"
            isExternal
          />
          <SidebarItem
            label="React"
            href="https://docs.thirdweb.com/react"
            isExternal
          />
          <SidebarItem
            label="Contracts"
            href="https://docs.thirdweb.com/contracts"
            isExternal
          />
          <SidebarItem
            label="Python"
            href="https://docs.thirdweb.com/python"
            isExternal
          />
          <SidebarItem
            label="Go"
            href="https://pkg.go.dev/github.com/thirdweb-dev/go-sdk/pkg"
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
