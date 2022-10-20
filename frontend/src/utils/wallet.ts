// Set of helper functions to facilitate wallet setup

import { BASE_BSC_SCAN_URL, BASE_URL } from 'config'
import { nodes } from './getRpcUrl';
import ContractAddress from '../config/constants/contracts';

/**
 * Prompt the user to add BSC as a network on Nextep wallet, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    const chainId = parseInt(ContractAddress.networkId, 10)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'NExtep Testnet',
            nativeCurrency: {
              name: 'CXS',
              symbol: 'CXS',
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Nextep wallet:', error)
      return false
    }
  } else {
    console.error("Can't setup the Deam network on Nextep wallet because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to Nextep wallet
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${BASE_URL}/images/tokens/${tokenAddress}.png`,
      },
    },
  })

  return tokenAdded
}
