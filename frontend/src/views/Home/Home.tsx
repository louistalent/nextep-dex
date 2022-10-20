import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
import CxsPriceCard from 'views/Home/components/cxsPriceCard';
import MarketCapCard from 'views/Home/components/marketcapCard';
import TradingVolumeCard from 'views/Home/components/tradingvolumecard';
import EarnAssetCard from 'views/Home/components/EarnAssetCard';
import SubTotalCard from 'views/Home/components/subTotalCard';
import CxsDataCard from 'views/Home/components/cxsDataCard';
import LinkCard from 'views/Home/components/linkCard';

import linkImg1 from 'assets/image/home-link1.png';
import linkImg2 from 'assets/image/home-link2.png';
import linkImg3 from 'assets/image/home-link3.png';
import linkImg4 from 'assets/image/home-link4.png';


const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 24px;
  grid-gap: 24px;

  & > div {
    grid-column: span 4;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-gap: 32px;

    & > div {
      grid-column: span 3;
    }
  }
`

const CTACards = styled(BaseLayout)`
  border-top: 3px solid white;
  align-items: start;
  gap:0!important;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-gap: 32px;

    & > div {
      grid-column: span 4;
    }
  }
`
const CxsLink = styled.h1`
  color: #8B66F5;
  font-size: 42px;
  text-align: center;
  margin-top: 80px;
`

const CxsLinkText = styled.h1`
  color: white;
  font-size: 14px;
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 30px;
  margin-bottom: 50px;
  font-weight: 300;
`
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Page>
        <Hero>
          <Heading as="h1" scale="xl" mb="24px">
            {t('Welcome to Nextep DEX')}
          </Heading>
          <Text className="head-title">{t('New nextep chain')}</Text>
        </Hero>
        <div style={{ display: 'flex' }}>
          <img style={{ margin: 'auto', borderRadius: '10px' }} draggable='false' src="/images/dex.jpg" alt="" />
          {/* <CTACards>
            <CxsPriceCard />
            <MarketCapCard />
            <EarnAssetCard />
          </CTACards>
          <SubTotalCard /> */}
          {/* <CxsDataCard />
          <CxsLink>
            Nextep Chain
          </CxsLink>
          <CxsLinkText>
            CxsDex is a crypto world for users to trade, earn and game.
            it is the premier choice for projects on Avalanche with features including AMM,NFT and GameFi.
          </CxsLinkText> */}
          {/* <CardContainer>
            <LinkCard img={linkImg1} title="INTRO TO CXS" content="CxsDex is a crypto world for users to trade earn and game. It's the premier choice for projects on Avalanche with features including AMM NFT and GameFi." />
            <LinkCard img={linkImg2} title="SUPPORT FOR NEW PROJECT" content="Yield Farms incentivize users to provide liquidity for your trading pair by distributing CXS to your pair's LP Token holders." />
            <LinkCard img={linkImg3} title="TOKENOMICS" content="Cxs Emissions are set to automatically decrease by 5% per month to farming, staking, xHAKU, and ecosystem rewards." />
            <LinkCard img={linkImg4} title="ROADMAP" content="Metaverse Integration. Virtual Real Estate. Play to Earn, Trader Profiles, Trade to Earn NFT, NFT Loot Boxes, NFT Staking, Play to Earn, Launchpad, DAO, Multichain." />
          </CardContainer> */}

          {/* <Cards>
            <FarmStakingCard />
          </Cards>
          <Cards>
            <CakeStats />
            <TotalValueLockedCard />
          </Cards> */}
        </div>
      </Page>
    </>
  )
}

export default Home
