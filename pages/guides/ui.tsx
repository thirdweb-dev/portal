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

const UIPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_ui",
  });
  return (
    <Track>
      <NextSeo
        title="UI Guides | Portal"
        openGraph={{
          title: "UI Guides | Portal | thirdweb",
          description: "Guides and tutorials about thirdweb UI components.",
          url: `https://portal.thirdweb.com/guides/ui`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="UI"
          subtitle="thirdweb UI components"
          src="/assets/portal/contract-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "ui"),
  );

  return {
    props: { guides },
  };
}

export default UIPage;

UIPage.Layout = PortalLayout;
