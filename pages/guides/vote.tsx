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

const VotePage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_vote",
  });
  return (
    <Track>
      <NextSeo
        title="Vote Guides | Portal"
        openGraph={{
          title: "Vote Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use a whitelabel NFT Vote",
          url: `https://portal.thirdweb.com/guides/vote`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Vote"
          subtitle="Decentralized voting and governance protocol"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "vote"),
  );

  return {
    props: { guides },
  };
}

export default VotePage;

VotePage.Layout = PortalLayout;
