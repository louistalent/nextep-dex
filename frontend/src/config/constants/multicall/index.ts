import { ChainId } from '@pancakeswap/sdk'
import MULTICALL_ABI from './abi.json';
import ContractAddress from '../contracts';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: String(ContractAddress.multiCall[ChainId.MAINNET]),
  [ChainId.TESTNET]: String(ContractAddress.multiCall[ChainId.TESTNET]),
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
