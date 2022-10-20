import { ChainId } from '@pancakeswap/sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://testnet.nxchainscan.com:4444/',
  [ChainId.TESTNET]: 'https://testnet.nxchainscan.com:4444/',
}

export default NETWORK_URLS
