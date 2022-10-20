import React from 'react';
import styled from 'styled-components';
import arrowImg from 'assets/image/arrow.png';

const Container = styled.section`
    width: 472px;
    height: 229px;
    background-color: #181726;
    display: flex;
    margin: 20px 20px;
    
`
const LeftContent = styled.section`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0E0C16;
    border-left: 3px solid transparent;
    padding: 15px;
    border-image: linear-gradient(180deg, #4345FF 0%, #E879E3 50.52%, #F6B8B8 100%) 1% round;
`

const RightContent = styled.section`
    flex: 1;
    flex-direction: column;
    padding: 20px 30px; 
`

const Img = styled.img`
    width: 93px;
    height: 93px;
`

const ImgArrow = styled.img`
    width: 33px;
    margin-top: 40px;
`

const Title = styled.h1`
    font-size: 18px;
    color: white;
    font-family: Chakra Petch;
    margin-bottom: 15.59px;
    font-style: normal;
    font-weight: 400;
`

const Description = styled.h1`
    font-size: 14px;
    color: white;
    font-family: Chakra Petch;
    font-style: normal;
    font-weight: 400;
`

function LinkCard(props:any){
    const {img, title, content} = props;
    return(
        <Container>
            <LeftContent>
                <Img src = {img} alt = "link card Image" />
            </LeftContent>
            <RightContent>
                <Title>
                    {title}
                </Title>
                <Description>
                    {content}
                </Description>
                <ImgArrow src = {arrowImg} alt = "arrow Image" />
            </RightContent>
        </Container>
    )
}

export default LinkCard;