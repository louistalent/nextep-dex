import React from 'react'
import { TokenPairImage, ImageProps } from '@pancakeswap/uikit'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'

const CakeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/popcorn.png`

  return <img src={primaryTokenSrc} alt="pcn token" style={{ border: "1px solid blue", borderRadius: "50%", width: "60px", height: "60px" }} />
}

export default CakeVaultTokenPairImage;
