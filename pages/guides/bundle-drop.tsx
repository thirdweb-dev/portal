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

const BundleDropPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_bundleDrop",
  });
  return (
    <Track>
      <NextSeo
        title="Bundle Drop Guides | Portal"
        openGraph={{
          title: "Bundle Drop Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use a Bundle Drop smart contract",
          url: `https://portal.thirdweb.com/guides/bundle-drop`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Bundle Drop"
          subtitle="ERC-1155 with lazy minting"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "bundle-drop"),
  );

  return {
    props: { guides },
  };
}

export default BundleDropPage;

BundleDropPage.Layout = PortalLayout;
