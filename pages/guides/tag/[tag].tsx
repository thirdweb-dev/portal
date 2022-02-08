import { Stack } from "@chakra-ui/layout";
import { PortalLayout } from "components/app-layouts/portal";
import { GuidesList } from "components/portal/guides-list";
import { PortalHeaderCard } from "components/portal/header-card";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { ConsolePage } from "pages/_app";
import { getAllGuides } from "utils/mdxUtils";
import { GuideData } from "utils/portalTypes";

interface TagPageProps {
  tag: string;
  guides: GuideData[];
}

const TagPage: ConsolePage<TagPageProps> = ({ guides }) => {
  const tag = useSingleQueryParam("tag") as string;
  const { Track } = useTrack({
    page: "guide",
    tag,
  });

  return (
    <Track>
      <NextSeo
        title={`${tag.replace(/-/g, " ")} Guides | Portal`}
        openGraph={{
          title: `${tag.replace(/-/g, " ")} | Portal | thirdweb`,
          description: `${tag.replace(/-/g, " ")} guides and tutorials`,
          url: `https://portal.thirdweb.com/tag/${tag}`,
        }}
      />
      <Stack spacing={20}>
        <PortalHeaderCard
          title={`Guides | ${tag.replace(/-/g, " ")}`}
          src="/assets/portal/module-header.png"
        />
        <GuidesList title="All guides" guides={guides} />
      </Stack>
    </Track>
  );
};

export default TagPage;

TagPage.Layout = PortalLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const guides = getAllGuides().filter((guide) =>
    guide.metadata.tags.some((tag: string) => tag === params?.tag),
  );

  return {
    props: {
      guides,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllGuides()
    .map((guide) =>
      guide.metadata.tags.map((tag: string) => ({ params: { tag } })),
    )
    .flat();

  return {
    paths,
    fallback: false,
  };
};
