import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap/uikit'

// background: linear - gradient(33.28deg, #12111C 0.32 %, #181726 89.33 %);
export const BodyWrapper = styled(Card)`
  max-width: 406px;
  width: 100%;
  z-index: 1;
  color:black !important;
  box-shadow: 0px 0px 4px 1px grey;
  background:white;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
