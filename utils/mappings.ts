import {
  ContractType,
  Edition,
  EditionDrop,
  Marketplace,
  NFTCollection,
  NFTDrop,
  Pack,
  Split,
  Token,
  Vote,
} from "@thirdweb-dev/sdk";

export const FeatureIconMap: Record<ContractType, StaticImageData> = {
  [NFTDrop.contractType]: require("public/assets/tw-icons/drop.png"),
  [NFTCollection.contractType]: require("public/assets/tw-icons/nft-collection.png"),
  [EditionDrop.contractType]: require("public/assets/tw-icons/drop.png"),
  [Edition.contractType]: require("public/assets/tw-icons/edition.png"),
  [Token.contractType]: require("public/assets/tw-icons/token.png"),
  [Vote.contractType]: require("public/assets/tw-icons/vote.png"),
  [Marketplace.contractType]: require("public/assets/tw-icons/marketplace.png"),
  [Pack.contractType]: require("public/assets/tw-icons/pack.png"),
  [Split.contractType]: require("public/assets/tw-icons/split.png"),
};

export const UrlMap: Record<ContractType, string> = {
  [NFTDrop.contractType]: "nft-drop",
  [NFTCollection.contractType]: "nft-collection",
  [EditionDrop.contractType]: "edition-drop",
  [Edition.contractType]: "edition",
  [Token.contractType]: "token",
  [Vote.contractType]: "vote",
  [Marketplace.contractType]: "marketplace",
  [Pack.contractType]: "pack",
  [Split.contractType]: "split",
};

export const TagToContractTypeMap = {
  "nft-collection": NFTCollection.contractType,
  edition: Edition.contractType,
  "nft-drop": NFTDrop.contractType,
  "edition-drop": EditionDrop.contractType,
  token: Token.contractType,
  marketplace: Marketplace.contractType,
  pack: Pack.contractType,
  vote: Vote.contractType,
  split: Split.contractType,
};
