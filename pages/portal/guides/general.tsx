import { Stack } from "@chakra-ui/react";
import { PortalLayout } from "components/app-layouts/portal";
import { TagToModuleTypeMap } from "components/portal/guide-card";
import { GuidesList } from "components/portal/guides-list";
import { PortalHeaderCard } from "components/portal/header-card";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
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
          url: `https://thirdweb.com/portal/guides/general`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title="General"
          subtitle="For everything else"
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export async function getStaticProps() {
  const guides = (await getAllGuides()).filter(
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
