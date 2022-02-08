import {
  Box,
  Container,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { BlogLayout } from "components/app-layouts/blog";
import { ChakraNextImage } from "components/Image";
import { PORTAL_SIDEBAR_WIDTH } from "components/layout/portal-shell/Sidebar";
import { GuideCta } from "components/portal/guide-cta";
import { GuideToc, GUIDE_TOC_WIDTH } from "components/portal/guide-toc";
import { GrayTag } from "components/portal/tag";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ConsolePage } from "pages/_app";
import { getAllBlogPaths, getAllBlogs } from "utils/mdxUtils";
import { Guide, TocHeading } from "utils/portalTypes";
import { pxToRem } from "utils/pxFunctions";

dayjs.extend(localizedFormat);

interface BlogPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: Guide;
  headings: TocHeading[];
}

const BlogPage: ConsolePage<BlogPageProps> = ({
  source,
  frontMatter,
  headings,
}) => {
  const router = useRouter();
  const slug = useSingleQueryParam("slug");
  const { Track } = useTrack({
    page: "blog",
    title: frontMatter.title,
    slug,
  });

  const ogImage = `https://thirdweb.com/_next/image?url=${frontMatter.image.replace(
    /\//g,
    "%2F",
  )}&w=1200&q=90`;

  return (
    <Track>
      <NextSeo
        title={frontMatter.title}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.summary,
          url: `https://thirdweb.com${router.asPath}`,
          type: "article",
          article: {
            publishedTime: new Date(frontMatter.date).toISOString(),
            modifiedTime: frontMatter.updated
              ? new Date(frontMatter.updated).toISOString()
              : new Date(frontMatter.date).toISOString(),
            authors: frontMatter?.authorTwitter2
              ? [frontMatter.authorTwitter, frontMatter.authorTwitter2]
              : [frontMatter.authorTwitter],
            tags: frontMatter.tags,
          },
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: frontMatter.title,
            },
          ],
        }}
      />
      <Stack direction="row" maxW="100%" position="absolute" left={0}>
        <Container
          flexShrink={1}
          maxW={{
            base: "100%",
            lg: `min(${pxToRem(
              800,
            )}, calc(100vw - ${PORTAL_SIDEBAR_WIDTH} - ${GUIDE_TOC_WIDTH} - var(--chakra-space-20)))`,
          }}
        >
          <Box borderRadius="lg" overflow="hidden" mb={12}>
            <ChakraNextImage
              // because it's the hero image, load this first
              priority
              src={frontMatter.image}
              alt={frontMatter.title}
              maxWidth="100%"
              width="1200px"
              height="630px"
              objectFit="cover"
            />
          </Box>
          <Heading size="display.sm" as="h1">
            {frontMatter.title}
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            justify={{ base: "inherit", md: "space-between" }}
            mb={10}
            mt={3}
          >
            <Stack direction="row" wrap="wrap">
              {frontMatter?.tags.map((tag) => (
                <GrayTag key={tag} tag={tag} />
              ))}
            </Stack>
            {frontMatter.updated ? (
              <Text>
                Last updated:{" "}
                <Text display="inline" size="label.lg">
                  {dayjs(frontMatter.updated).format("LL")}
                </Text>
              </Text>
            ) : (
              <Text>
                Published on:{" "}
                <Text size="label.lg" display="inline">
                  {dayjs(frontMatter.date).format("LL")}
                </Text>
              </Text>
            )}
          </Stack>
          <Heading size="subtitle.md">{frontMatter.summary}</Heading>
          <GuideToc frontMatter={frontMatter} headings={headings} isMobile />
          <MDXRemote {...source} />
          <Divider my={12} w="100%" />
          <GuideCta />
        </Container>
        <GuideToc frontMatter={frontMatter} headings={headings} />
      </Stack>
    </Track>
  );
};

export default BlogPage;

BlogPage.Layout = BlogLayout;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allBlogs = await getAllBlogs();
  const blog = allBlogs.find((g) => g.slug === params?.slug);

  if (!blog) {
    return {
      notFound: true,
      revalidate: 300,
    };
  }

  return {
    props: {
      source: blog.mdxContent,
      frontMatter: blog.metadata,
      headings: blog.headings,
    },
    revalidate: 300,
  };
};

export const getStaticPaths = async () => {
  const paths = (await getAllBlogPaths())
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};
