import { SignatureLike } from "@ethersproject/bytes";
import {
  PermitBatchTransferFromData,
  PermitTransferFromData,
} from "@uniswap/permit2-sdk";
import { BigNumber } from "ethers";

export type BlockOverrides = { number?: string } | undefined;

// General interface implemented by off chain orders
export interface OffChainOrder {
  chainId: number;

  /**
   * Returns the abi encoded order
   * @return The abi encoded serialized order which can be submitted on-chain
   */
  serialize(): string;
  /**
   * Recovers the given signature, returning the address which created it
   *  * @param signature The signature to recover
   *  * @returns address The address which created the signature
   */
  getSigner(signature: SignatureLike): string;
  /**
   * Returns the data for generating the maker EIP-712 permit signature
   * @return The data for generating the maker EIP-712 permit signature
   */
  permitData(): PermitTransferFromData | PermitBatchTransferFromData;
  /**
   * Returns the order hash
   * @return The order hash which is used as a key on-chain
   */
  hash(): string;

  /**
   * Returns any block overrides to be applied when quoting the order on chain
   * @return The block overrides
   */
  get blockOverrides(): BlockOverrides
}

export type TokenAmount = {
  readonly token: string;
  readonly amount: BigNumber;
};

export type ResolvedRelayFee = {
  readonly token: string;
  readonly amount: BigNumber;
};

export type OrderInfo = {
  reactor: string;
  swapper: string;
  nonce: BigNumber;
  deadline: number;
  additionalValidationContract: string;
  additionalValidationData: string;
};

// options to resolve an order
export type OrderResolutionOptions = {
  timestamp: number;
  filler?: string;
};

export type PriorityOrderResolutionOptions = {
  priorityFee: BigNumber;
  currentBlock?: BigNumber;
};

export type DutchOutput = {
  readonly token: string;
  readonly startAmount: BigNumber;
  readonly endAmount: BigNumber;
  readonly recipient: string;
};

export type DutchOutputJSON = Omit<DutchOutput, "startAmount" | "endAmount"> & {
  startAmount: string;
  endAmount: string;
};

export type DutchInput = {
  readonly token: string;
  readonly startAmount: BigNumber;
  readonly endAmount: BigNumber;
};

export type DutchInputJSON = Omit<DutchInput, "startAmount" | "endAmount"> & {
  startAmount: string;
  endAmount: string;
};

export type PriorityInput = {
  readonly token: string;
  readonly amount: BigNumber;
  readonly mpsPerPriorityFeeWei: BigNumber;
};

export type PriorityOutput = PriorityInput & {
  readonly recipient: string;
};

export type PriorityInputJSON = Omit<
  PriorityInput,
  "amount" | "mpsPerPriorityFeeWei"
> & {
  amount: string;
  mpsPerPriorityFeeWei: string;
};

export type PriorityOutputJSON = PriorityInputJSON & {
  recipient: string;
};
