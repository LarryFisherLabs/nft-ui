import React, { useEffect, useState } from 'react'
import { CenteredText, Panel, StyledButton, Text, ThinStyledButton, Title, Title2, ViewStyle } from '../styles/general'

import styled from 'styled-components'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addPopup, selectIsConnected } from '../redux/slices/connectSlice'
import { SmallInput } from '../components/NumberedPageNav'
import { selectIsCoinAdmin } from '../redux/slices/coinSlice'
import { addApproval, addApprovalForAll, getApprovals, getApprovalsForAll, removeApproval, removeApprovalForAll } from '../redux/thunks/toolThunks'
import { selectApprovals, selectApprovalsForAll, selectIsLoading, selectIsLoadingForAll, selectToolErr } from '../redux/slices/toolSlice'
import { popupTypes } from '../utils/json-constants/popupInfo'

export const ProfilePanel = styled(Panel)`
    display: flex;
    flex-flow: column;
    min-width: 11rem;
    padding-bottom: 1.2rem;
`

const SecondLayerPanel = styled(ProfilePanel)`
    background-color: rgb(148, 108, 176, .5);
    max-width: 90%;
    align-self: center;
    padding-bottom: .6rem;
`

const SmallInput2 = styled(SmallInput)`
    padding: 0rem;
    margin: 0rem;
`

const ButtonColumn = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: .6rem;
`

const ButtonRow = styled.div`
    display: flex;
    flex-flow: row;
    align-self: center;
    justify-content: center;
`

const CenteredButton = styled(StyledButton)`
    align-self: center;
`

const TextShiftRight = styled(Text)`
    padding-left: .4rem;
`

export const ToolsPage = ({ toolIndex }) => {
    const dispatch = useDispatch()
    const isConnected = useSelector(selectIsConnected)
    const isAdmin = useSelector(selectIsCoinAdmin)
    const approvals = useSelector(selectApprovals, shallowEqual)
    const approvalsForAll = useSelector(selectApprovalsForAll, shallowEqual)
    const isLoading = useSelector(selectIsLoading)
    const isLoadingForAll = useSelector(selectIsLoadingForAll)
    const toolErr = useSelector(selectToolErr)
    const [antId, setAntId] = useState("")
    const [idInputSize, setIdInputSize] = useState(0)
    const [coinId, setCoinId] = useState("")
    const [idInputSize2, setIdInputSize2] = useState(0)
    const [isNoApprovalFound, setIsNoApprovalFound] = useState(null)
    const [isRemoving, setIsRemoving] = useState(false)
    const [isNoApprovalForAllFound, setIsNoApprovalForAllFound] = useState(null)
    const [isRemovingForAll, setIsRemovingForAll] = useState(false)

    useEffect(() => {
        if (isLoading === false && isRemoving !== true) {
            if (isNoApprovalFound === null && approvals.length === 0) setIsNoApprovalFound(true)
            else if(isNoApprovalFound === true && approvals.length > 0) setIsNoApprovalFound(false)
        }
    }, [isLoading, isRemoving, approvals, isNoApprovalFound])

    useEffect(() => {
        if (isLoadingForAll === false && isRemovingForAll !== true) {
            if (isNoApprovalForAllFound === null && approvalsForAll.length === 0) setIsNoApprovalForAllFound(true)
            else if(isNoApprovalForAllFound === true && approvalsForAll.length > 0) setIsNoApprovalForAllFound(false)
        }
    }, [isLoadingForAll, isRemovingForAll, approvalsForAll, isNoApprovalForAllFound])

    useEffect(() => {
        if (isLoading === false && isRemoving === true) {
            dispatch(getApprovals())
            dispatch(addPopup({id: popupTypes.gettingApprovals}))
            setIsRemoving(false)
        }
    }, [dispatch, isLoading, isRemoving])

    useEffect(() => {
        if (isLoadingForAll === false && isRemovingForAll === true) {
            dispatch(getApprovalsForAll())
            dispatch(addPopup({id: popupTypes.gettingApprovalsForAll}))
            setIsRemovingForAll(false)
        }
    }, [dispatch, isLoadingForAll, isRemovingForAll])

    const checkForApprovals = (isForAll = false) => {
        if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true) {
            dispatch(getApprovalsForAll())
            dispatch(addPopup({id: popupTypes.gettingApprovalsForAll}))
        } else if (!isForAll && isLoading !== true && isRemoving !== true) {
            dispatch(getApprovals())
            console.log('here')
            dispatch(addPopup({id: popupTypes.gettingApprovals}))
        }
    }

    const _removeApproval = (nftContract, nftId, isForAll = false, approvedAddress = null) => {
        if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true) {
            dispatch(removeApprovalForAll({nftContract: nftContract, approvedAddress: approvedAddress}))
            dispatch(addPopup({id: popupTypes.txWaiting}))
            setIsRemovingForAll(true)
        } else if (!isForAll && isLoading !== true && isRemoving !== true) {
            dispatch(removeApproval({nftContract: nftContract, nftId: nftId}))
            dispatch(addPopup({id: popupTypes.txWaiting}))
            setIsRemoving(true)
        }            
    }
    const _addApproval = (isForAll = false) => {
        if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true) dispatch(addApprovalForAll(1))
        else if (!isForAll && isLoading !== true && isRemoving !== true) dispatch(addApproval({nftId: antId}))
    }

    const _addApproval2 = (isForAll = false) => {
        if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true) dispatch(addApprovalForAll(0))
        else if (!isForAll && isLoading !== true && isRemoving !== true) dispatch(addApproval({nftId: coinId, nftType: 0}))
    }

    const onIdInputChange = (event) => {
        setAntId(event.target.value)
        setIdInputSize(event.target.value.length)
    }

    const onIdInputChange2 = (event) => {
        setCoinId(event.target.value)
        setIdInputSize2(event.target.value.length)
    }

    if (toolErr !== null) return (
        <Text>{toolErr}</Text>
    )

    return (
        <ViewStyle>
            <Title>
                {toolIndex === null ? 'Tools' : toolIndex === 0 ? 'NFT Approvals' : null}
            </Title>
            
            {
                toolIndex === null ? (
                    <ProfilePanel>
                        <CenteredButton onClick={() => window.location = '/tools/nft-approvals'}>NFT Approvals</CenteredButton>
                        <Text>This tool can be used to detect and revoke:</Text>
                        <TextShiftRight>- All active "approvals" on NFTs in your wallet</TextShiftRight>
                        <TextShiftRight>- All active "approvals for all" on NFT collections you have interacted with</TextShiftRight>
                    </ProfilePanel>
                ) : (toolIndex === 0) ? (
                    isConnected ? (
                        <ViewStyle>
                            <ProfilePanel>
                                <Title2>Approval Search</Title2>
                                <ButtonColumn>
                                    <StyledButton onClick={() => checkForApprovals(false)}>Check for approvals</StyledButton>
                                    <StyledButton onClick={() => checkForApprovals(true)}>Check for approvals of all</StyledButton>
                                </ButtonColumn>
                            </ProfilePanel>
                            {approvals.length > 0 ?
                                <ProfilePanel>
                                    <Title2>Approvals</Title2>
                                    {approvals.map((contractApprovalDeets, contractApprovalIndex) => {
                                        return (
                                            <ButtonColumn key={`nftContract${contractApprovalIndex}`}>
                                                <CenteredText>NFT Contract Name: {contractApprovalDeets.contractName}</CenteredText>
                                                <CenteredText>NFT Contract Symbol: {contractApprovalDeets.contractSymbol}</CenteredText>
                                                <CenteredText>NFT Contract Address: {contractApprovalDeets.contractAddress}</CenteredText>
                                                {contractApprovalDeets.nftIdApprovals.map((nftDetails, nftDetailsIndex) => {
                                                    return(
                                                        <SecondLayerPanel key={`nftDetails${nftDetailsIndex}`}>
                                                            <Text>NFT ID: {nftDetails.nftId}</Text>
                                                            <Text>Approved Address: {nftDetails.approvedAddress}</Text>
                                                            <CenteredButton onClick={() => _removeApproval(contractApprovalDeets.contractAddress, nftDetails.nftId)}>Remove approval</CenteredButton>
                                                        </SecondLayerPanel>
                                                    )
                                                })}
                                            </ButtonColumn>
                                        )
                                    })}
                                </ProfilePanel> : 
                                isNoApprovalFound === true ?
                                    <ProfilePanel><CenteredText>No approvals found</CenteredText></ProfilePanel> : null
                            }
                            {approvalsForAll.length > 0 ?
                                <ProfilePanel>
                                    <Title2>Approvals For All</Title2>
                                    {approvalsForAll.map((contractApprovalForAllDeets, contractApprovalForAllIndex) => {
                                        return (
                                            <ButtonColumn key={`nftContract${contractApprovalForAllIndex}`}>
                                                <CenteredText>NFT Contract Name: {contractApprovalForAllDeets.contractName}</CenteredText>
                                                <CenteredText>NFT Contract Symbol: {contractApprovalForAllDeets.contractSymbol}</CenteredText>
                                                <CenteredText>NFT Contract Address: {contractApprovalForAllDeets.contractAddress}</CenteredText>
                                                {contractApprovalForAllDeets.approvedForAllArray.map((approvedAddress, approvedAddressIndex) => {
                                                    return(
                                                        <SecondLayerPanel key={`nftDetails${approvedAddressIndex}`}>
                                                            <Text>Approved Address: {approvedAddress}</Text>
                                                            <CenteredButton onClick={() => _removeApproval(contractApprovalForAllDeets.contractAddress, null, true, approvedAddress)}>Remove Approval For All</CenteredButton>
                                                        </SecondLayerPanel>
                                                    )
                                                })}
                                            </ButtonColumn>
                                        )
                                    })}
                                </ProfilePanel> : 
                                isNoApprovalForAllFound === true ?
                                    <ProfilePanel><CenteredText>No approvals for all found</CenteredText></ProfilePanel> : null
                            }
                            {isAdmin ?
                                <ProfilePanel>
                                    <Title2>Dev Options</Title2>
                                    <ButtonColumn>
                                        <ButtonRow>
                                            <SmallInput2 size={idInputSize} value={antId} onChange={onIdInputChange} />
                                            <ThinStyledButton onClick={_addApproval}>Add Ant Approval</ThinStyledButton>
                                        </ButtonRow>
                                        <ButtonRow>
                                            <SmallInput2 size={idInputSize2} value={coinId} onChange={onIdInputChange2} />
                                            <ThinStyledButton onClick={_addApproval2}>Add Coin Approval</ThinStyledButton>
                                        </ButtonRow>
                                        <StyledButton onClick={() => _addApproval(true)}>Add approval for all coins</StyledButton>
                                        <StyledButton onClick={() => _addApproval2(true)}>Add approval for all ants</StyledButton>
                                    </ButtonColumn>
                                </ProfilePanel> :
                                null
                            }
                        </ViewStyle>
                    ) : <Text>Please Connect</Text>
                ) : null
            }
        </ViewStyle>
    )
}