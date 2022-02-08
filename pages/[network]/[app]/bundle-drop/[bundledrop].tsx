import {
  MinterOnly,
  useBundleDropList,
  useBundleDropModule,
  useBundleDropModuleMetadata,
} from "@3rdweb-sdk/react";
import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon, Stack } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { BulkUpload } from "components/bulk-upload/bulk-upload";
import { MintButton } from "components/module-pages/action-buttons/mint-button";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { MintDrawer } from "components/shared/MintDrawer";
import { MismatchButton } from "components/shared/MismatchButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";

const LazyNFTListPage: ConsolePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isBulkOpen,
    onOpen: onBulkOpen,
    onClose: onBulkClose,
  } = useDisclosure();

  const bundleDropAddress = useSingleQueryParam("bundledrop");
  const module = useBundleDropModule(bundleDropAddress);
  const metadata = useBundleDropModuleMetadata(bundleDropAddress);
  const data = useBundleDropList(bundleDropAddress);
  // const { data: supplyData } = useDropSupply(bundleDropAddress);
  const { Track } = useTrack({
    page: "bundle-drop",
    drop: bundleDropAddress,
  });

  return (
    <Track>
      <MintDrawer
        isOpen={isOpen}
        onClose={onClose}
        module={module as EitherBaseModuleType}
      />
      <BulkUpload isOpen={isBulkOpen} onClose={onBulkClose} module={module} />

      <ModuleLayout
        module={module}
        metadata={metadata}
        data={data}
        primaryAction={MintButton}
        secondaryAction={
          <MinterOnly module={module}>
            <MismatchButton
              leftIcon={<Icon as={RiCheckboxMultipleBlankLine} />}
              onClick={onBulkOpen}
              colorScheme="purple"
            >
              Bulk Create
            </MismatchButton>
          </MinterOnly>
        }
        emptyState={{
          title:
            "You have not added any drops yet, let's add your first one to get started!",
          action: {
            icon: FiPlus,
            onClick: onOpen,
            label: "Add your first drop",
            requiredRole: "minter",
          },
        }}
      >
        <Stack spacing={6}>
          {/* <Stack direction="row" spacing={6}>
            <Card as={Stat}>
              <StatLabel>Total Supply</StatLabel>
              <StatNumber>{supplyData?.totalSupply}</StatNumber>
            </Card>
            <Card as={Stat}>
              <StatLabel>Claimed Supply</StatLabel>
              <StatNumber>{supplyData?.totalClaimedSupply}</StatNumber>
            </Card>
            <Card as={Stat}>
              <StatLabel>Unclaimed Supply</StatLabel>
              <StatNumber>{supplyData?.totalUnclaimedSupply}</StatNumber>
            </Card>
          </Stack> */}
          {data.data && <ModuleItemsTable module={module} items={data.data} />}
        </Stack>
      </ModuleLayout>
    </Track>
  );
};

export default LazyNFTListPage;

LazyNFTListPage.Layout = AppLayout;
