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

const SplitPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_splits",
  });
  return (
    <Track>
      <NextSeo
        title="Split Guides | Portal"
        openGraph={{
          title: "Split Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use a Split smart contract",
          url: `https://portal.thirdweb.com/guides/splits`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Split"
          subtitle="Custom royalty splits and fund distribution"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "split"),
  );

  return {
    props: { guides },
  };
}

export default SplitPage;

SplitPage.Layout = PortalLayout;
