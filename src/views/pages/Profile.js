import React, { useEffect, useState } from 'react'
import { AntImg, CoinImg, LeftTitle, NftGrid, Panel, Text, Title, Title2, TopMarginBtn, ViewStyle } from '../../styles/general'

import styled from 'styled-components'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { selectCoinErr, selectCoins, selectCoinStatus, selectFounder, selectIsCoinAdmin } from '../../redux/slices/coinSlice'
import { coinsConnect, loadCoinIdsOffline } from '../../redux/thunks/coinThunk'
import { selectAntErrMsg, selectAntIds, selectAntStatus } from '../../redux/slices/antSlice'
import { getAntIds, loadAntIdsOffline } from '../../redux/thunks/antThunks'
import { selectAccount, selectNetId, selectStatus } from '../../redux/slices/connectSlice'
import { goTo, goToNftView } from '../../utils/redirect'
import { useDefaultNetwork } from '../../utils/hooks/hooks-general'
import { urls } from '../../utils/json-constants/urls'

export const MappedCoins = ({ versionId = 1 }) => {
    const coinStatus = useSelector(selectCoinStatus)
    const coinErrMsg = useSelector(selectCoinErr)
    const coins = useSelector(selectCoins, shallowEqual)
    const stateNetId = useSelector(selectNetId)
    const [netId, setNetId] = useState(null)

    useDefaultNetwork(stateNetId, netId, setNetId)

    if (coinStatus === 'succeeded') {
        if (coins.length < 1) {
            return (
                <Text>No coins yet</Text>
            )
        } else {
            return(
                <NftGrid>{
                    coins.map((coin, i) => {
                        const coinId = isNaN(coin) ? coin.id : coin
                        const imgSrc = urls.web2BackEnd + 'coins/' + netId + '/' + versionId + '/images/' + coin.id
                        return (
                            <CoinImg onClick={() => goToNftView('coin', coinId)} src={imgSrc} key={i} />
                        )
                    })
                }</NftGrid>
            )
        }
    } else if (coinStatus === 'idle') {
        return(<Text>Please Connect</Text>)
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

export const MappedAnts = ({ versionId = 1 }) => {
    const antStatus = useSelector(selectAntStatus)
    const antErrMsg = useSelector(selectAntErrMsg)
    const antIds = useSelector(selectAntIds, shallowEqual)
    const stateNetId = useSelector(selectNetId)
    const [netId, setNetId] = useState(null)

    useDefaultNetwork(stateNetId, netId, setNetId)

    if (antStatus === 'succeeded') {
        if (antIds.length < 1) {
            return (
                <Text>No ants yet</Text>
            )
        } else {
            return (<NftGrid>{antIds.map((antId, i) => {
                const imgSrc = urls.web2BackEnd + 'ants/' + netId + '/' + versionId + '/images/' + antId
                return (
                    <AntImg onClick={() => goToNftView('ant', antId)} src={imgSrc} key={i} />
                )
            })}</NftGrid>)
        }
    } else if (antStatus === 'idle') {
        return(<Text>Please Connect</Text>)
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

export const ProfilePanel = styled(Panel)`
    min-width: 11rem;
    padding-bottom: 1.2rem;
`

export const Profile = ({ remoteAddress = null }) => {
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    const account = useSelector(selectAccount)
    const coinStatus = useSelector(selectCoinStatus)
    const founder = useSelector(selectFounder, shallowEqual)
    const isAdmin = useSelector(selectIsCoinAdmin)
    const antStatus = useSelector(selectAntStatus)
    const netId = useSelector(selectNetId)

    useEffect(() => {
        // isAdmin gets set once address gets set if wallet is connected then contract connect is triggered here
        if (coinStatus === 'idle' && isAdmin !== null) {
            dispatch(coinsConnect(remoteAddress))
        } else if ((remoteAddress !== null && coinStatus === 'idle' && (status === 'offline' || (status === 'succeeded' && account === null))) || ((netId === 1 || netId === 0) && coinStatus === 'idle' && account !== null)) {
            dispatch(loadCoinIdsOffline(remoteAddress))
        }
    }, [coinStatus, dispatch, isAdmin, remoteAddress, status, account, netId])

    useEffect(() => {
        // isAdmin gets set once address gets set if wallet is connected then contract connect is triggered here
        if (antStatus === 'idle' && isAdmin !== null) {
            dispatch(getAntIds(remoteAddress))
        } else if ((remoteAddress !== null && antStatus === 'idle' && (status === 'offline' || (status === 'succeeded' && account === null))) || ((netId === 1 || netId === 0) && antStatus === 'idle' && account !== null)) {
            dispatch(loadAntIdsOffline(remoteAddress))
        }
    }, [antStatus, dispatch, isAdmin, remoteAddress, status, account, netId])

    return (
        <ViewStyle>
            <Title>
                Arcade Profile
            </Title>
            <Title2>{remoteAddress || "Welcome"}</Title2>
            <ProfilePanel>
                <LeftTitle>Coins</LeftTitle>
                <MappedCoins />
            </ProfilePanel>
            {
                remoteAddress === null ?
                    <TopMarginBtn onClick={() => goTo('/coin-builder')}>{
                        (founder.isFCMinted === false && founder.value > 0) ? 'Mint Founder Coin' :
                        (founder.isFCDiscountUsed === false && founder.isFCMinted === true) ? 'Mint Discounted Coin' :
                        'Mint Coin'
                    }</TopMarginBtn> :
                    null
            }
            
            <ProfilePanel>
                <LeftTitle>Ants</LeftTitle>
                <MappedAnts />
            </ProfilePanel>
            {
                remoteAddress === null ? <TopMarginBtn onClick={() => {goTo('/ant-builder')}}>Mint Ant</TopMarginBtn> : null
            }
        </ViewStyle>
    )
}