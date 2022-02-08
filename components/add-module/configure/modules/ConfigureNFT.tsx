import { Stack } from "@chakra-ui/react";
import { ConfigureRoyalty } from "../ConfigureRoyalty";
import { ConfigureSymbol } from "../ConfigureSymbol";

export const ConfigureNFT: React.FC = () => {
  return (
    <Stack spacing={4}>
      <ConfigureSymbol />
      <ConfigureRoyalty />
    </Stack>
  );
};
