import { Address, BigDecimal, dataSource } from "@graphprotocol/graph-ts";

import { _MarketList, LendingProtocol } from "../../generated/schema";
import {
  ProtocolType,
  LendingType,
  PermissionType,
  RiskType,
  CollateralizationType,
  INT_ZERO,
} from "../sdk/constants";

const MORPHO_BLUE_ADDRESS = new Map<string, Address>();
MORPHO_BLUE_ADDRESS.set(
  "mainnet",
  Address.fromString("0x541cA61EE5f963B150A8c85e774d7bF8236b431E")
);
MORPHO_BLUE_ADDRESS.set(
  "sepolia",
  Address.fromString("0x541cA61EE5f963B150A8c85e774d7bF8236b431E")
);
MORPHO_BLUE_ADDRESS.set(
  "polygon-amoy",
  Address.fromString("0x8ed6929bda0679A59bE264463536c90e8cCa0c06")
);
MORPHO_BLUE_ADDRESS.set(
  "previewnet",
  Address.fromString("0xD6D2f23EcD4615264AF70cB2295B5b9DbA8BDbf1")
);

let protocol: LendingProtocol | null = null;
export function getProtocol(): LendingProtocol {
  if (protocol !== null) return protocol!;
  protocol = LendingProtocol.load(
    MORPHO_BLUE_ADDRESS.get(dataSource.network())
  );
  if (protocol) return protocol!;
  protocol = initBlue();
  return protocol!;
}

function initBlue(): LendingProtocol {
  const protocol = new LendingProtocol(
    MORPHO_BLUE_ADDRESS.get(dataSource.network())
  );
  protocol.protocol = "Morpho";
  protocol.name = "Morpho Blue";
  protocol.slug = "morpho-blue";
  protocol.schemaVersion = "3.0.0";
  protocol.subgraphVersion = "0.0.7";
  protocol.methodologyVersion = "1.0.0";
  protocol.network = dataSource.network().toUpperCase();
  protocol.type = ProtocolType.LENDING;
  protocol.lendingType = LendingType.POOLED;
  protocol.poolCreatorPermissionType = PermissionType.PERMISSIONLESS;
  protocol.riskType = RiskType.ISOLATED;
  protocol.collateralizationType = CollateralizationType.OVER_COLLATERALIZED;
  protocol.cumulativeUniqueUsers = INT_ZERO;
  protocol.cumulativeUniqueDepositors = INT_ZERO;
  protocol.cumulativeUniqueBorrowers = INT_ZERO;
  protocol.cumulativeUniqueLiquidators = INT_ZERO;
  protocol.cumulativeUniqueLiquidatees = INT_ZERO;

  protocol.totalValueLockedUSD = BigDecimal.zero();
  protocol.cumulativeSupplySideRevenueUSD = BigDecimal.zero();
  protocol.cumulativeProtocolSideRevenueUSD = BigDecimal.zero();
  protocol.cumulativeTotalRevenueUSD = BigDecimal.zero();
  // protocol.fees
  // protocol.revenueDetail
  protocol.totalDepositBalanceUSD = BigDecimal.zero();
  protocol.cumulativeDepositUSD = BigDecimal.zero();
  protocol.totalBorrowBalanceUSD = BigDecimal.zero();
  protocol.cumulativeBorrowUSD = BigDecimal.zero();
  protocol.cumulativeLiquidateUSD = BigDecimal.zero();
  protocol.totalPoolCount = INT_ZERO;
  protocol.openPositionCount = INT_ZERO;
  protocol.cumulativePositionCount = INT_ZERO;
  protocol.transactionCount = INT_ZERO;
  protocol.depositCount = INT_ZERO;
  protocol.withdrawCount = INT_ZERO;
  protocol.borrowCount = INT_ZERO;
  protocol.repayCount = INT_ZERO;
  protocol.transferCount = INT_ZERO;
  protocol.flashloanCount = INT_ZERO;
  protocol.liquidationCount = INT_ZERO;

  protocol.feeRecipient = Address.zero();
  protocol.owner = Address.zero();
  protocol.irmEnabled = [];
  protocol.lltvEnabled = [];

  protocol.save();
  const marketList = new _MarketList(protocol.id);
  marketList.markets = [];
  marketList.save();

  return protocol;
}
