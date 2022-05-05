import type { BigNumber } from "bignumber.js";
import type {
  TransactionCommon,
  TransactionCommonRaw,
} from "../../types/transaction";

export type NetworkInfo = {
  family: "stellar";
  fees: BigNumber;
  baseFee: BigNumber;
  baseReserve: BigNumber;
  networkCongestionLevel?: NetworkCongestionLevel;
};

export type NetworkInfoRaw = {
  family: "stellar";
  fees: string;
  baseFee: string;
  baseReserve: string;
  networkCongestionLevel?: NetworkCongestionLevel;
};

export enum NetworkCongestionLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export const StellarMemoType = [
  "NO_MEMO",
  "MEMO_TEXT",
  "MEMO_ID",
  "MEMO_HASH",
  "MEMO_RETURN",
];

export type Transaction = TransactionCommon & {
  family: "stellar";
  networkInfo: NetworkInfo | null | undefined;
  fees: BigNumber | null | undefined;
  baseReserve: BigNumber | null | undefined;
  memoType: string | null | undefined;
  memoValue: string | null | undefined;
  operationType: "payment" | "changeTrust";
  assetCode: string | undefined;
  assetIssuer: string | undefined;
  assetType: string | undefined;
};

export type TransactionRaw = TransactionCommonRaw & {
  family: "stellar";
  networkInfo: NetworkInfoRaw | null | undefined;
  fees: string | null | undefined;
  baseReserve: string | null | undefined;
  memoType: string | null | undefined;
  memoValue: string | null | undefined;
  operationType: "payment" | "changeTrust";
  assetCode: string | undefined;
  assetIssuer: string | undefined;
  assetType: string | undefined;
};

export type BalanceAsset = {
  balance: string;
  limit: string;
  buying_liabilities: string;
  selling_liabilities: string;
  last_modified_ledger: number;
  is_authorized: boolean;
  is_authorized_to_maintain_liabilities: boolean;
  asset_type: string;
  asset_code: string;
  asset_issuer: string;
  liquidity_pool_id?: string;
};
