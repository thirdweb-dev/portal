import { Stack } from "@chakra-ui/react";
import { PortalLayout } from "components/app-layouts/portal";
import { GuidesList } from "components/portal/guides-list";
import { PortalHeaderCard } from "components/portal/header-card";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { ConsolePage } from "pages/_app";
import React from "react";
import { getAllGuides } from "utils/mdxUtils";
import { GuidesPageProps } from "utils/portalTypes";

const NftCollectionPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_nft_collection",
  });
  return (
    <Track>
      <NextSeo
        title="NFT Collection Guides | Portal"
        openGraph={{
          title: "NFT Collection Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use an ERC721 token",
          url: `https://thirdweb.com/portal/guides/nft-collection`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="NFT Collection"
          subtitle="ERC721 standard"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "nft-collection"),
  );

  return {
    props: { guides },
  };
}

export default NftCollectionPage;

NftCollectionPage.Layout = PortalLayout;
