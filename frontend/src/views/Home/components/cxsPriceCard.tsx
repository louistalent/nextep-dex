import React, { useEffect } from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, Skeleton } from '@pancakeswap/uikit'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'

import { usePriceCakeBusd } from 'state/hooks';

// background: linear - gradient(#E879E3, #4345FF);
const StyledFarmStakingCard = styled(Card)`
  border-right: 1px solid white;
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

const CxsPriceCard = () => {
  const { t } = useTranslation()
  const cakePriceBusd = usePriceCakeBusd();

  return (
    <StyledFarmStakingCard style={{ borderRadius: "0px" }}>
      <CardBody style={{ textAlign: "center" }}>
        <CardMidContent color="invertedContrast" style={{ fontSize: "15px" }}>{t('PCN Price')}</CardMidContent>
        {cakePriceBusd.toNumber() ?
          <h2 color="contrast" style={{ textAlign: "center", fontSize: "30px" }}>
            {`${cakePriceBusd.toFixed(3)} usd`}
          </h2>
          :
          <Skeleton width="100%" height={24} />
        }
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default CxsPriceCard
