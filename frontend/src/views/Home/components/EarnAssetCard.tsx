import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Skeleton } from '@pancakeswap/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getAllPairs } from 'state/hooks';

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


const EarnAssetCard = () => {
  const { t } = useTranslation();
  const [tokens, setTokens] = useState("");

  useEffect(() => {
    (async () => {
      const { tokensOfDex }: any = await getAllPairs();
      setTokens(Number(tokensOfDex.length).toFixed())
    })();

  }, [])

  return (
    <StyledFarmStakingCard style={{ borderRadius: "0px" }}>
      <CardBody style={{ textAlign: "center" }}>
        <CardMidContent color="invertedContrast" style={{ fontSize: "15px" }}>
          {t('Coins')}
        </CardMidContent>
        {tokens ?
          <h2 color="contrast" style={{ textAlign: "center", fontSize: "30px" }}>
            {tokens}
          </h2>
          :
          <Skeleton width="100%" height={24} />
        }
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
