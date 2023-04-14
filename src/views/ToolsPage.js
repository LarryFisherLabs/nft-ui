import React, { useEffect, useState } from 'react'
import { CenteredText, Panel, StyledButton, Text, ThinStyledButton, Title, Title2, ViewStyle } from '../styles/general'

import styled from 'styled-components'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addPopup, selectAccount } from '../redux/slices/connectSlice'
import { SmallInput } from '../components/NumberedPageNav'
import { selectIsCoinAdmin } from '../redux/slices/coinSlice'
import { addApproval, addApprovalForAll, addERC20Approval, getApprovals, getApprovalsForAll, removeApproval, removeApprovalForAll, removeERC20Approval } from '../redux/thunks/toolThunks'
import { selectApprovals, selectApprovalsForAll, selectERC20Approvals, selectIsLoading, selectIsLoadingERC20, selectIsLoadingForAll, selectToolErr } from '../redux/slices/toolSlice'
import { popupTypes } from '../utils/json-constants/popupInfo'
import { goToApprovalManager } from '../utils/redirect'

export const ProfilePanel = styled(Panel)`
    display: flex;
    flex-flow: column;
    min-width: 11rem;
    padding-bottom: 1.5rem;
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
    const address = useSelector(selectAccount)
    const isAdmin = useSelector(selectIsCoinAdmin)
    const approvals = useSelector(selectApprovals, shallowEqual)
    const approvalsForAll = useSelector(selectApprovalsForAll, shallowEqual)
    const erc20Approvals = useSelector(selectERC20Approvals, shallowEqual)
    const isLoadingERC20 = useSelector(selectIsLoadingERC20)
    const isLoading = useSelector(selectIsLoading)
    const isLoadingForAll = useSelector(selectIsLoadingForAll)
    const toolErr = useSelector(selectToolErr)
    const [antId, setAntId] = useState("")
    const [idInputSize, setIdInputSize] = useState(0)
    const [coinId, setCoinId] = useState("")
    const [idInputSize2, setIdInputSize2] = useState(0)
    const [isNoERC20ApprovalFound, setIsNoERC20ApprovalFound] = useState(null)
    const [isRemovingERC20, setIsRemovingERC20] = useState(false)
    const [isNoApprovalFound, setIsNoApprovalFound] = useState(null)
    const [isRemoving, setIsRemoving] = useState(false)
    const [isNoApprovalForAllFound, setIsNoApprovalForAllFound] = useState(null)
    const [isRemovingForAll, setIsRemovingForAll] = useState(false)

    useEffect(() => {
        if (isLoadingERC20 === false && isRemovingERC20 !== true) {
            if (isNoERC20ApprovalFound !== true && erc20Approvals.length === 0) setIsNoERC20ApprovalFound(true)
            else if(isNoERC20ApprovalFound === true && erc20Approvals.length > 0) setIsNoERC20ApprovalFound(false)
        }
    }, [isLoadingERC20, isRemovingERC20, erc20Approvals, isNoERC20ApprovalFound])

    useEffect(() => {
        if (isLoading === false && isRemoving !== true) {
            if (isNoApprovalFound !== true && approvals.length === 0) setIsNoApprovalFound(true)
            else if(isNoApprovalFound === true && approvals.length > 0) setIsNoApprovalFound(false)
        }
    }, [isLoading, isRemoving, approvals, isNoApprovalFound])

    useEffect(() => {
        if (isLoadingForAll === false && isRemovingForAll !== true) {
            if (isNoApprovalForAllFound !== true && approvalsForAll.length === 0) setIsNoApprovalForAllFound(true)
            else if(isNoApprovalForAllFound === true && approvalsForAll.length > 0) setIsNoApprovalForAllFound(false)
        }
    }, [isLoadingForAll, isRemovingForAll, approvalsForAll, isNoApprovalForAllFound])

    useEffect(() => {
        if (isLoadingERC20 === false && isRemovingERC20 === true) {
            dispatch(getApprovals())
            dispatch(addPopup({id: popupTypes.gettingApprovals}))
            setIsRemovingERC20(false)
        }
    }, [dispatch, isLoadingERC20, isRemovingERC20])

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
        } else if (!isForAll && isLoading !== true && isRemoving !== true && isRemovingERC20 !== true) {
            dispatch(getApprovals())
            dispatch(addPopup({id: popupTypes.gettingApprovals}))
        }
    }

    const _removeApproval = (nftContract, nftId, isForAll = false, approvedAddress = null, isERC20 = false) => {
        if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true) {
            dispatch(removeApprovalForAll({nftContract: nftContract, approvedAddress: approvedAddress}))
            dispatch(addPopup({id: popupTypes.txWaiting}))
            setIsRemovingForAll(true)
        } else if (!isForAll && !isERC20 && isLoading !== true && isRemoving !== true) {
            dispatch(removeApproval({nftContract: nftContract, nftId: nftId}))
            dispatch(addPopup({id: popupTypes.txWaiting}))
            setIsRemoving(true)
        } else if (!isForAll && isERC20 && isLoadingERC20 !== true && isRemovingERC20 !== true) {
            dispatch(removeERC20Approval({erc20Address: nftContract, approvedAddress: approvedAddress}))
            dispatch(addPopup({id: popupTypes.txWaiting}))
            setIsRemovingERC20(true)
        }            
    }
    const _addApproval = (isForAll = false, isMethod0 = true) => {
        if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true && isMethod0) dispatch(addApprovalForAll({ nftType: 1, methodNum: 0 }))
        else if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true && !isMethod0) dispatch(addApprovalForAll({ nftType: 1, methodNum: 1 }))
        else if (!isForAll && isLoading !== true && isRemoving !== true && isRemovingERC20 !== true) dispatch(addApproval({nftId: antId}))
    }

    const _addApproval2 = (isForAll = false, isMethod0 = true) => {
        if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true && isMethod0) dispatch(addApprovalForAll({ nftType: 0, methodNum: 0 }))
        else if (isForAll && isLoadingForAll !== true && isRemovingForAll !== true && !isMethod0) dispatch(addApprovalForAll({ nftType: 0, methodNum: 1 }))
        else if (!isForAll && isLoading !== true && isRemoving !== true && isRemovingERC20 !== true) dispatch(addApproval({nftId: coinId, nftType: 0}))
    }

    const _addERC20Approval = (isBitDao2, isMethod0) => {
        dispatch(addERC20Approval({ isBitDao2: isBitDao2, isMethod0: isMethod0 }))
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
                {toolIndex === null ? 'Tools' : toolIndex === 0 ? 'Approval Manager' : null}
            </Title>
            
            {
                toolIndex === null ? (
                    <ProfilePanel>
                        <CenteredButton onClick={goToApprovalManager}>Approval Management</CenteredButton>
                        <Text>This tool can be used to detect and revoke:</Text>
                        <TextShiftRight>- All active "approvals" on NFTs(erc721) in your wallet</TextShiftRight>
                        <TextShiftRight>- All active "approvals" on token(erc20) contracts you have interacted with</TextShiftRight>
                        <TextShiftRight>- All active "approvals for all" on NFT(erc721) collections you have interacted with</TextShiftRight>
                    </ProfilePanel>
                ) : (toolIndex === 0) ? (
                    address !== null ? (
                        <ViewStyle>
                            <ProfilePanel>
                                <Title2>Approval Search</Title2>
                                <ButtonColumn>
                                    <StyledButton onClick={() => checkForApprovals(false)}>Check for approvals (erc721 & erc20)</StyledButton>
                                    <StyledButton onClick={() => checkForApprovals(true)}>Check for approvals of all (erc721)</StyledButton>
                                </ButtonColumn>
                            </ProfilePanel>
                            {erc20Approvals.length > 0 ?
                                <ProfilePanel>
                                    <Title2>ERC20(Token) Approvals</Title2>
                                    {erc20Approvals.map((contractApprovalDeets, contractApprovalIndex) => {
                                        return (
                                            <ButtonColumn key={`erc20Contract${contractApprovalIndex}`}>
                                                <CenteredText>Token Contract Name: {contractApprovalDeets.contractName}</CenteredText>
                                                <CenteredText>Token Contract Symbol: {contractApprovalDeets.contractSymbol}</CenteredText>
                                                <CenteredText>Token Contract Address: {contractApprovalDeets.contractAddress}</CenteredText>
                                                {contractApprovalDeets.approvedObjects.map((approvedObject, objectIndex) => {
                                                    return(
                                                        <SecondLayerPanel key={`erc20Details${objectIndex}`}>
                                                            <Text>Approved Address: {approvedObject.approvedAddress}</Text>
                                                            <Text>Allowance: {approvedObject.allowance}</Text>
                                                            <CenteredButton onClick={() => _removeApproval(contractApprovalDeets.contractAddress, null, false, approvedObject.approvedAddress, true)}>Revoke Approval</CenteredButton>
                                                        </SecondLayerPanel>
                                                    )
                                                })}
                                            </ButtonColumn>
                                        )
                                    })}
                                </ProfilePanel> : 
                                isNoERC20ApprovalFound === true ?
                                    <ProfilePanel><CenteredText>No ERC20 approvals found</CenteredText></ProfilePanel> : null
                            }
                            {approvals.length > 0 ?
                                <ProfilePanel>
                                    <Title2>ERC721(NFT) Approvals</Title2>
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
                                                            <CenteredButton onClick={() => _removeApproval(contractApprovalDeets.contractAddress, nftDetails.nftId)}>Revoke Approval</CenteredButton>
                                                        </SecondLayerPanel>
                                                    )
                                                })}
                                            </ButtonColumn>
                                        )
                                    })}
                                </ProfilePanel> : 
                                isNoApprovalFound === true ?
                                    <ProfilePanel><CenteredText>No ERC721 approvals found</CenteredText></ProfilePanel> : null
                            }
                            {approvalsForAll.length > 0 ?
                                <ProfilePanel>
                                    <Title2>ERC721(NFT) Approvals For All</Title2>
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
                                                            <CenteredButton onClick={() => _removeApproval(contractApprovalForAllDeets.contractAddress, null, true, approvedAddress)}>Revoke Approval For All</CenteredButton>
                                                        </SecondLayerPanel>
                                                    )
                                                })}
                                            </ButtonColumn>
                                        )
                                    })}
                                </ProfilePanel> : 
                                isNoApprovalForAllFound === true ?
                                    <ProfilePanel><CenteredText>No ERC721 approvals for all found</CenteredText></ProfilePanel> : null
                            }
                            {isAdmin ?
                                <ProfilePanel>
                                    <Title2>Dev Options</Title2>
                                    <ButtonColumn>
                                        <ButtonRow>
                                            <SmallInput2 size={idInputSize} value={antId} onChange={onIdInputChange} />
                                            <ThinStyledButton onClick={() => _addApproval(false)}>Add Ant Approval</ThinStyledButton>
                                        </ButtonRow>
                                        <ButtonRow>
                                            <SmallInput2 size={idInputSize2} value={coinId} onChange={onIdInputChange2} />
                                            <ThinStyledButton onClick={() => _addApproval2(false)}>Add Coin Approval</ThinStyledButton>
                                        </ButtonRow>
                                        <StyledButton onClick={() => _addApproval(true, true)}>Add approval for all ants 0</StyledButton>
                                        <StyledButton onClick={() => _addApproval(true, false)}>Add approval for all ants 1</StyledButton>
                                        <StyledButton onClick={() => _addApproval2(true, true)}>Add approval for all coins 0</StyledButton>
                                        <StyledButton onClick={() => _addApproval2(true, false)}>Add approval for all coins 1</StyledButton>
                                        <StyledButton onClick={() => _addERC20Approval(false, true)}>Add approval for testbitdao1</StyledButton>
                                        <StyledButton onClick={() => _addERC20Approval(false, false)}>Add approval for testbitdao1 1</StyledButton>
                                        <StyledButton onClick={() => _addERC20Approval(true, true)}>Add approval for testbitdao2</StyledButton>
                                        <StyledButton onClick={() => _addERC20Approval(true, false)}>Add approval for testbitdao2 1</StyledButton>
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