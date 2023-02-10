import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonBottom, ButtonsPanel, LayerButtons, SectionButtons, ToggledRemove } from '../components/LayerButtons.js'
import { ViewStyle, Title, Text, Title2CrossHair, CoinImg, Title4 } from '../styles/general.js'
import { getAntPrices, getPartInventories } from '../redux/thunks/antThunks.js'
import { selectAntErrMsg, selectAntStatus, selectDiscountInfo, updateCoinId, updateCoinInfo } from '../redux/slices/antSlice.js'
import { AntCanvas } from '../components/canvas/AntCanvas.js'
import { staticLayerInfo } from '../utils/ant-utils/staticAntInfo.js'

import styled from 'styled-components'
import { selectCoinErr, selectCoins, selectCoinStatus, selectIsCoinAdmin } from '../redux/slices/coinSlice.js'
import { loadCoinIds } from '../redux/thunks/coinThunk.js'

export const Editor = styled.div`
    display: flex;
    width: 90%;
    gap: 1rem;
`

export const AntBuilder = () => {
    const dispatch = useDispatch()
    const antStatus = useSelector(selectAntStatus)
    const isAdmin = useSelector(selectIsCoinAdmin)
    const err = useSelector(selectAntErrMsg)
    const coinStatus = useSelector(selectCoinStatus)
    const coins = useSelector(selectCoins)
    const coinErr = useSelector(selectCoinErr)
    const selectedCoinInfo = useSelector(selectDiscountInfo)
    const [isCoinPanelOpen, toggleCoinPanel] = useState(true)

    const coinClick = (isDisabled, coinId, coinColor) => {
        if (!isDisabled) {
            if (selectedCoinInfo[1] === coinId) {
                dispatch(updateCoinInfo({ discountIndex: 0, coinId: null }))
                dispatch(getAntPrices({ discountIndex: 0 }))
            } else {
                dispatch(updateCoinInfo({ discountIndex: coinColor + 1, coinId: coinId }))
                if (selectedCoinInfo[0] !== coinColor + 1) {
                    dispatch(getAntPrices({ discountIndex: coinColor + 1 }))
                } 
            }
        }
    }
    
    useEffect(() => {
        if (antStatus === 'idle' && isAdmin !== null) dispatch(getPartInventories())
        else if (antStatus === 'succeeded' && coinStatus === 'idle') dispatch(loadCoinIds())
    }, [antStatus, isAdmin, dispatch, coinStatus])

    return (
        <ViewStyle>
            <Title>Ant Builder</Title>
            {(antStatus === 'succeeded' || antStatus === 'Loading prices...') ? (
                <Editor>
                    <AntCanvas/>
                    <div>
                        <ButtonsPanel>
                            <Title2CrossHair onClick={() => toggleCoinPanel(!isCoinPanelOpen)}>Coin Discount</Title2CrossHair>
                            <SectionButtons isOpen={isCoinPanelOpen}>
                                {
                                    coinStatus === "succeeded" ? coins.length > 0 ? coins.map((coin, index) => {
                                        const srcFile = 'http://127.0.0.1:3001/coins/images/' + coin.id
                                        const isSelected = selectedCoinInfo[1] === coin.id
                            
                                        return (
                                            <Button key={index} onClick={() => coinClick(coin.isDiscountUsed, coin.id, coin.color)} srcFile={srcFile} isSelected={isSelected} isDisabled={coin.isDiscountUsed}>
                                                <Title4>{coin.color === 0 ? "10% Discount" : coin.color === 1 ? "20% Discount" : coin.color === 2 ? "30% Discount" : coin.color === 3 ? "40% Discount" : "50% Discount"}</Title4>
                                                <ButtonBottom>
                                                    <ToggledRemove isDisabled={isSelected}>
                                                        <Text>Remove</Text>
                                                    </ToggledRemove>
                                                </ButtonBottom>
                                            </Button>
                                        )
                                    }) : <Text>Buy a coin to get up to a 40% discount on an ant as well as all future collections!</Text> :
                                    coinStatus === "failed" ? <Text>{coinErr}</Text> : <Text>{coinStatus}</Text>
                                }
                            </SectionButtons>
                        </ButtonsPanel>
                        {staticLayerInfo.map((_, index) => {
                            return (
                                <LayerButtons key={index} layerIndex={index} />
                            )
                        })}
                    </div>
                </Editor>
            ) : antStatus === 'failed' ? <Text>{err}</Text> : <Text>Loading...</Text>}
        </ViewStyle>
    )
}