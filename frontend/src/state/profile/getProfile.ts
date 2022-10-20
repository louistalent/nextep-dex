import Cookies from 'js-cookie'
import { Nft } from 'config/constants/types'
import { getNftByTokenId } from 'utils/collectibles'
import { Profile } from 'state/types'
import { transformProfileResponse } from './helpers'

const profileApi = process.env.REACT_APP_API_PROFILE

export interface GetProfileResponse {
  hasRegistered: boolean
  profile?: Profile
}

const getUsername = async (address: string): Promise<string> => {
  try {
    const response = await fetch(`${profileApi}/api/users/${address}`)

    if (!response.ok) {
      return ''
    }

    const { username = '' } = await response.json()

    return username
  } catch (error) {
    return ''
  }
}

const getProfile = async (address: string): Promise<GetProfileResponse> => {
  try {
    const hasRegistered = true as boolean

    if (!hasRegistered) {
      return { hasRegistered, profile: null }
    }

    const profile = {
      userId: 1,
      points: 1,
      teamId: 1,
      tokenId: 1,
      username: "sdd",
      nftAddress: "0xasdasdsadwqe1232323",
    } as Profile

    return { hasRegistered, profile }
  } catch (error) {
    return null
  }
}

export default getProfile
