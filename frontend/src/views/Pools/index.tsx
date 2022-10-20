import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex, Skeleton, Text, useModal } from '@pancakeswap/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import usePersistState from 'hooks/usePersistState'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePools, useFetchCakeVault, useFetchPublicPoolsData, usePollFarmsData, useCakeVault, usePriceCakeBusd } from 'state/hooks'
import { latinise } from 'utils/latinise'
import FlexLayout from 'components/Layout/Flex'
import Page from 'components/Layout/Page'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import PoolCard from './components/PoolCard'
import CakeVaultCard from './components/CakeVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
import BountyCard from './components/BountyCard'
import HelpButton from './components/HelpButton'
import PoolsTable from './components/PoolsTable/PoolsTable'
import { ViewMode } from './components/ToggleView/ToggleView'
import { getAprData, getCakeVaultEarnings } from './helpers'
import autoClaimImg from '../../assets/image/autoClaim.png';

import BountyModal from './components/BountyModal';

const CardLayout = styled(FlexLayout)`
  justify-content: center;
`

const PoolControls = styled(Flex)`
  flex-direction: column;
  margin-bottom: 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const SearchSortContainer = styled(Flex)`
  gap: 10px;
  justify-content: space-between;
`

const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

const AutoClaimContent = styled.div`
  display: flex;
  justify-content: space-between;;
  flex-wrap: wrap;
  background: #161322;
  margin-bottom: 30px;
`

const AutoTextContent = styled.h4`
  display: flex;
  font-size: 14px;
  width: 50%;
  padding: 3% 5% 3%;
  color: white;
  line-height: 2;
  min-width: 500px;
  @media(max-width: 1300px){
  width: 100%;
  }
`

const AutoImgContent = styled.img` 
width: 50%;
min-width: 500px;
display: flex;
@media(max-width: 1300px){
width: 100%;
}
`

const AutoBalanceCard = styled.h1`
  display: flex;
  width: 50%;
  font-size: 30px;
  color: white;
  align-items: center;
  justify-content: center;
  border-left: 5px solid transparent;
  padding: 15px;
  border-image: linear-gradient(180deg, #4345FF 0%, #E879E3 50.52%, #F6B8B8 100%) 1% round;
`

const AutoActionCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background: linear-gradient(180deg, #BF6CEA 0%, #4345FF 100%);
  padding: 20px 20px 20px;
`
const InfoContent = styled.div`
  display: flex;
  justify-content: space-between;
`

const InfoText = styled.div`
  display: flex;
  font-size: 16px;
  color: white;
`
const ActionButton = styled.button`
  display: flex;
  width: 100%;
  height: 35px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #FFFFFF 0%, #1fc7d4 100%);
  border-radius: 2px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  color: black;
`

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'pancake_farm_view' })
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
    estimatedCakeBountyReward
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
    const cakePool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }
    return [cakeAutoVault, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  usePollFarmsData()
  useFetchCakeVault()
  useFetchPublicPoolsData()

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const showFinishedPools = location.pathname.includes('history')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }


  // for auto bounty

  const cakePriceBusd = usePriceCakeBusd()

  const estimatedDollarBountyReward = useMemo(() => {
    return new BigNumber(estimatedCakeBountyReward).multipliedBy(cakePriceBusd)
  }, [cakePriceBusd, estimatedCakeBountyReward])

  const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  const hasFetchedCakeBounty = estimatedCakeBountyReward ? estimatedCakeBountyReward.gte(0) : false
  const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  const cakeBountyToDisplay = hasFetchedCakeBounty ? getBalanceNumber(estimatedCakeBountyReward, 18) : 0


  const TooltipComponent = ({ fee }: { fee: number }) => (
    <>
      <Text mb="16px">{t('This bounty is given as a reward for providing a service to other users.')}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping out by activating the Auto CAKE Pool’s compounding function for everyone.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t('Auto-Compound Bounty: %fee%% of all Auto CAKE pool users pending yield', { fee: fee / 100 })}
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(<BountyModal TooltipComponent={TooltipComponent} />)



  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                account,
                cakeAtLastUserAction,
                userShares,
                pricePerFullShare,
                pool.earningTokenPrice,
              ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  const poolsToShow = () => {
    let chosenPools = []
    if (showFinishedPools) {
      chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
    } else {
      chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
    }

    if (searchQuery) {
      const lowercaseQuery = latinise(searchQuery.toLowerCase())
      chosenPools = chosenPools.filter((pool) =>
        latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
      )
    }

    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  const cardLayout = (
    <CardLayout>
      {poolsToShow().map((pool) =>
        pool.isAutoVault ? (
          <CakeVaultCard key="auto-cake" pool={pool} showStakedOnly={stakedOnly} />
        ) : (
          <PoolCard key={pool.sousId} pool={pool} account={account} />
        ),
      )}
    </CardLayout>
  )

  const tableLayout = <PoolsTable pools={poolsToShow()} account={account} userDataLoaded={userDataLoaded} />

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, null, 'row']}>
          <Flex flex="1" flexDirection="column" mr={['8px', 0]} style={{ paddingBottom: "8px", background: "linear-gradient(90deg, #E879E3 0%, #5A5CFF 100%) left bottom #777 no-repeat", backgroundSize: "100% 8px", backgroundColor: "transparent" }}>
            <Heading as="h1" scale="xxl" color="secondary" mb="24px">
              {t('STAKING')}
            </Heading>
            <Heading scale="md" color="text" style={{ marginBottom: "20px" }}>
              {t('Stake your PCN here to earn more!')}
            </Heading>
          </Flex>
          {/* <Flex flex="1" height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            <HelpButton />
            <BountyCard />
          </Flex> */}
        </Flex>
        <Flex flexDirection="column" mt="30px">
          <Heading as="h1" scale="xl" color="secondary" mb="24px" style={{ color: "#FB9DF7" }}>
            {t('STEP 1')}
          </Heading>
          <Heading scale="md" color="text" style={{ marginBottom: "20px" }}>
            {t('Stake PCN, receive PCN immediately!')}
          </Heading>
        </Flex>
        <AutoClaimContent>
          <AutoTextContent>
            Stake NEXO here and receive xNEXO as  receipt representing your share of the pool. This pool automatically compounds by using a portion of all trade fees to buy back NEXO which means the xNEXO to NEXO ratio will grow over time.
            There is a 4% withdraw fee if xNEXO is withdrawn to NEXO within 30 days. 2% is burned and 2% is returned ti the xNEXO contact.
          </AutoTextContent>
          <AutoImgContent src={autoClaimImg} alt="autoClaimImg" />
        </AutoClaimContent>

        <AutoClaimContent>
          <AutoBalanceCard>
            1 PCN =
            {cakePriceBusd.toNumber() ?
              cakePriceBusd.toFixed(3)
              :
              <Skeleton height={20} width={96} mb="2px" />} USD
          </AutoBalanceCard>
          <AutoActionCard>
            <InfoContent>
              <InfoText>
                Claimable PCN:
              </InfoText>

              <InfoText>
                {hasFetchedCakeBounty ?
                  <span>{`${cakeBountyToDisplay.toFixed(3)} PCN`}</span> :
                  <Skeleton height={20} width={96} mb="2px" />}
                {hasFetchedDollarBounty ?
                  <span style={{ color: "#eeeeee", fontSize: "13px", marginLeft: "5px" }}>
                    {`(~${dollarBountyToDisplay.toFixed(3)} USD)`}
                  </span> :
                  <Skeleton height={20} width={96} mb="2px" />}
              </InfoText>
            </InfoContent>
            <ActionButton disabled={!dollarBountyToDisplay || !cakeBountyToDisplay || !performanceFee} onClick={onPresentBountyModal}>{t('Claim')}</ActionButton>
          </AutoActionCard>
        </AutoClaimContent>

        <Flex flexDirection="column" mt="50px">
          <Heading as="h1" scale="xl" color="secondary" mb="24px" style={{ color: "#FB9DF7" }}>
            {t('STEP 2')}
          </Heading>
          <Heading scale="md" color="text">
            {t('Stake Tokens of Nextep Chain, Earn PCN of Your Choice Over Time')}
          </Heading>
        </Flex>

      </PageHeader>
      <Page>
        <PoolControls justifyContent="space-between">
          <PoolTabButtons
            stakedOnly={stakedOnly}
            setStakedOnly={setStakedOnly}
            hasStakeInFinishedPools={hasStakeInFinishedPools}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <SearchSortContainer>
            <Flex flexDirection="column" width="50%">
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Sort by')}
              </Text>
              <ControlStretch>
                <Select
                  options={[
                    {
                      label: t('Hot'),
                      value: 'hot',
                    },
                    {
                      label: t('APR'),
                      value: 'apr',
                    },
                    {
                      label: t('Earned'),
                      value: 'earned',
                    },
                    {
                      label: t('Total staked'),
                      value: 'totalStaked',
                    },
                  ]}
                  onChange={handleSortOptionChange}
                />
              </ControlStretch>
            </Flex>
            <Flex flexDirection="column" width="50%">
              <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase">
                {t('Search')}
              </Text>
              <ControlStretch>
                <SearchInput onChange={handleChangeSearchQuery} placeholder="Search Pools" />
              </ControlStretch>
            </Flex>
          </SearchSortContainer>
        </PoolControls>
        {showFinishedPools && (
          <Text fontSize="20px" color="failure" pb="32px">
            {t('These pools are no longer distributing rewards. Please unstake your tokens.')}
          </Text>
        )}
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={loadMoreRef} />
      </Page>
    </>
  )
}

export default Pools
