import { Currency, ETHER, Token } from '@pancakeswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'CXS'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
