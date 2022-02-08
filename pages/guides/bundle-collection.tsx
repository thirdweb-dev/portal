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

const BundlePage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_bundle",
  });
  return (
    <Track>
      <NextSeo
        title="Bundle Collection Guides | Portal"
        openGraph={{
          title: "Bundle Collection Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use an ERC1155 token",
          url: `https://portal.thirdweb.com/guides/bundle-collection`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Bundle Collection"
          subtitle="ERC1155 standard"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "bundle-collection"),
  );

  return {
    props: { guides },
  };
}

export default BundlePage;

BundlePage.Layout = PortalLayout;
