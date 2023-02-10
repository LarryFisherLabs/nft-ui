import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CanvasPanel, IndentedText, SmallText, StyledButton, StyledInput, Text, TextBlock, Title, Title2, ViewStyle } from '../styles/general'

import { selectPrices, selectFounder, selectCoinBuilderStatus, selectUserBalance, selectCoinErr } from '../redux/slices/coinSlice'
import { buyCoin, loadBuilder } from '../redux/thunks/coinThunk'
import { CoinCanvas, getColor } from '../components/canvas/CoinCanvas'

const minInputDeci = 0.0001
const goodStatusList = ['succeeded', 'bad pricing', 'bad value', 'buying coin']

export const CoinBuilder = () => {
    const dispatch = useDispatch()
    const coinBuilderStatus = useSelector(selectCoinBuilderStatus)
    const minPrices = useSelector(selectPrices)
    const founder = useSelector(selectFounder)
    const userBalance = useSelector(selectUserBalance)
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
        const initialVal = (event.target.value !== null) ? parseFloat(event.target.value) : 0
        let finalVal = initialVal
        if (initialVal > 0 && initialVal <= 100000) {
            const dif = ((initialVal * 1000000) % (minInputDeci * 1000000)) / 1000000
            if (dif > 0) {
                finalVal = ((initialVal * 1000000) - (dif * 1000000)) / 1000000
            }
        } else if (initialVal > 100000) {
            finalVal = 100000
        }
        let previousAmount = (canvasAmount !== null) ? canvasAmount : 0
        if (finalVal.toString() !== initialVal.toString()) event.target.value = finalVal
        if (finalVal !== previousAmount && ((finalVal >= minPrices.bronze) || (previousAmount >= minPrices.bronze) || isFounderCoinBuilder)) updateAmount(finalVal)
    }

    const sendTransaction = () => {
        const amount = canvasAmount ? canvasAmount : 0
        const color = isFounderCoinBuilder ? 4 : getColor(canvasAmount, minPrices)
        dispatch(buyCoin({ value: amount, color: color }))
    }

    useEffect(() => {
        if (coinBuilderStatus === 'idle') {
            dispatch(loadBuilder())
        } else if (coinBuilderStatus === 'succeeded') {
            if (isFounderCoinBuilder === null) {
                updateIsFCB(founder.value > 0 && founder.isFCMinted === false)
                updateIsDCB(founder.value > 0 && founder.isFCMinted === true && founder.isFCDiscountUsed === false)
            }
        }
    }, [coinBuilderStatus, dispatch, founder, isFounderCoinBuilder])        

    return (
        <ViewStyle>
            <Title>Coin Builder</Title>
            {
                (goodStatusList.includes(coinBuilderStatus)) ? (
                    <ViewStyle>
                        <Title2>{
                            userBalance > 0 ? "Add to your collection" :
                            "Join the BitCow community!"
                        }</Title2>
                        <CanvasPanel>
                            {
                                coinBuilderStatus === 'buying coin' ? <Text>Buying coin...</Text> : 
                                coinBuilderStatus === 'bad pricing' ? <Text>Prices changed!</Text> :
                                coinBuilderStatus === 'bad value' ? <Text>Not enough eth!</Text> :
                                null
                            }
                            {
                                isFounderCoinBuilder ? (
                                    <TextBlock>
                                        <Text>Get your founder coin for free or add value to it</Text>
                                    </TextBlock>) : (
                                    <TextBlock>
                                        <Text>Minimum price for bronze coin: {minPrices.bronze} eth</Text>
                                        <Text>Minimum for silver coin: {minPrices.silver} eth</Text>
                                        <Text>Minimum for gold coin: {minPrices.gold} eth</Text>
                                        <Text>Minimum for diamond coin: {minPrices.diamond} eth</Text>
                                    </TextBlock>
                                )
                            }
                            <CoinCanvas amount={canvasAmount}/>
                            <IndentedText>Amount of eth to send:</IndentedText>
                            <StyledInput type="number" step={.0001} onChange={onInputChange} />
                            {
                                coinBuilderStatus === 'buying coin' ? null : (
                                    <StyledButton onClick={sendTransaction}>{
                                        isFounderCoinBuilder ? <SmallText>Buy Founder Coin</SmallText> :
                                        isDiscountedCoinBuilder ? <SmallText>Buy Discount Coin</SmallText> :
                                        <SmallText>Buy Coin</SmallText>
                                    }</StyledButton>
                                )
                            }
                        </CanvasPanel>
                    </ViewStyle>
                ) : (coinBuilderStatus === 'failed') ? <Text>{coinError}</Text> :
                <Text>{coinBuilderStatus}</Text>
            }
            
        </ViewStyle>
    )
}