const getTokenLogoURL = (address: string) =>
  `/images/token_svg/${address.toLocaleLowerCase()}.svg`

export default getTokenLogoURL
