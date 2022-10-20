import ContractAddress from '../contracts';

export default {
  "name": "NextepDex Default List",
  "timestamp": "2022-10-07T00:00:00Z",
  "version": {
    "major": 3,
    "minor": 0,
    "patch": 0
  },
  "tags": {},
  "logoURI": "/images/token_svg/CXS.png",
  "keywords": [
    "pancake",
    "default"
  ],
  "tokens": [
    {
      "name": "WCXS Token",
      "symbol": "WCXS",
      "address": `${ContractAddress.wcxs[ContractAddress.networkId]}`,
      "chainId": Number(ContractAddress.networkId),
      "decimals": 18,
      // "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.wneon[ContractAddress.networkId].toLowerCase()}.svg`
    },
    {
      "name": "Pegged BUSD",
      "symbol": "BUSD",
      "address": `${ContractAddress.busd[ContractAddress.networkId].toLowerCase()}`,
      "chainId": Number(ContractAddress.networkId),
      "decimals": 18,
      // "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.busd[ContractAddress.networkId].toLowerCase()}.svg`
    },
    {
      "name": "PCN Token",
      "symbol": "PCN",
      "address": `${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}`,
      "chainId": Number(ContractAddress.networkId),
      "decimals": 18,
      // "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}.svg`
    },
    // {
    //   "name": "Bitcoin",
    //   "symbol": "BTC",
    //   "address": `${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}.svg`
    // },
    // {
    //   "name": "Ether",
    //   "symbol": "ETH",
    //   "address": `${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}.svg`
    // },

    // {
    //   "name": "Dogecoin",
    //   "symbol": "D",
    //   "address": `${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}.svg`
    // },
    // {
    //   "name": "Binance",
    //   "symbol": "BNB",
    //   "address": `${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.pcn[ContractAddress.networkId].toLowerCase()}.svg`
    // },
    // {
    //   "name": "corn Token",
    //   "symbol": "CORN",
    //   "address": `${String(ContractAddress.corn[ContractAddress.networkId])}`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "/images/fantom.jpg"
    // },
    // {
    //   "name": "pegged ETH",
    //   "symbol": "ETH",
    //   "address": `0xeD330F35D1e4334CA1beCE39Faad839589D26D67`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": `https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/${ContractAddress.eth[ContractAddress.networkId].toLowerCase()}.svg`
    // },
    // {
    //   "name": "pegged USDT",
    //   "symbol": "USDT",
    //   "address": `0x55108d5c2C8EF54B4D2f2c7442E90e4B71fb1e3E`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/usdt.svg"
    // },
    // {
    //   "name": "pegged USDC",
    //   "symbol": "USDC",
    //   "address": `0xcA85FdCc0d1F0eaba22eE46609E151566a331Aa7`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/usdc.svg"
    // },
    // {
    //   "name": "pegged TUSD",
    //   "symbol": "TUSD",
    //   "address": `0x699ABb762e708f5e24772bDE77694Be1cAfAFB72`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/tusd.svg"
    // },
    // {
    //   "name": "pegged WBTC",
    //   "symbol": "WBTC",
    //   "address": `0xcd3248Ba831e48DA07221Dcd1a804BCFb42e78d2`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/wbtc.svg"
    // },
    // {
    //   "name": "pegged LINK",
    //   "symbol": "LINK",
    //   "address": `0x2dAbaad7ba131e2c85d7a81e90223D324c86563f`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/link.svg"
    // },
    // {
    //   "name": "pegged UNI",
    //   "symbol": "UNI",
    //   "address": `0x443827058dc895736bdd9AD7666CE7b3Fd60931e`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/uni.svg"
    // },
    // {
    //   "name": "pegged BNB",
    //   "symbol": "BNB",
    //   "address": `0xB5E287c915a7c093fdaF64a5b6b44230F2082917`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/bnb.svg"
    // },
    // {
    //   "name": "Pegged AVAX",
    //   "symbol": "AVAX",
    //   "address": `0x227b92D5cc3b5b2E4545b2AdAAcCE112821e9442`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/avax.svg"
    // },
    // {
    //   "name": "pegged MATIC",
    //   "symbol": "MATIC",
    //   "address": `0x89dd49E4E99771D512de60293120d2EfDE8388f3`,
    //   "chainId": Number(ContractAddress.networkId),
    //   "decimals": 18,
    //   "logoURI": "https://raw.githubusercontent.com/Neon-Blockchain/token-icons/main/icons/matic.svg"
    // }
  ]
}