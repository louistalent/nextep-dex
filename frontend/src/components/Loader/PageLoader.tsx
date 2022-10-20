import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@pancakeswap/uikit'
import Page from '../Layout/Page'
import loading from '../../assets/image/loading.gif';

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <img src={loading} alt="loading..." width="100px" />
    </Wrapper>
  )
}

export default PageLoader
