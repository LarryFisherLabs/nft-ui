import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { CanvasPanel, CenteredLargeText, IndentedText, LargeText, SmallText, StyledInput, Text, TextBlock, Title, Title2, TopMarginBtn, ViewStyle } from '../styles/general'

import { selectPrices, selectFounder, selectUserBalance, selectCoinErr, selectCoinStatus } from '../redux/slices/coinSlice'
import { buyCoin, loadBuilder } from '../redux/thunks/coinThunk'
import { CoinCanvas, getColor } from '../components/canvas/CoinCanvas'
import { selectIsConnected, selectIsWrongNet } from '../redux/slices/connectSlice'
import styled from 'styled-components'

const BronzeText = styled(LargeText)`
    padding-left: .7rem;
    color: #ff912f;
    font-size: 1.2rem;
    text-shadow: black 1px 1px 0px;
`

const SilverText = styled(BronzeText)`
    color: #ffffff;
`

const GoldText = styled(BronzeText)`
    color: #feff00;
`

const DiamondText = styled(BronzeText)`
    color: #a1e8ff;
`

export const CoinBuilder = () => {
    const dispatch = useDispatch()
    const isWrongNet = useSelector(selectIsWrongNet)
    const coinStatus = useSelector(selectCoinStatus)
    const minPrices = useSelector(selectPrices, shallowEqual)
    const founder = useSelector(selectFounder, shallowEqual)
    const userBalance = useSelector(selectUserBalance)
    const isConnected = useSelector(selectIsConnected)
    const coinError = useSelector(selectCoinErr)

    const [canvasAmount, updateAmount] = useState()
    const [isFounderCoinBuilder, updateIsFCB] = useState(null)
    const [isDiscountedCoinBuilder, updateIsDCB] = useState()

    // contract.on('NewCoin', (owner, newCoin) => {
    //     if(newCoin.id >= count) {
    //         window.location.reload()
    //     }
    // })

    const onInputChange = (event) => {
        if (coinStatus !== 'buying coin') {
            const bronzePrice = minPrices.bronze || .001
            const initialVal = (event.target.value !== null) ? parseFloat(event.target.value) : 0
            let finalVal = initialVal
            if (initialVal > 0 && initialVal <= 100000) {
                finalVal = parseFloat(initialVal.toFixed(4))
            } else if (initialVal > 100000) {
                finalVal = 100000
            }
            let previousAmount = (canvasAmount !== null) ? canvasAmount : 0
            if (finalVal.toString() !== initialVal.toString()) event.target.value = finalVal
            if (finalVal !== previousAmount && ((finalVal >= bronzePrice) || (previousAmount >= bronzePrice) || isFounderCoinBuilder)) updateAmount(finalVal)
        } else event.target.value = canvasAmount
    }

    const sendTransaction = () => {
        const amount = canvasAmount ? canvasAmount : 0
        const color = isFounderCoinBuilder ? 4 : getColor(canvasAmount, minPrices)
        dispatch(buyCoin({ value: amount, color: color }))
    }

    useEffect(() => {
        if (coinStatus === 'idle' && isConnected) {
            dispatch(loadBuilder())
        } else if (coinStatus === 'succeeded') {
            if (isFounderCoinBuilder === null) {
                updateIsFCB(founder.value > 0 && founder.isFCMinted === false)
                updateIsDCB(founder.value > 0 && founder.isFCMinted === true && founder.isFCDiscountUsed === false)
            }
        }
    }, [coinStatus, dispatch, founder, isFounderCoinBuilder, isConnected])        

    return (
        <ViewStyle>
            <Title>Coin Builder</Title>
            {
                (coinStatus === 'failed') ? <Text>{coinError}</Text> : (
                    <ViewStyle>
                        <Title2>{
                            userBalance > 0 ? "Add to your collection" :
                            "Join the BitCow community!"
                        }</Title2>
                        <CanvasPanel>
                            {
                                coinStatus === 'buying coin' ? <LargeText>Buying coin...</LargeText> : 
                                coinStatus === 'bad pricing' ? <Text>Prices changed!</Text> :
                                coinStatus === 'bad value' ? <Text>Not enough eth!</Text> :
                                null
                            }
                            {
                                isFounderCoinBuilder ? (
                                    <TextBlock>
                                        <Text>Get your founder coin for free or add value to it</Text>
                                    </TextBlock>) : (
                                    <TextBlock>
                                        <LargeText>{isConnected === false ? 'Demo ' : null}Minimum Prices:</LargeText>
                                        <BronzeText>Bronze coin: {minPrices.bronze || .001} eth</BronzeText>
                                        <SilverText>Silver coin: {minPrices.silver || .002} eth</SilverText>
                                        <GoldText>Gold coin: {minPrices.gold || .003} eth</GoldText>
                                        <DiamondText>Diamond coin: {minPrices.diamond || .004} eth</DiamondText>
                                    </TextBlock>
                                )
                            }
                            <CoinCanvas amount={canvasAmount}/>
                            <IndentedText>Amount of eth to send:</IndentedText>
                            <StyledInput type="number" step=".0001" onChange={onInputChange} />
                            {
                                coinStatus === 'buying coin' || !isConnected ? null : (
                                    <TopMarginBtn onClick={sendTransaction}>{
                                        isFounderCoinBuilder ? <SmallText>Buy Founder Coin</SmallText> :
                                        isDiscountedCoinBuilder ? <SmallText>Buy Discount Coin</SmallText> :
                                        <SmallText>Buy Coin</SmallText>
                                    }</TopMarginBtn>
                                )
                            }
                            { isWrongNet ? <CenteredLargeText>Please Change Network</CenteredLargeText> : isConnected === false ? <CenteredLargeText>Please Connect</CenteredLargeText> : null}
                        </CanvasPanel>
                    </ViewStyle>
                )
            }
            
        </ViewStyle>
    )
}