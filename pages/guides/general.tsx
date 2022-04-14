import { Stack } from "@chakra-ui/react";
import { PortalLayout } from "components/app-layouts/portal";
import { TagToModuleTypeMap } from "components/portal/guide-card";
import { GuidesList } from "components/portal/guides-list";
import { PortalHeaderCard } from "components/portal/header-card";
import { useTrack } from "hooks/analytics/useTrack";
import { BreadcrumbJsonLd, NextSeo } from "next-seo";
import { ConsolePage } from "pages/_app";
import React from "react";
import { getAllGuides } from "utils/mdxUtils";
import { GuidesPageProps } from "utils/portalTypes";

const GeneralPage: ConsolePage<GuidesPageProps> = ({ guides }) => {
  const { Track } = useTrack({
    page: "guides_general",
  });
  return (
    <Track>
      <NextSeo
        title="General Guides | Portal"
        openGraph={{
          title: "General Guides | Portal | thirdweb",
          url: `https://portal.thirdweb.com/guides/general`,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Portal",
            item: "https://portal.thirdweb.com",
          },
          {
            position: 2,
            name: "Guides",
            item: "https://portal.thirdweb.com/guides",
          },
          {
            position: 3,
            name: "General Guides",
            item: `https://portal.thirdweb.com/guides/general`,
          },
        ]}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="General"
          subtitle="For everything else"
          src="/assets/portal/contract-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export function getStaticProps() {
  const guides = getAllGuides().filter(
    (guide) =>
      !guide.metadata.tags.some((tag: string) =>
        Object.keys(TagToModuleTypeMap).includes(tag),
      ),
  );

  return {
    props: { guides },
  };
}

export default GeneralPage;

GeneralPage.Layout = PortalLayout;
