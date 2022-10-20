import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    250: '0x4CB9c61914D33F85110B4960c09cf208Df1dfe47',
    4002: '0x4CB9c61914D33F85110B4960c09cf208Df1dfe47',
  }

  it(`get address for mainnet (chainId 250)`, () => {
    process.env.REACT_APP_CHAIN_ID = '250'
    const expected = address[250]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 4002)`, () => {
    process.env.REACT_APP_CHAIN_ID = '4002'
    const expected = address[4002]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[250]
    expect(getAddress(address)).toEqual(expected)
  })
})
