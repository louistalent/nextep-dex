import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Nextep Dex',
  description:
    'Nextep Dex - A next evolution DeFi exchange on Nextep Chain',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('Nextep Dex')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('Nextep Dex')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('Nextep Dex')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('Nextep Dex')}`,
      }
    case '/pools':
      return {
        title: `${t('Staking')} | ${t('Nextep Dex')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('Nextep Dex')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('Nextep Dex')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('Nextep Dex')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('Nextep Dex')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('Nextep Dex')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('Nextep Dex')}`,
      }
    default:
      return null
  }
}
