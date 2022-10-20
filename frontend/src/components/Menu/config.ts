import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('HOME'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('TRADE'),
    icon: 'TradeIcon',
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/pool',
      }
    ],
  },
  // {
  //   label: t('FARMS'),
  //   icon: 'FarmIcon',
  //   href: '/farms',
  // },
  // {
  //   label: t('STAKING'),
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  {
    label: t('BRIDGE'),
    icon: 'TicketIcon',
    href: 'bridge',
  },
  /* 
  {
    label: t('NFT MAKRETPLACE'),
    icon: 'InfoIcon',
    href: '/pools',
  },
  {
    label: t('AUDIT'),
    icon: 'GroupsIcon',
    href: '/pools',
  }, */
]

export default config
