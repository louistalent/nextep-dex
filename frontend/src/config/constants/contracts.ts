import { ChainId } from '@pancakeswap/sdk'

export default {
  networkId: process.env.REACT_APP_CHAIN_ID,
  factory: {
    [ChainId.TESTNET]: process.env.REACT_APP_FACTORY,
    [ChainId.MAINNET]: process.env.REACT_APP_FACTORY,
  },
  masterChef: {
    [ChainId.TESTNET]: process.env.REACT_APP_MASTERCHEF,
    [ChainId.MAINNET]: process.env.REACT_APP_MASTERCHEF,
  },
  sousChef: {
    [ChainId.TESTNET]: process.env.REACT_APP_SOUSCHEF,
    [ChainId.MAINNET]: process.env.REACT_APP_SOUSCHEF,
  },
  lotteryV2: {
    [ChainId.TESTNET]: process.env.REACT_APP_LOTTERY,
    [ChainId.MAINNET]: process.env.REACT_APP_LOTTERY,
  },
  multiCall: {
    [ChainId.TESTNET]: process.env.REACT_APP_MULTICALL,
    [ChainId.MAINNET]: process.env.REACT_APP_MULTICALL,
  },
  pancakeProfile: {
    [ChainId.TESTNET]: process.env.REACT_APP_PANCAKEPROFILE,
    [ChainId.MAINNET]: process.env.REACT_APP_PANCAKEPROFILE,
  },
  pancakeRabbits: {
    [ChainId.TESTNET]: process.env.REACT_APP_PANCAKERABBITS,
    [ChainId.MAINNET]: process.env.REACT_APP_PANCAKERABBITS,
  },
  bunnyFactory: {
    [ChainId.TESTNET]: process.env.REACT_APP_BUNNYFACTORY,
    [ChainId.MAINNET]: process.env.REACT_APP_BUNNYFACTORY,
  },
  claimRefund: {
    [ChainId.TESTNET]: process.env.REACT_APP_CLAIMREFUND,
    [ChainId.MAINNET]: process.env.REACT_APP_CLAIMREFUND,
  },
  pointCenterIfo: {
    [ChainId.TESTNET]: process.env.REACT_APP_POINTCENTERIFO,
    [ChainId.MAINNET]: process.env.REACT_APP_POINTCENTERIFO,
  },
  bunnySpecial: {
    [ChainId.TESTNET]: process.env.REACT_APP_BUNNYSPECIAL,
    [ChainId.MAINNET]: process.env.REACT_APP_BUNNYSPECIAL,
  },
  tradingCompetition: {
    [ChainId.TESTNET]: process.env.REACT_APP_TRADINGCOMPETITION,
    [ChainId.MAINNET]: process.env.REACT_APP_TRADINGCOMPETITION,
  },
  easterNft: {
    [ChainId.TESTNET]: process.env.REACT_APP_EASERNFT,
    [ChainId.MAINNET]: process.env.REACT_APP_EASERNFT,
  },
  cakeVault: {
    [ChainId.TESTNET]: process.env.REACT_APP_CAKEFAULT,
    [ChainId.MAINNET]: process.env.REACT_APP_CAKEFAULT,
  },
  predictions: {
    [ChainId.TESTNET]: process.env.REACT_APP_PREDICTIONS,
    [ChainId.MAINNET]: process.env.REACT_APP_PREDICTIONS,
  },
  chainlinkOracle: {
    [ChainId.TESTNET]: process.env.REACT_APP_CHAINLINKORACLE,
    [ChainId.MAINNET]: process.env.REACT_APP_CHAINLINKORACLE,
  },
  bunnySpecialCakeVault: {
    [ChainId.TESTNET]: process.env.REACT_APP_BUNNYSPECIALCAKEFAULT,
    [ChainId.MAINNET]: process.env.REACT_APP_BUNNYSPECIALCAKEFAULT,
  },
  bunnySpecialPrediction: {
    [ChainId.TESTNET]: process.env.REACT_APP_BUNNYSPECIALPREDICTION,
    [ChainId.MAINNET]: process.env.REACT_APP_BUNNYSPECIALPREDICTION,
  },

  // tokens

  wcxs: {
    [ChainId.TESTNET]: process.env.REACT_APP_WCXS,
    [ChainId.MAINNET]: process.env.REACT_APP_WCXS,
  },
  busd: {
    [ChainId.TESTNET]: process.env.REACT_APP_BUSD,
    [ChainId.MAINNET]: process.env.REACT_APP_BUSD,
  },
  pcn: {
    [ChainId.TESTNET]: process.env.REACT_APP_PCN,
    [ChainId.MAINNET]: process.env.REACT_APP_PCN,
  },
  corn: {
    [ChainId.TESTNET]: process.env.REACT_APP_CORN,
    [ChainId.MAINNET]: process.env.REACT_APP_CORN,
  },
  cxsPcnLp: {
    [ChainId.TESTNET]: process.env.REACT_APP_CXSPCNLP,
    [ChainId.MAINNET]: process.env.REACT_APP_CXSPCNLP,
  },
  cxsBusdLp: {
    [ChainId.TESTNET]: process.env.REACT_APP_CXSBUSDLP,
    [ChainId.MAINNET]: process.env.REACT_APP_CXSBUSDLP,
  }
}
