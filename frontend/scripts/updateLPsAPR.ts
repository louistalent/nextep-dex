import fs from 'fs'
import BigNumber from 'bignumber.js'
import { sub, getUnixTime } from 'date-fns'

const BLOCK_SUBGRAPH_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks'
const STREAMING_FAST_ENDPOINT = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'

interface BlockResponse {
  blocks: {
    number: string
  }[]
}

interface SingleFarmResponse {
  id: string
  reserveUSD: string
  volumeUSD: string
}

interface FarmsResponse {
  farmsAtLatestBlock: SingleFarmResponse[]
  farmsOneWeekAgo: SingleFarmResponse[]
}

interface AprMap {
  [key: string]: BigNumber
}

const getWeekAgoTimestamp = () => {
  const weekAgo = sub(new Date(), { weeks: 1 })
  return getUnixTime(weekAgo)
}

const LP_HOLDERS_FEE = 0.0017
const WEEKS_IN_A_YEAR = 52.1429

