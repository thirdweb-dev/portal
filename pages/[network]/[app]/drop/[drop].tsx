import {
  MinterOnly,
  useCanCreateBulk,
  useDropActiveClaimCondition,
  useDropList,
  useDropModule,
  useDropModuleMetadata,
  useDropSupply,
} from "@3rdweb-sdk/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon, Stack, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { BulkUpload } from "components/bulk-upload/bulk-upload";
import { Card } from "components/layout/Card";
import { MintButton } from "components/module-pages/action-buttons/mint-button";
import { ModuleLayout } from "components/module-pages/module-layout";
import { ModuleItemsTable } from "components/module-pages/table";
import { ModulePageNotice } from "components/notices/ModulePageNotice";
import { MintDrawer } from "components/shared/MintDrawer";
import { MismatchButton } from "components/shared/MismatchButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";

const LazyNFTListPage: ConsolePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isBulkOpen,
    onOpen: onBulkOpen,
    onClose: onBulkClose,
  } = useDisclosure();
  const [activeTab, setActiveTab] = useState<number | undefined>(0);
  const dropAddress = useSingleQueryParam("drop");
  const activeClaimCondition = useDropActiveClaimCondition(dropAddress);
  const module = useDropModule(dropAddress);
  const metadata = useDropModuleMetadata(dropAddress);
  const data = useDropList(dropAddress);
  const { data: supplyData } = useDropSupply(dropAddress);
  const { Track } = useTrack({
    page: "drop",
    drop: dropAddress,
  });
  const canCreateBulk = useCanCreateBulk(dropAddress);

  const hasActiveClaimCondition =
    !activeClaimCondition.isLoading && activeClaimCondition.data;

  return (
    <Track>
      <MintDrawer isOpen={isOpen} onClose={onClose} module={module} />
      <BulkUpload isOpen={isBulkOpen} onClose={onBulkClose} module={module} />

      <ModuleLayout
        module={module}
        metadata={metadata}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        data={data}
        primaryAction={MintButton}
        secondaryAction={
          <MinterOnly module={module}>
            <MismatchButton
              isDisabled={!canCreateBulk.data}
              isLoading={canCreateBulk.isLoading}
              leftIcon={<Icon as={RiCheckboxMultipleBlankLine} />}
              onClick={onBulkOpen}
              colorScheme="purple"
            >
              {canCreateBulk.data ? "Bulk Create" : "Bulk Unavailable"}
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
          {!hasActiveClaimCondition && (
            <ModulePageNotice
              color="orange"
              onClick={() => setActiveTab(4)}
              action="Set Claim Condition"
              message={`
                You need to create a claim condition in order for users to claim your NFTs.
              `}
            />
          )}
          <Stack direction="row" spacing={6}>
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
          </Stack>
          {data.data && <ModuleItemsTable module={module} items={data.data} />}
        </Stack>
      </ModuleLayout>
    </Track>
  );
};

export default LazyNFTListPage;

LazyNFTListPage.Layout = AppLayout;
