import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon } from '@pancakeswap/uikit'
import { Link } from 'react-router-dom'
import Settings from './Settings'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding: 14px;
  width: 100%;
  box-sizing: content-box;
  border-top: 4px solid transparent;
  border-image: linear-gradient(to right, #F6B8B8, #1fc7d4) 1 stretch;
  border-image-slice: 1;
`

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  return (
    <AppHeaderContainer>
      <Flex flexDirection="column">
        <Heading as="h2" style={{ textAlign: "center", fontSize: "24px" }}>
          {title}
        </Heading>
        <Text style={{ color: "#7A6EAA" }} fontSize="14px">
          {subtitle}
        </Text>
        {!noConfig && (
          <Flex style={{ justifyContent: "center" }}>
            <Settings />
            <Transactions />
          </Flex>
        )}
      </Flex>
    </AppHeaderContainer>
  )
}

export default AppHeader
