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

const PackPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_pack",
  });
  return (
    <Track>
      <NextSeo
        title="Pack Guides | Portal"
        openGraph={{
          title: "Pack Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use a Pack smart contract",
          url: `https://portal.thirdweb.com/guides/pack`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Pack"
          subtitle="Collection of NFTs with random NFT on open (lootbox mechanic)"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "pack"),
  );

  return {
    props: { guides },
  };
}

export default PackPage;

PackPage.Layout = PortalLayout;
