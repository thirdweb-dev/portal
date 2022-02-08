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

const MarketPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_market",
  });
  return (
    <Track>
      <NextSeo
        title="Marketplace Guides | Portal"
        openGraph={{
          title: "Marketplace Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use a whitelabel NFT Marketplace",
          url: `https://thirdweb.com/portal/guides/marketplace`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Marketplace"
          subtitle="Whitelabel Marketplace"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "marketplace"),
  );

  return {
    props: { guides },
  };
}

export default MarketPage;

MarketPage.Layout = PortalLayout;
