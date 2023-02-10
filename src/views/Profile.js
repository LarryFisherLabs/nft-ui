import React, { useEffect, useState } from 'react'
import { AntImg, CoinImg, LeftTitle, NftGrid, Panel, StyledButton, Text, Title, Title2, ViewStyle } from '../styles/general'

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { selectCoinErr, selectCoins, selectCoinStatus, selectFounder, selectIsCoinAdmin } from '../redux/slices/coinSlice'
import { coinsConnect } from '../redux/thunks/coinThunk'
import { selectAntErrMsg, selectAntIds, selectAntStatus } from '../redux/slices/antSlice'
import { getAntIds } from '../redux/thunks/antThunks'

export const MappedCoins = () => {
    const coinStatus = useSelector(selectCoinStatus)
    const coinErrMsg = useSelector(selectCoinErr)
    const coins = useSelector(selectCoins)

    if (coinStatus === 'succeeded') {
        if (coins.length < 1) {
            return (
                <Text>No coins yet</Text>
            )
        } else {
            return(
                <NftGrid>{
                    coins.map((coin, i) => {
                        const imgSrc = 'http://127.0.0.1:3001/coins/images/' + coin.id
                        return (
                            <CoinImg src={imgSrc} key={i} />
                        )
                    })
                }</NftGrid>
            )
        }
    } else if (coinStatus === 'failed') {
        return (
            <Text>{coinErrMsg}</Text>
        )
    } else {
        return (
            <Text>{coinStatus}</Text>
        )
    }
}

export const MappedAnts = () => {
    const antStatus = useSelector(selectAntStatus)
    const antErrMsg = useSelector(selectAntErrMsg)
    const antIds = useSelector(selectAntIds)

    if (antStatus === 'succeeded') {
        if (antIds.length < 1) {
            return (
                <Text>No ants yet</Text>
            )
        } else {
            return (<NftGrid>{antIds.map((antId, i) => {
                const imgSrc = 'http://127.0.0.1:3001/ants/images/' + antId
                return (
                    <AntImg src={imgSrc} key={i} />
                )
            })}</NftGrid>)
        }
    } else if (antStatus === 'failed') {
        return (
            <Text>{antErrMsg}</Text>
        )
    } else {
        return (
            <Text>{antStatus}</Text>
        )
    }
}

const ProfilePanel = styled(Panel)`
    min-width: 30%;
    padding-bottom: 1.2rem;
`

export const Profile = () => {

    const dispatch = useDispatch()
    const coinStatus = useSelector(selectCoinStatus)
    const founder = useSelector(selectFounder)
    const isAdmin = useSelector(selectIsCoinAdmin)
    const antStatus = useSelector(selectAntStatus)

    const [buttonLabel, updateLabel] = useState()
    const [antButtonLabel, updateAntLabel] = useState()

    useEffect(() => {
        if (coinStatus === 'idle' && isAdmin !== null) {
            dispatch(coinsConnect())
        } else if (coinStatus === 'succeeded') {
            updateLabel('Mint Coin')
            if (founder.value > 0) {
                if (!founder.isFCMinted) {
                    updateLabel('Mint Founder Coin')
                } else if (!founder.isFCDiscountUsed) {
                    updateLabel('Mint Discounted Coin')
                }
            }
        }
    }, [coinStatus, dispatch, founder, isAdmin])

    useEffect(() => {
        if (antStatus === 'idle' && isAdmin !== null) {
            dispatch(getAntIds())
        } else if (antStatus === 'succeeded') {
            updateAntLabel('Mint Ant')
        }
    }, [antStatus, dispatch, isAdmin])

    const goToCoinBuilder = () => {
        window.location = '/coin-builder'
    }

    const goToAntBuilder = () => {
        window.location = '/ant-builder'
    }

    return (
        <ViewStyle>
            <Title>
                Arcade Profile
            </Title>
            <Title2>Welcome</Title2>
            <ProfilePanel>
                <LeftTitle>Coins</LeftTitle>
                <MappedCoins />
            </ProfilePanel>
            {buttonLabel === null ? null : <StyledButton onClick={goToCoinBuilder}>{buttonLabel}</StyledButton>}
            <ProfilePanel>
                <LeftTitle>Ants</LeftTitle>
                <MappedAnts />
            </ProfilePanel>
            {antButtonLabel === null ? null : <StyledButton onClick={goToAntBuilder}>{antButtonLabel}</StyledButton>}
        </ViewStyle>
    )
}