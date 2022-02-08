import { useWeb3 } from "@3rdweb/hooks";
import { ClaimConditionFactory, DropModule } from "@3rdweb/sdk";
import { useMemo } from "react";
import { DropTokenInput } from "schema/tokens";
import invariant from "ts-invariant";
import { converPropertiesToObject } from "utils/propertiesConverter";
import { dropKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";

export function useDropModule(moduleAddress?: string | null) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getDropModule(moduleAddress);
  }, [moduleAddress, sdk]);
}

export function useDropModuleMetadata(moduleAddress?: string | null) {
  return useModuleMetadata(useDropModule(moduleAddress));
}

export function useDropList(moduleAddress?: string) {
  const dropModule = useDropModule(moduleAddress);
  return useQueryWithNetwork(
    dropKeys.list(moduleAddress),
    () => dropModule?.getAll({ count: 500, start: 0 }),
    {
      enabled: !!dropModule && !!moduleAddress,
    },
  );
}

export function useDropSupply(moduleAddress?: string) {
  const dropModule = useDropModule(moduleAddress);
  return useQueryWithNetwork(
    dropKeys.supply(moduleAddress),
    async () => {
      return {
        totalSupply: (await dropModule?.totalSupply())?.toNumber() || 0,
        totalClaimedSupply:
          (await dropModule?.totalClaimedSupply())?.toNumber() || 0,
        totalUnclaimedSupply:
          (await dropModule?.totalUnclaimedSupply())?.toNumber() || 0,
      };
    },
    {
      enabled: !!dropModule && !!moduleAddress,
    },
  );
}

export function useDropActiveClaimCondition(moduleAddress?: string) {
  const dropModule = useDropModule(moduleAddress);
  return useQueryWithNetwork(
    dropKeys.activeClaimCondition(moduleAddress),
    async () => {
      return await dropModule?.getActiveClaimCondition();
    },
    {
      enabled: !!dropModule && !!moduleAddress,
    },
  );
}
export function useDropBalance(moduleAddress?: string) {
  const dropModule = useDropModule(moduleAddress);
  const { address } = useWeb3();
  return useQueryWithNetwork(
    dropKeys.balanceOf(moduleAddress, address),
    async () => {
      return await dropModule?.balanceOf(address || "");
    },
    {
      enabled: !!dropModule && !!moduleAddress && !!address,
    },
  );
}
export function useCanCreateBulk(moduleAddress?: string) {
  const dropModule = useDropModule(moduleAddress);
  const { address } = useWeb3();
  return useQueryWithNetwork(
    dropKeys.canCreateBulk(moduleAddress),
    async () => {
      return await dropModule?.canCreateBatch();
    },
    {
      enabled: !!dropModule && !!moduleAddress && !!address,
    },
  );
}

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useDropMintMutation(module?: DropModule) {
  return useMutationWithInvalidate(
    async (data: DropTokenInput) => {
      invariant(module, "module is required");
      return await module.lazyMint({
        ...data,
        properties: converPropertiesToObject(data.properties),
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          dropKeys.canCreateBulk(module?.address),
          dropKeys.list(module?.address),
          dropKeys.supply(module?.address),
        ]);
      },
    },
  );
}

export function useDropBatchMint(module?: DropModule) {
  return useMutationWithInvalidate(
    async (data: DropTokenInput[]) => {
      invariant(module, "module is required");
      return await module.createBatch(
        data.map((d) => ({
          ...d,
          properties: converPropertiesToObject(d.properties),
        })),
      );
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          dropKeys.canCreateBulk(module?.address),
          dropKeys.list(module?.address),
          dropKeys.supply(module?.address),
        ]);
      },
    },
  );
}

export function useDropClaimMutation(module?: DropModule) {
  return useMutationWithInvalidate(
    async () => {
      invariant(module, "module is required");

      return await module.claim(1);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          dropKeys.list(module?.address),
          dropKeys.detail(module?.address),
        ]);
      },
    },
  );
}

export function useDropClaimConditionMutation(module?: DropModule) {
  return useMutationWithInvalidate(
    async (data: ClaimConditionFactory) => {
      invariant(module, "module is required");
      return await module.setClaimConditions(data);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([dropKeys.activeClaimCondition(module?.address)]);
      },
    },
  );
}
