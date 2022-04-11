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
import NextLink from "next/link";
import { DiJavascript1 } from "react-icons/di";
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
  return (
    <Card
      position="relative"
      as={LinkBox}
      {...restCardProps}
      borderWidth={2}
      transition="all 0.2s ease-in-out"
      _hover={{ borderColor: "blue.600" }}
    >
      <Stack spacing={3}>
        <AspectRatio ratio={1} w={largeIcon ? "100px" : "30px"}>
          <Box>
            {src ? (
              <ChakraNextImage src={src} alt={alt} w="100%" />
            ) : (
              <Icon
                as={type === "docs" ? DiJavascript1 : MdMenuBook}
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
