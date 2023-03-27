import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { NumberedPageNav } from "../components/NumberedPageNav"
import { selectNetId, selectStatus } from "../redux/slices/connectSlice"
import { selectAntDiscountString, selectAntName, selectIsOwnedByUser, selectNftOwner, selectNftViewErr, selectTotalNftCount } from "../redux/slices/nftViewSlice"
import { changeAntName, loadNftCount, loadNftInfo } from "../redux/thunks/nftViewThunks"
import { CanvasPanel, InputWithFlatSide, LargeAntImg, LargeCoinImg, Text, TextLink, ThinStyledButton, Title, ViewStyle } from "../styles/general"
import { getViewLevel } from "../utils/deviceType"
import { getHref } from "../utils/redirect"

const NftPanel = styled(CanvasPanel)`
    align-items: center;
    padding: .5rem 2rem;
    margin-bottom: .3rem;
    padding-bottom: 1.1rem;
    @media ${getViewLevel(4)} {
        padding: .4rem 1.5rem;
    }
    @media ${getViewLevel(5)} {
        padding: .4rem 1rem;
    }
`

const TextRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: .2rem;
`

const TextLeadingSpace = styled(Text)`
    margin-left: .3rem;
`

// nftType
// 0 - coins
// 1 - ants
export const NftView = () => {
    const nftType = window.location.pathname.split('/')[1] === 'coin' ? 0 : 1
    const nftIndex = window.location.pathname.split('/')[2]
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    const antName = useSelector(selectAntName)
    const isOwnedByUser = useSelector(selectIsOwnedByUser)
    const antDiscountString = useSelector(selectAntDiscountString)
    const nftViewErr = useSelector(selectNftViewErr)
    const netId = useSelector(selectNetId)
    const nftOwner = useSelector(selectNftOwner)
    const totalNftCount = useSelector(selectTotalNftCount)

    const [newName, setNewName] = useState()

    const onInputChange = (event) => {
        setNewName(event.target.value)
    }
    
    const changeName = () => {
        dispatch(changeAntName({ id: nftIndex, newName: newName }))
    }

    const getOwnerHref = () => {
        const fullPath = isOwnedByUser ? '/' : '/' + nftOwner
        return getHref(fullPath)
    }

    useEffect(() => {
        if (nftViewErr === null && (status === 'succeeded' || status === 'offline') && totalNftCount === null) {
            dispatch(loadNftCount(nftType))
        } else if (nftViewErr === null && (status === 'succeeded' || status === 'offline') && isOwnedByUser === null && nftIndex < totalNftCount) {
            dispatch(loadNftInfo({ nftType: nftType, nftIndex: nftIndex }))
        }
    }, [nftViewErr, status, isOwnedByUser, dispatch, nftIndex, nftType, totalNftCount])

    return (
        <ViewStyle>
            {
                nftViewErr !== null ? <Text>{nftViewErr}</Text> :
                totalNftCount === null ? <Text>Loading NFT...</Text> :
                (nftIndex >= totalNftCount) && (totalNftCount !== null) ? <Text>NFT has not been minted yet</Text> :
                [
                    <NftPanel key={'panel'}>
                        <Title>
                            {nftType === 0 ? 'Coin #' + nftIndex : antName !== null ? antName : 'Loading...'}
                        </Title>
                        <TextRow>
                            <Text>{"Owner:"}</Text>
                            {
                                isOwnedByUser === null ? 
                                    <TextLeadingSpace>{"Loading..."}</TextLeadingSpace> :
                                    <TextLink href={getOwnerHref()}><u>{isOwnedByUser ? "You" : nftOwner}</u></TextLink>
                            }
                        </TextRow>
                        {
                            nftType === 0 ? 
                                <LargeCoinImg src={'https://nft-api-bphk.onrender.com/' + netId + '/coins/images/' + nftIndex} /> :                                    
                                <LargeAntImg src={'https://nft-api-bphk.onrender.com/' + netId + '/ants/images/' + nftIndex} />
                        }
                        {
                            nftType === 0 ? 
                                <Text>Ant Discount: {antDiscountString === null ? "loading..." : antDiscountString}</Text> :
                            isOwnedByUser ? (
                                <div>
                                    <InputWithFlatSide onChange={onInputChange} />
                                    <ThinStyledButton onClick={changeName}>Change Name</ThinStyledButton>
                                </div>
                            ) : null
                        }
                    </NftPanel>,
                    <NumberedPageNav key={'page-nav'} currentPageIndex={parseInt(nftIndex)} minPageIndex={0} maxPageIndex={totalNftCount - 1} />
                ]
            }
        </ViewStyle>
    )
}