import { ChainId } from '@pancakeswap/sdk';
import tokens from './tokens';
import { FarmConfig } from './types';
import ContractAddress from './contracts';

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
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
    lpSymbol: 'USDT-CXS LP',
    lpAddresses: {
      [ChainId.MAINNET]: String(ContractAddress.cxsBusdLp[ChainId.MAINNET]),
      [ChainId.TESTNET]: String(ContractAddress.cxsBusdLp[ChainId.TESTNET]),
    },
    token: tokens.busd,
    quoteToken: tokens.wcxs,
  }
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */

]

export default farms
