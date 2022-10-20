import React, { useCallback, useState } from 'react';
import { useWalletModal } from '@pancakeswap/uikit'
import styled from 'styled-components';
import { useMasterchef } from 'hooks/useContract';
import BigNumber from 'bignumber.js'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance';
import { harvestFarm } from 'utils/calls';
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import useToast from 'hooks/useToast';
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { useTranslation } from 'contexts/Localization'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

import lockImg from '../../../assets/image/lock.png';


const Content = styled.section`
    margin-top: 50px;
    display: flex;
    width: 100%;
    background-image: linear-gradient(90deg, #E879E3 0%, #5A5CFF 100%);
    background-size: cover;
    @media (max-width: 960px) {
        flex-wrap: wrap;
    }
`

const UnderContent = styled.section`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(90deg, #E879E3 0%, #5A5CFF 100%);
    @media (max-width: 960px) {
        min-height: 100px;
        :not(:last-of-type) {
            border-bottom: 1px solid #FFFFFF7a;
        }
    }
`

const SubContent = styled.section`
    display:flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px 20px;
`

const StretchPanel = styled.div`
    display: flex;
    justify-content: center;
`

const Title = styled.span`
    font-size: 12px;
    color: black;
`

const Value = styled.span`
    font-size: 20px;
    color: white;
`
const Img = styled.img`
    display: flex;
    width: 30px;
    height: 30px;
`
const Button = styled.button`
    width: 310px;
    height: 39px;
    background: linear-gradient(90deg, #FFFFFF 0%, #1fc7d4 100%);
    border:none;
    cursor: pointer;
    color: black;
`

export default function SubtotalCard() {
    const [pendingTx, setPendingTx] = useState(false);
    const { account } = useWeb3React()
    const { toastError } = useToast();
    const { login, logout } = useAuth()
    const { onPresentConnectModal } = useWalletModal(login, logout)
    const { t } = useTranslation();
    const masterChefContract = useMasterchef()
    const farmsWithBalance = useFarmsWithBalance();
    const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.gt(0));

    const earningsSum = farmsWithBalance.reduce((accum, earning) => {
        const earningNumber = new BigNumber(earning.balance)
        if (earningNumber.eq(0)) {
            return accum
        }
        return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
    }, 0)

    const harvestAllFarms = useCallback(async () => {
        setPendingTx(true)
        // eslint-disable-next-line no-restricted-syntax
        for (const farmWithBalance of balancesWithValue) {
            try {
                // eslint-disable-next-line no-await-in-loop
                await harvestFarm(masterChefContract, farmWithBalance.pid)
            } catch (error) {
                toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
            }
        }
        setPendingTx(false)
    }, [balancesWithValue, masterChefContract, toastError, t])

    return (
        <Content>
            <UnderContent>
                <Img src={lockImg} alt="lock image" />
                <SubContent>
                    <StretchPanel>
                        <Title>PCN to Harvest</Title>
                    </StretchPanel>
                    <StretchPanel>
                        <Value>
                            <CakeHarvestBalance farmsWithBalance={balancesWithValue} />
                        </Value>
                    </StretchPanel>
                </SubContent>
            </UnderContent>
            <UnderContent>
                <Img src={lockImg} alt="lock image" />
                <SubContent>
                    <StretchPanel>
                        <Title>PCN In Wallet</Title>
                    </StretchPanel>
                    <StretchPanel>
                        <Value>
                            <CakeWalletBalance />
                        </Value>
                    </StretchPanel>
                </SubContent>
            </UnderContent>
            <UnderContent>
                {account ?
                    (
                        earningsSum > 0.001 ?
                            (
                                <Button
                                    id="harvest-all"
                                    disabled={balancesWithValue.length <= 0 || pendingTx}
                                    onClick={harvestAllFarms}
                                >
                                    {pendingTx
                                        ? t('Collecting PCN')
                                        : t('Harvest all (%count%)', {
                                            count: balancesWithValue.length,
                                        })}
                                </Button>
                            ) : (
                                <Button disabled>
                                    {t('Insuitable Balance')}
                                </Button>
                            )
                    ) : (
                        <Button onClick={onPresentConnectModal}>
                            {t('Unlock Wallet')}
                        </Button>
                    )}
            </UnderContent>

        </Content>
    )
}