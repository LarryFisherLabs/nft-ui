import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { NumberedPageNav } from "../components/NumberedPageNav"
import { selectNetId, selectStatus } from "../redux/slices/connectSlice"
import { selectNftViewErr, selectTotalNftCount } from "../redux/slices/nftViewSlice"
import { loadNftCount } from "../redux/thunks/nftViewThunks"
import { AntImg, CenteredText, CoinImg, NftGrid, Panel, Text, Title, ViewStyle } from "../styles/general"
import { goToCollectionView, goToNftView } from "../utils/redirect"
import { useDefaultNetwork } from "../utils/hooks/hooks-general"
import { ProfilePanel } from "./ToolsPage"

const nftsPerPage = 8

export const MappedNfts = ({ startIndex, finishIndex }) => {
    if (finishIndex < startIndex) goToCollectionView(window.location.pathname.split('/')[1], (Math.floor(finishIndex / 8) + 1))
    const stateNetId = useSelector(selectNetId)
    const [netId, setNetId] = useState(null)

    useDefaultNetwork(stateNetId, netId, setNetId)
    const nftType = window.location.pathname.split('/')[1] === 'coins' ? 0 : 1
    const nftSrcArray = []

    for (let i = startIndex; i < finishIndex + 1; i++) {
        const pathName = nftType === 0 ? 'coins' : 'ants'
        const imgSrc = 'https://nft-api-bphk.onrender.com/' + netId + '/' + pathName + '/images/' + i
        nftSrcArray.push(imgSrc)
    }

    if (netId === null) return null

    return (
        <NftGrid>{
            nftSrcArray.map((imgSrc, i) => {
                if (nftType === 0) return (<CoinImg onClick={() => goToNftView('coin', i + startIndex)} src={imgSrc} key={i} />)
                else return (<AntImg onClick={() => goToNftView('ant', i + startIndex)} src={imgSrc} key={i} />)
            })
        }</NftGrid>
    )
}

const CenteredTitle = styled(Title)`
    text-align: center;
`

// nftType
// 0 - coins
// 1 - ants
export const NftCollection = () => {
    const dispatch = useDispatch()
    const nftType = window.location.pathname.split('/')[1] === 'coins' ? 0 : 1
    const pageNumber = parseInt(window.location.pathname.split('/')[2])
    const status = useSelector(selectStatus)
    const totalNftCount = useSelector(selectTotalNftCount)
    const nftViewErr = useSelector(selectNftViewErr)
    const [pageTitle, setPageTitle] = useState()
    const [maxPageIndex, setMaxPageIndex] = useState(null)
    const [finishIndex, setFinishIndex] = useState(pageNumber * nftsPerPage - 1)
    const startIndex = (pageNumber - 1) * nftsPerPage

    useEffect(() => {
        if ((status === 'succeeded' || status === 'offline') && totalNftCount === null) dispatch(loadNftCount(nftType))
        else if (totalNftCount !== null && maxPageIndex === null) {
            if (totalNftCount - 1 < finishIndex) setFinishIndex(totalNftCount - 1)
            const pageTitleStart = nftType === 0 ? startIndex === totalNftCount - 1 ? 'Coin ' : 'Coins ' : startIndex === totalNftCount - 1 ? 'Ant ' : 'Ants '
            const pageTitleRange = startIndex === totalNftCount - 1 ? `${startIndex}` : `${startIndex}-${totalNftCount - 1 < finishIndex ? totalNftCount - 1 : finishIndex}`
            setPageTitle(`${pageTitleStart}${pageTitleRange}`)
            setMaxPageIndex(Math.floor((totalNftCount - 1) / nftsPerPage) + 1)
        }
    }, [status, totalNftCount, dispatch, nftType, pageTitle, startIndex, finishIndex, maxPageIndex])

    return (
        <ViewStyle>
            {
                nftViewErr !== null ? <ProfilePanel><CenteredText>Error connecting to contract: {nftViewErr}</CenteredText></ProfilePanel> :
                maxPageIndex === null ? <Text>Loading collection...</Text> :
                [
                    <Panel key={'collection-panel'} startIndex={startIndex} finishIndex={finishIndex}>
                        <CenteredTitle>{pageTitle}</CenteredTitle>
                        <MappedNfts startIndex={startIndex} finishIndex={finishIndex} />
                    </Panel>,
                    <NumberedPageNav key={'page-nav'} currentPageIndex={pageNumber} minPageIndex={1} maxPageIndex={maxPageIndex} />
                ]
            }
        </ViewStyle>
    )
}