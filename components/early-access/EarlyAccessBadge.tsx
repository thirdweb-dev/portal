import {
  Button,
  ButtonProps,
  Icon,
  IconButton,
  Tooltip,
  useBoolean,
  useBreakpointValue,
} from "@chakra-ui/react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { EarlyAccessCard } from "./EarlyAccessCard";
import { useEarlyAccessToken } from "./hook";

const colorArray = ["purple", "blue", "gray"];

export const EarlyAccessBadge: React.FC<ButtonProps> = (buttonProps) => {
  const earlyAccessToken = useEarlyAccessToken();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [flag, setFlag] = useBoolean();

  if (
    earlyAccessToken === undefined ||
    colorArray[earlyAccessToken] === undefined
  ) {
    return null;
  }

  return (
    <Tooltip
      boxShadow="none"
      bg="transparent"
      pointerEvents={"all"}
      isLazy
      label={
        <EarlyAccessCard
          zIndex={9999}
          w={{ base: undefined, md: "450px", lg: "600px" }}
        />
      }
      isOpen={flag}
      width="auto"
      hasArrow
      placement="auto"
    >
      <Button
        variant={isMobile ? "solid" : "ghost"}
        borderRadius="md"
        onClick={setFlag.toggle}
        _focus={isMobile ? undefined : { boxShadow: "none" }}
        as={isMobile ? IconButton : undefined}
        leftIcon={
          isMobile ? undefined : (
            <Icon as={IoShieldCheckmarkSharp} boxSize={6} />
          )
        }
        icon={
          isMobile ? (
            <Icon as={IoShieldCheckmarkSharp} boxSize={5} />
          ) : undefined
        }
        size="md"
        px={isMobile ? 0 : undefined}
        colorScheme={colorArray[earlyAccessToken]}
        {...buttonProps}
      >
        Early Access
      </Button>
    </Tooltip>
  );
};
