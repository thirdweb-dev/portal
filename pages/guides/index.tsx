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

const Guides: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_home",
  });
  return (
    <Track>
      <NextSeo
        title="Developer Guides | Portal"
        openGraph={{
          title: "Developer Guides | Portal | thirdweb",
          url: `https://thirdweb.com/portal/guides`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="Guides"
          subtitle={
            <>
              Find tutorials, sample code, developer <br />
              guides, and API references.
            </>
          }
          src="/assets/portal/guides-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides();

  return {
    props: { guides },
  };
}

export default Guides;

Guides.Layout = PortalLayout;
