import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

interface DetailsProps {
  actionPanelToggled: boolean
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding-right: 8px;
  color: #CF71E4;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`

const ArrowIcon = styled(ChevronDownIcon) <{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 20px;
  color: #CF71E4;
`

const Details: React.FC<DetailsProps> = ({ actionPanelToggled }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <Container>
      {!isMobile && t('Details')}
    </Container>
  )
}

export default Details
