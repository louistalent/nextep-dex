import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, Skeleton } from '@pancakeswap/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization';
import { getCirculationgSupply, usePriceCakeBusd } from 'state/hooks';


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
// Always include PCN
const assets = ['PCN', ...latestPools.map((pool) => pool.earningToken.symbol)].join(', ')

const MarketCapCard = () => {
  const { t } = useTranslation()
  const [cap, setCap] = useState<number>(0);
  const cakePriceBusd: any = usePriceCakeBusd();
  useEffect(() => {
    (async () => {
      const { circulatingSupply }: any = await getCirculationgSupply();
      setCap(circulatingSupply);
    })();

  }, [])


  return (
    <StyledFarmStakingCard style={{ borderRadius: "0px" }}>
      <CardBody style={{ textAlign: "center" }}>
        <CardMidContent color="invertedContrast" style={{ fontSize: "15px" }}>
          {t('PCN Market Cap')}
        </CardMidContent>
        {cap !== 0 && cakePriceBusd.toNumber() ?
          <h2 color="contrast" style={{ textAlign: "center", fontSize: "30px" }}>
            {`${(cap * cakePriceBusd).toFixed()} usd`}
          </h2>
          :
          <Skeleton width="100%" height={24} />
        }

      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default MarketCapCard
