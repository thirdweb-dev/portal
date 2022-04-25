import { Avatar, AvatarGroup } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Box, BoxProps, Heading, Stack, Text } from "@chakra-ui/layout";
import { LinkButton } from "components/shared/LinkButton";
import { NextLink } from "components/shared/NextLink";
import { SiTwitter } from "react-icons/si";
import { Doc, Guide, TocHeading } from "utils/portalTypes";

interface GuideTocProps extends BoxProps {
  frontMatter: Guide | Doc;
  headings: TocHeading[];
  isMobile?: boolean;
  docs?: boolean;
}

export const GUIDE_TOC_WIDTH = "210px";

export const GuideToc: React.FC<GuideTocProps> = ({
  frontMatter,
  headings,
  isMobile,
  docs,
  ...rest
}) => {
  return (
    <Box
      w={{ base: "full", md: GUIDE_TOC_WIDTH }}
      position="sticky"
      flexShrink={0}
      top="0"
      alignSelf="flex-start"
      display={
        isMobile ? { base: "block", md: "none" } : { base: "none", md: "block" }
      }
      {...rest}
    >
      {!docs && (
        <Stack
          mt={5}
          direction={{ base: "row", md: "column" }}
          align={{ base: "center", md: "flex-start" }}
        >
          <AvatarGroup size="md" max={2}>
            <Avatar
              name={frontMatter.authorTwitter}
              src={frontMatter.authorAvatar}
            />
            {frontMatter?.authorAvatar2 && (
              <Avatar
                name={frontMatter.authorTwitter2}
                src={frontMatter.authorAvatar2}
              />
            )}
          </AvatarGroup>
          <Heading size="title.sm">{frontMatter.author}</Heading>
          <Stack direction="row">
            <IconButton
              as={LinkButton}
              isExternal
              noIcon
              href={frontMatter.authorTwitter}
              size="sm"
              colorScheme="whiteAlpha"
              color="gray.500"
              aria-label="twitter"
              icon={<Icon boxSize="1.2rem" as={SiTwitter} />}
            />
            {frontMatter?.authorTwitter2 && (
              <IconButton
                as={LinkButton}
                isExternal
                noIcon
                href={frontMatter.authorTwitter2}
                size="sm"
                colorScheme="whiteAlpha"
                color="gray.500"
                aria-label="twitter"
                icon={<Icon boxSize="1.2rem" as={SiTwitter} />}
              />
            )}
          </Stack>
        </Stack>
      )}
      {!isMobile && headings.length > 0 && (
        <Stack
          spacing={3.5}
          borderColor="gray.100"
          flexShrink={0}
          overflowY={"scroll"}
          height="100vh"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          mb={6}
        >
          <Text textTransform="uppercase" size="label.md" py={2} mt={5}>
            Contents
          </Text>
          {headings.map((heading) => (
            <NextLink
              key={heading.link}
              href={heading.link}
              _hover={{ textDecoration: "none" }}
            >
              <Text
                pl={heading.level === 3 ? 6 : 0}
                size="label.md"
                color="gray.500"
                lineHeight="150%"
                _hover={{ color: "primary.500" }}
              >
                {heading.text}
              </Text>
            </NextLink>
          ))}
        </Stack>
      )}
    </Box>
  );
};
