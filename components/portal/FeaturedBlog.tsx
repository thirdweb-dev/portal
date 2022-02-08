import { ModuleType } from "@3rdweb/sdk";
import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { NextLink } from "components/shared/NextLink";
import React, { useMemo } from "react";
import { FeatureIconMap } from "utils/feature-icons";
import { GuideData } from "utils/portalTypes";
import { GrayTag } from "./tag";

interface FeaturedBlogProps {
  blog: GuideData;
}

export const TagToModuleTypeMap = {
  "nft-collection": ModuleType.NFT,
  token: ModuleType.CURRENCY,
  bundle: ModuleType.COLLECTION,
  pack: ModuleType.PACK,
  marketplace: ModuleType.MARKET,
  drop: ModuleType.DROP,
  datastore: ModuleType.DATASTORE,
  "dynamic nft": ModuleType.DYNAMIC_NFT,
  "access nft": ModuleType.ACCESS_NFT,
  splits: ModuleType.SPLITS,
};

export const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ blog }) => {
  const { image, title, tags } = blog.metadata;
  const specialTag: keyof typeof TagToModuleTypeMap | undefined =
    useMemo(() => {
      const specialTagArray = Object.keys(TagToModuleTypeMap);
      return (
        (specialTagArray.filter((x) =>
          tags.includes(x),
        )[0] as keyof typeof TagToModuleTypeMap) || undefined
      );
    }, [tags]);
  return (
    <LinkBox as={Stack} flexDirection={{ base: "column", md: "row" }}>
      <AspectRatio ratio={1200 / 630} w="100%" marginRight={{ base: 0, md: 8 }}>
        <Box borderRadius="lg" overflow="hidden">
          <ChakraNextImage
            alt={`${title} thumbnail`}
            borderTopLeftRadius="lg"
            borderBottomRightRadius="lg"
            src={image}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center"
            width="360"
            height="189"
          />
        </Box>
      </AspectRatio>
      <Stack>
        <Stack direction="row" align="center">
          {specialTag ? (
            <>
              <ChakraNextImage
                boxSize={6}
                alt={`${specialTag}icon`}
                src={FeatureIconMap[TagToModuleTypeMap[specialTag]]}
              />
              <Heading opacity={0.7} size="label.md" textTransform="uppercase">
                {specialTag.replace(/-/g, " ")}
              </Heading>
            </>
          ) : (
            <>
              <ChakraNextImage
                boxSize={8}
                width={8}
                height={8}
                alt="generalicon"
                src="/assets/tw-icons/general.png"
              />
              <Heading opacity={0.7} size="label.lg" textTransform="uppercase">
                General
              </Heading>
            </>
          )}
        </Stack>
        <LinkOverlay as={NextLink} href={`/blog/${blog.slug}`}>
          <Heading size="title.lg" fontWeight={600} noOfLines={3} mb={2}>
            {title}
          </Heading>
        </LinkOverlay>
        <Stack direction="row">
          {tags?.slice(0, 3).map((tag) => (
            <GrayTag key={tag} tag={tag} blog />
          ))}
        </Stack>
      </Stack>
    </LinkBox>
  );
};
