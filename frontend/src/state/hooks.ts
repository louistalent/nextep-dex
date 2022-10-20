import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'
import { minBy, orderBy } from 'lodash'
import { useAppDispatch } from 'state'
import { farmsConfig } from 'config/constants'
import { simpleRpcProvider } from 'utils/providers'
import { getBalanceAmount, formatBigNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import useRefresh from 'hooks/useRefresh'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import tokens from 'config/constants/tokens'
import { multicallv2 } from 'utils/multicall'
import cakeAbi from 'config/abi/cake.json'
import factoryAbi from 'config/abi/factory.json'
import lpAbi from 'config/abi/lpToken.json'
import { getMasterchefContract, getFactoryContract } from 'utils/contractHelpers';

import {
  fetchFarmsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchCakeVaultPublicData,
  fetchCakeVaultUserData,
  fetchCakeVaultFees,
  setBlock,
} from './actions'
import {
  State,
  Farm,
  Pool,
  ProfileState,
  AchievementState,
  FarmsState,
  NodeRound,
  ReduxNodeLedger,
  NodeLedger,
  ReduxNodeRound,
} from './types'
import { fetchProfile } from './profile'
import { transformPool } from './pools/helpers'
import { fetchPoolsStakingLimitsAsync } from './pools'
import { fetchFarmUserDataAsync, nonArchivedFarms } from './farms'


export const usePollFarmsData = (includeArchive = false) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    const farmsToFetch = includeArchive ? farmsConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchFarmsPublicDataAsync(pids))

    if (account) {
      dispatch(fetchFarmUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}

/**
 * Fetches the "core" farm data used globally
 * 251 = CAKE-BNB LP
 * 252 = BUSD-BNB LP
 */
export const usePollCoreFarmData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync([1, 2]))
  }, [dispatch, fastRefresh])
}

export const usePollBlockNumber = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const interval = setInterval(async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = (): FarmsState => {
  const farms = useSelector((state: State) => state.farms)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromLpSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : BIG_ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : BIG_ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : BIG_ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : BIG_ZERO,
  }
}

// Return a farm for a given token symbol. The farm is filtered based on attempting to return a farm with a quote token from an array of preferred quote tokens
export const useFarmFromTokenSymbol = (tokenSymbol: string, preferredQuoteTokens?: string[]): Farm => {
  const farms = useSelector((state: State) => state.farms.data.filter((farm) => farm.token.symbol === tokenSymbol))
  const filteredFarm = filterFarmsByQuoteToken(farms, preferredQuoteTokens)
  return filteredFarm
}

// Return the base token price for a farm, from a given pid
export const useBusdPriceFromPid = (pid: number): BigNumber => {
  const farm = useFarmFromPid(pid)
  return farm && new BigNumber(farm.token.busdPrice)
}

export const useBusdPriceFromToken = (tokenSymbol: string): BigNumber => {
  const tokenFarm = useFarmFromTokenSymbol(tokenSymbol)
  const tokenPrice = useBusdPriceFromPid(tokenFarm?.pid)
  return tokenPrice
}

export const useLpTokenPrice = (symbol: string) => {
  const farm = useFarmFromLpSymbol(symbol)
  const farmTokenPriceInUsd = useBusdPriceFromPid(farm.pid)
  let lpTokenPrice = BIG_ZERO

  if (farm.lpTotalSupply && farm.lpTotalInQuoteToken) {
    // Total value of base token in LP
    const valueOfBaseTokenInFarm = farmTokenPriceInUsd.times(farm.tokenAmountTotal)
    // Double it to get overall value in LP
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2)
    // Divide total value of all tokens, by the number of LP tokens
    const totalLpTokens = getBalanceAmount(new BigNumber(farm.lpTotalSupply))
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens)
  }
  return lpTokenPrice
}

// Pools

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchPoolsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const getCirculationgSupply = async () => {
  const cakeVault = getMasterchefContract()
  const totalSupplyCall = { address: tokens.pcn.address[process.env.REACT_APP_CHAIN_ID], name: 'totalSupply' }
  const burnedTokenCall = {
    address: tokens.pcn.address[process.env.REACT_APP_CHAIN_ID],
    name: 'balanceOf',
    params: ['0x000000000000000000000000000000000000dEaD'],
  }
  const [tokenDataResultRaw] = await Promise.all([
    multicallv2(cakeAbi, [totalSupplyCall, burnedTokenCall], {
      requireSuccess: false,
    })
  ])
  const [totalSupply, burned] = tokenDataResultRaw.flat()

  const totalBurned = burned;
  const circulating = totalSupply.sub(totalBurned);
  const circulatingSupply = await formatBigNumber(circulating);

  return { circulatingSupply, totalBurned };
}

export const getAllPairs = async () => {
  const factory = getFactoryContract();
  const pairsLength = await factory.allPairsLength();
  const pairInfoCall = [];
  const tokenArray = [];
  for (let i = 0; i < pairsLength; i++) {
    pairInfoCall.push({
      address: factory.address,
      name: 'allPairs',
      params: [i],
    })
  }
  const [DataResult] = await Promise.all([
    multicallv2(factoryAbi, pairInfoCall, {
      requireSuccess: false,
    })
  ])
  for (let i = 0; i < pairsLength; i++) {
    tokenArray.push({
      address: DataResult[i][0],
      name: 'token0',
    })
    tokenArray.push({
      address: DataResult[i][0],
      name: 'token1',
    })
  }
  const [tokenResult] = await Promise.all([
    multicallv2(lpAbi, tokenArray, {
      requireSuccess: false,
    })
  ])
  let tokensOfDex = [];
  tokenResult.forEach((element) => {
    tokensOfDex.push(...element)
  });
  tokensOfDex = [...new Set(tokensOfDex)];

  return { pairsLength, tokensOfDex };
}

export const usePools = (account: string): { pools: Pool[]; userDataLoaded: boolean } => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const usePoolFromPid = (sousId: number): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return transformPool(pool)
}

export const useFetchCakeVault = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCakeVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchCakeVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchCakeVaultFees())
  }, [dispatch])
}

export const useCakeVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalCakeInVault: totalCakeInVaultAsString,
    estimatedCakeBountyReward: estimatedCakeBountyRewardAsString,
    totalPendingCakeHarvest: totalPendingCakeHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      cakeAtLastUserAction: cakeAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.cakeVault)

  const estimatedCakeBountyReward = useMemo(() => {
    return new BigNumber(estimatedCakeBountyRewardAsString)
  }, [estimatedCakeBountyRewardAsString])

  const totalPendingCakeHarvest = useMemo(() => {
    return new BigNumber(totalPendingCakeHarvestAsString)
  }, [totalPendingCakeHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalCakeInVault = useMemo(() => {
    return new BigNumber(totalCakeInVaultAsString)
  }, [totalCakeInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const cakeAtLastUserAction = useMemo(() => {
    return new BigNumber(cakeAtLastUserActionAsString)
  }, [cakeAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalCakeInVault,
    estimatedCakeBountyReward,
    totalPendingCakeHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      cakeAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

// Profile

export const useFetchProfile = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfile(account))
  }, [account, dispatch])
}

export const useProfile = () => {
  const { isInitialized, isLoading, data, hasRegistered }: ProfileState = useSelector((state: State) => state.profile)
  return { profile: data, hasProfile: isInitialized && hasRegistered, isInitialized, isLoading }
}


export const useAchievements = () => {
  const achievements: AchievementState['data'] = useSelector((state: State) => state.achievements.data)
  return achievements
}

export const usePriceBnbBusd = (): BigNumber => {
  const bnbBusdFarm = useFarmFromPid(2)
  return new BigNumber(bnbBusdFarm.quoteToken.busdPrice)
}

export const usePriceCakeBusd = (): BigNumber => {
  const cakeBnbFarm = useFarmFromPid(1)
  return new BigNumber(cakeBnbFarm.token.busdPrice)
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

export const useGetIsClaimable = (epoch) => {
  const claimableStatuses = useSelector((state: State) => state.predictions.claimableStatuses)
  return claimableStatuses[epoch] || false
}

/**
 * Used to get the range of rounds to poll for
 */
export const useGetEarliestEpoch = () => {
  return useSelector((state: State) => {
    const earliestRound = minBy(Object.values(state.predictions.rounds), 'epoch')
    return earliestRound?.epoch
  })
}

export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isChartPaneOpen)
}

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.predictions.currentEpoch)
}

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.predictions.intervalBlocks)
}

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.predictions.bufferBlocks)
}

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks()
  const bufferBlocks = useGetBufferBlocks()
  return intervalBlocks + bufferBlocks
}

export const useGetPredictionsStatus = () => {
  return useSelector((state: State) => state.predictions.status)
}

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state: State) => state.predictions.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state: State) => state.predictions.minBetAmount)
  return useMemo(() => ethers.BigNumber.from(minBetAmount), [minBetAmount])
}

export const useGetRewardRate = () => {
  const rewardRate = useSelector((state: State) => state.predictions.rewardRate)
  return rewardRate / 100
}

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.predictions.isFetchingHistory)
}

export const useGetHistory = () => {
  return useSelector((state: State) => state.predictions.history)
}

export const useGetHistoryByAccount = (account: string) => {
  const bets = useGetHistory()
  return bets ? bets[account] : []
}

export const useGetLedgerByRoundId = (account: string, roundId: string) => {
  const ledgers = useSelector((state: State) => state.predictions.ledgers)

  if (!ledgers[account]) {
    return null
  }

  if (!ledgers[account][roundId]) {
    return null
  }

  return ledgers[account][roundId]
}

export const useGetLastOraclePrice = () => {
  const lastOraclePrice = useSelector((state: State) => state.predictions.lastOraclePrice)
  return useMemo(() => {
    return ethers.BigNumber.from(lastOraclePrice)
  }, [lastOraclePrice])
}
