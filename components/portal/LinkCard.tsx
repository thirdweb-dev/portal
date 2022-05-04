import {
  AspectRatio,
  Box,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ChakraNextImage, ChakraNextImageProps } from "components/Image";
import { Card, CardProps } from "components/layout/Card";
import { useTrack } from "hooks/analytics/useTrack";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { DiJavascript1, DiPython } from "react-icons/di";
import { MdMenuBook } from "react-icons/md";

export interface LinkCardProps extends CardProps {
  href: string;
  src: ChakraNextImageProps["src"];
  alt: string;
  title: string;
  subtitle?: string;
  largeIcon?: boolean;
  type?: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  href,
  src,
  alt,
  title,
  subtitle,
  largeIcon,
  type,
  ...restCardProps
}) => {
  const router = useRouter();
  const { trackEvent } = useTrack({
    page: router.asPath === "/" ? "portal" : router.asPath,
  });

  return (
    <Card
      position="relative"
      as={LinkBox}
      {...restCardProps}
      borderWidth={2}
      transition="all 0.2s ease-in-out"
      _hover={{ borderColor: "blue.600" }}
      onClick={() =>
        trackEvent({
          category: router.asPath === "/" ? "landing" : "link-card",
          action: "click",
          label: title,
        })
      }
    >
      <div>HELLOOOOO 111111</div>
      <Stack spacing={3}>
        <AspectRatio ratio={1} w={largeIcon ? "100px" : "30px"}>
          <Box>
            {src ? (
              <ChakraNextImage src={src} alt={alt} w="100%" />
            ) : (
              <Icon
                as={
                  type === "guides"
                    ? MdMenuBook
                    : type === "typescript-docs"
                    ? DiJavascript1
                    : DiPython
                }
                boxSize={8}
              />
            )}
          </Box>
        </AspectRatio>
        <Stack spacing={1}>
          <NextLink href={href} passHref>
            <LinkOverlay>
              <Heading size="title.sm" as="h3">
                {title}
              </Heading>
            </LinkOverlay>
          </NextLink>
          {subtitle && <Text size="body.md">{subtitle}</Text>}
        </Stack>
      </Stack>
    </Card>
  );
};
