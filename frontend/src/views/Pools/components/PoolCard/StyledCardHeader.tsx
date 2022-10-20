import React from 'react'
import { CardHeader, Heading, Text, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Token } from 'config/constants/types'
import { TokenPairImage } from 'components/TokenImage'
import CakeVaultTokenPairImage from '../CakeVaultCard/CakeVaultTokenPairImage'

const Wrapper = styled(CardHeader) <{ isFinished?: boolean; background?: string }>`
  padding: 24px;
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false, isStaking = false }) => {
  const { t } = useTranslation()
  const isCakePool = earningToken.symbol === 'PCN' && stakingToken.symbol === 'PCN'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isCakePool) {
      // manual cake
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Automatic restaking')
    }
    if (isCakePool) {
      return t('Earn PCN, stake PCN')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="center">
        <Flex flexDirection="column" alignItems="center">
          <Heading scale="lg" style={{ marginBottom: "20px", color: "white" }}>
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          {isAutoVault ? (
            <CakeVaultTokenPairImage width={64} height={64} />
          ) : (
            <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={64} height={64} />
          )}
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
