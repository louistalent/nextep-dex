import { ChainId } from '@pancakeswap/sdk';
import tokens from './tokens'
import { FarmConfig } from './types'
import ContractAddress from './contracts';

const priceHelperLps: FarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absense of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: 1,
    lpSymbol: 'PCN-CXS LP',
    lpAddresses: {
      [ChainId.MAINNET]: String(ContractAddress.cxsPcnLp[ChainId.MAINNET]),
      [ChainId.TESTNET]: String(ContractAddress.cxsPcnLp[ChainId.TESTNET]),
    },
    token: tokens.pcn,
    quoteToken: tokens.wcxs,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-CXS LP',
    lpAddresses: {
      [ChainId.MAINNET]: String(ContractAddress.cxsBusdLp[ChainId.MAINNET]),
      [ChainId.TESTNET]: String(ContractAddress.cxsBusdLp[ChainId.TESTNET]),
    },
    token: tokens.busd,
    quoteToken: tokens.wcxs,
  },
]

export default priceHelperLps
