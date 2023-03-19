import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CanvasPanel, IndentedText, LargeText, SmallText, StyledInput, Text, TextBlock, Title, Title2, TopMarginBtn, ViewStyle } from '../styles/general'

import { selectPrices, selectFounder, selectUserBalance, selectCoinErr, selectCoinStatus } from '../redux/slices/coinSlice'
import { buyCoin, loadBuilder } from '../redux/thunks/coinThunk'
import { CoinCanvas, getColor } from '../components/canvas/CoinCanvas'
import { selectIsConnected } from '../redux/slices/connectSlice'

export const CoinBuilder = () => {
    const dispatch = useDispatch()
    const coinStatus = useSelector(selectCoinStatus)
    const minPrices = useSelector(selectPrices)
    const founder = useSelector(selectFounder)
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
                                coinStatus === 'buying coin' ? <Text>Buying coin...</Text> : 
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
                                        <LargeText>Minimum price for bronze coin: {minPrices.bronze || .001} eth</LargeText>
                                        <LargeText>Minimum for silver coin: {minPrices.silver || .002} eth</LargeText>
                                        <LargeText>Minimum for gold coin: {minPrices.gold || .003} eth</LargeText>
                                        <LargeText>Minimum for diamond coin: {minPrices.diamond || .004} eth</LargeText>
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
                        </CanvasPanel>
                    </ViewStyle>
                )
            }
            
        </ViewStyle>
    )
}