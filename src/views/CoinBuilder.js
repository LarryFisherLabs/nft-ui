import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { CanvasPanel, CenteredLargeText, CenteredText, IndentedText, LargeText, SmallText, StyledInput, Text, TextBlock, Title, Title2, TopMarginBtn, ViewStyle } from '../styles/general'

import { selectPrices, selectFounder, selectUserBalance, selectCoinErr, selectCoinStatus } from '../redux/slices/coinSlice'
import { buyCoin, loadBuilder } from '../redux/thunks/coinThunk'
import { CoinCanvas, getColor } from '../components/canvas/CoinCanvas'
import { addPopup, selectAccount, selectNetId } from '../redux/slices/connectSlice'
import styled from 'styled-components'
import { popupTypes } from '../utils/json-constants/popupInfo'
import { ProfilePanel } from './ToolsPage'

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
    const netId = useSelector(selectNetId)
    const coinStatus = useSelector(selectCoinStatus)
    const minPrices = useSelector(selectPrices, shallowEqual)
    const founder = useSelector(selectFounder, shallowEqual)
    const userBalance = useSelector(selectUserBalance)
    const address = useSelector(selectAccount)
    const errorMsg = useSelector(selectCoinErr)

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
        if (color !== -1){
            dispatch(buyCoin({ value: amount, color: color }))
            dispatch(addPopup({ id: popupTypes.txWaiting }))
        } else dispatch(addPopup({ id: popupTypes.badBuyCoinVal }))
    }

    useEffect(() => {
        if (coinStatus === 'idle' && address !== null && netId !== 0 && netId !== 1 && netId !== null) {
            dispatch(loadBuilder())
        }
    }, [coinStatus, dispatch, netId, address])

    useEffect(() => {
        if (founder.value > 0) {
            updateIsFCB(founder.isFCMinted === false)
            updateIsDCB(founder.isFCMinted === true && founder.isFCDiscountUsed === false)
        }
    }, [founder])        

    return (
        <ViewStyle>
            <Title>Coin Builder</Title>
            {
                (coinStatus === 'failed') ? <ProfilePanel><CenteredText>{errorMsg}</CenteredText></ProfilePanel> : (
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
                                        <LargeText>{minPrices.bronze === null ? 'Demo ' : null}Minimum Prices:</LargeText>
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
                                coinStatus === 'buying coin' || address === null || netId === 0 || netId === 1 ? null : (
                                    <TopMarginBtn onClick={sendTransaction}>{
                                        isFounderCoinBuilder ? <SmallText>Buy Founder Coin</SmallText> :
                                        isDiscountedCoinBuilder ? <SmallText>Buy Discount Coin</SmallText> :
                                        <SmallText>Buy Coin</SmallText>
                                    }</TopMarginBtn>
                                )
                            }
                            { netId === 0 || netId === 1 ? <CenteredLargeText>Please Change Network</CenteredLargeText> : address === null ? <CenteredLargeText>Please Connect</CenteredLargeText> : null}
                        </CanvasPanel>
                    </ViewStyle>
                )
            }
            
        </ViewStyle>
    )
}