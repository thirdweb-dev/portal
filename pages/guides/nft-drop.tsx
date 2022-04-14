import { Stack } from "@chakra-ui/react";
import { PortalLayout } from "components/app-layouts/portal";
import { GuidesList } from "components/portal/guides-list";
import { PortalHeaderCard } from "components/portal/header-card";
import { useTrack } from "hooks/analytics/useTrack";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { ConsolePage } from "pages/_app";
import React from "react";
import { getAllGuides } from "utils/mdxUtils";
import { GuidesPageProps } from "utils/portalTypes";

const DropPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_drop",
  });
  return (
    <Track>
      <NextSeo
        title="NFT Drop Guides | Portal"
        openGraph={{
          title: "NFT Drop Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use an ERC721 token with Lazy Minting",
          url: `https://portal.thirdweb.com/guides/nft-drop`,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Portal",
            item: "https://portal.thirdweb.com",
          },
          {
            position: 2,
            name: "Guides",
            item: "https://portal.thirdweb.com/guides",
          },
          {
            position: 3,
            name: "NFT Drop Guides",
            item: `https://portal.thirdweb.com/guides/nft-drop`,
          },
        ]}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="NFT Drop"
          subtitle="ERC721 with Lazy Minting"
          src="/assets/portal/contract-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "nft-drop"),
  );

  return {
    props: { guides },
  };
}

export default DropPage;

DropPage.Layout = PortalLayout;
