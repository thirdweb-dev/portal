import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { GuideData } from "utils/portalTypes";
import { PortalGuideCard } from "../guide-card";
import { PortalSection } from "../section";
import { BlueTag } from "../tag";

interface GuidesListProps {
  title: string;
  guides: GuideData[];
  showMore?: boolean;
  tags?: boolean;
  blog?: boolean;
}

export const GuidesList: React.FC<GuidesListProps> = ({
  title,
  guides,
  showMore,
  tags,
  blog,
}) => {
  return (
    <PortalSection title={title} href={showMore ? "/portal/guides" : ""}>
      {tags && (
        <Stack
          direction="row"
          mb={4}
          overflowX={{ base: "scroll", md: "auto" }}
        >
          <BlueTag name="All" href="/portal/guides" />
          <BlueTag name="TypeScript" href="/portal/guides/tag/typescript" />
          <BlueTag name="Python" href="/portal/guides/tag/python" />
          <BlueTag name="Token" href="/portal/guides/token" />
          <BlueTag name="NFT Collection" href="/portal/guides/nft-collection" />
          <BlueTag name="Marketplace" href="/portal/guides/marketplace" />
        </Stack>
      )}
      {guides.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacingX={7}
          spacingY={10}
        >
          {guides.map((guide, idx) => (
            <PortalGuideCard
              key={`guide_${idx}`}
              guide={guide.metadata}
              href={`${blog ? "/blog/" : "/portal/guides/"}${guide.slug}`}
              blog={blog}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text>No guides found. Check back soon!</Text>
      )}
    </PortalSection>
  );
};
