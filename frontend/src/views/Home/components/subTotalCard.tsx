import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Skeleton } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization';
import { getCirculationgSupply, usePriceCakeBusd, getAllPairs } from 'state/hooks';
import { useGetStats } from 'hooks/api'


const Content = styled.section`
    display: flex;
    background: #201E35;
    width: 100%;
    flex-wrap: wrap;
`

const SubContent = styled.section`
    flex: 1;
    display:flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 20px;
`

const StretchPanel = styled.div`
    display: flex;
    justify-content: space-between;
`

const Title = styled.span`
    font-size: 12px;
    color: white;
`

const Value = styled.span`
    font-size: 20px;
    color: white;
`

export default function SubtotalCard() {
    const { t } = useTranslation();
    const [circulation, setCirculation] = useState("");
    const [burned, setBurned] = useState("");
    const [pairs, setPairs] = useState("");


    const data = useGetStats()
    useEffect(() => {
        (async () => {
            const { pairsLength } = await getAllPairs();
            const { circulatingSupply, totalBurned }: any = await getCirculationgSupply();
            setCirculation(Number(circulatingSupply).toFixed());
            setBurned(Number(totalBurned).toFixed());
            setPairs(Number(pairsLength).toFixed());
        })();

    }, [])

    return (
        <Content>
            <SubContent>
                <StretchPanel>
                    <Title>PCN in circualation</Title>
                    <Title>PCN Burned</Title>
                </StretchPanel>
                <StretchPanel>
                    {circulation ?
                        <Value>{circulation}</Value>
                        :
                        <Skeleton width="30%" height={24} />
                    }
                    {burned ?
                        <Value>{burned}</Value>
                        :
                        <Skeleton width="30%" height={24} />
                    }
                </StretchPanel>
            </SubContent>
            <SubContent>
                <StretchPanel>
                    <Title>Total Valued Locked (TVL)</Title>
                    <Title>Pairs</Title>
                </StretchPanel>
                <StretchPanel>
                    {data ?
                        <Value>0</Value>
                        :
                        <Skeleton width="30%" height={24} />
                    }
                    {pairs ?
                        <Value>{pairs}</Value>
                        :
                        <Skeleton width="30%" height={24} />
                    }
                </StretchPanel>
            </SubContent>
        </Content>
    )
}