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

const TokenPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_token",
  });
  return (
    <Track>
      <NextSeo
        title="Token Guides | Portal"
        openGraph={{
          title: "Token Guides | Portal | thirdweb",
          description:
            "Guides and tutorials on how to create and use an ERC20 token",
          url: `https://portal.thirdweb.com/guides/token`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Token"
          subtitle="ERC20 standard"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === "token"),
  );

  return {
    props: { guides },
  };
}

export default TokenPage;

TokenPage.Layout = PortalLayout;
