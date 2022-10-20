import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(#E879E3, #1fc7d4);
  width: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }

  transition: opacity 200ms;
  &:hover {
    opacity: 0.65;
  }
`
const CardMidContent = styled(Heading).attrs({ scale: 'xl' })`
  line-height: 44px;
`

const activeNonCakePools = pools.filter((pool) => !pool.isFinished && !pool.earningToken.symbol.includes('PCN'))
const latestPools: Pool[] = orderBy(activeNonCakePools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
// Always include CAKE
const assets = ['PCN', ...latestPools.map((pool) => pool.earningToken.symbol)].join(', ')

const TradingVolumeCard = () => {
  const { t } = useTranslation()
  const assetText = t('Earn %assets% in Pools', { assets })
  const [earn, InPools] = assetText.split(assets)

  return (
    <StyledFarmStakingCard style={{ borderRadius: "0px" }}>
      <CardBody style={{ textAlign: "center" }}>
        <CardMidContent color="invertedContrast" style={{ fontSize: "15px" }}>
          {t('24h Trading Volume')}
        </CardMidContent>
        <h2 color="contrast" style={{ textAlign: "center", fontSize: "30px" }}>
          {InPools}
        </h2>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default TradingVolumeCard;
