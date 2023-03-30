import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { InputWithFlatSide, Text, ThinStyledButton } from "../styles/general"
import { useOffElementClickListener } from "../utils/hooks/hooks-general"
import { goToCollectionView } from "../utils/redirect"

const SmallInput = styled(InputWithFlatSide)`
    width: ${props => `${1.8 + (props.size * .4)}em`};
    max-width: 4.3em;
    padding-left: .3rem;
`

const StyledNftNavBar = styled.div`
    display: grid;
    flex-flow: row nowrap;
    align-items: center;
    grid-template-columns: 1fr 5fr 1fr;
`

const ButtonText = styled(Text)`
    cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
    color: ${props => props.isDisabled ? 'red' : 'null'};
    justify-self: center;
    font-size: 1.1rem;
`

const MirroredText = styled(ButtonText)`
    transform: scale(-1, 1);
`

const CenteredDiv = styled.div`
    justify-self: center;
`

export const NumberedPageNav = ({ currentPageIndex, minPageIndex, maxPageIndex }) => {
    const idInputRef = useRef()

    const [targetIndex, setTargetIndex] = useState(currentPageIndex)
    const [isIdInputSelected, setIsIdInputSelected] = useState(false)
    const [idInputSize, setIdInputSize] = useState(1)
    const refArray = useMemo(() => [idInputRef], [idInputRef])

    const onTargetIdInputChange = (event) => {
        const id = parseInt(event.target.value)
        if (!isNaN(id)) {
            const finalId = id > maxPageIndex ? maxPageIndex : id < minPageIndex ? minPageIndex : id
            if (targetIndex !== finalId) setTargetIndex(finalId)
            const finalIdSize = finalId.toString().length
            if (finalIdSize !== idInputSize) setIdInputSize(finalIdSize)
        } else {
            setTargetIndex('')
            if (idInputSize !== 0) setIdInputSize(0)
        }
    }

    const onTargetIdInputClick = (event) => {
        const inputRef = event.target
        if (!isIdInputSelected) {
            inputRef.setSelectionRange(0, inputRef.value.length)
            setIsIdInputSelected(true)
        }
    }

    const switchPage = (newPageIndex) => {
        const pathName = window.location.pathname.split('/')[1]
        goToCollectionView(pathName, newPageIndex)
    }

    useEffect(() => {
        if (targetIndex === '' && !isIdInputSelected) {
            setTargetIndex(currentPageIndex)
            setIdInputSize(currentPageIndex.toString().length)
        }
    }, [targetIndex, isIdInputSelected, setTargetIndex, currentPageIndex])

    useOffElementClickListener(refArray, isIdInputSelected, setIsIdInputSelected)

    return (
        <StyledNftNavBar>
            <ButtonText isDisabled={currentPageIndex === minPageIndex} onClick={() => {
                if (currentPageIndex !== minPageIndex) {
                    switchPage(currentPageIndex - 1)
                }
            }}>&#9668;</ButtonText>
            <CenteredDiv>
                <SmallInput size={idInputSize} ref={idInputRef} value={targetIndex} onChange={onTargetIdInputChange} onClick={onTargetIdInputClick}/>
                <ThinStyledButton onClick={() => switchPage(targetIndex)}>Go</ThinStyledButton>
            </CenteredDiv>
            <MirroredText isDisabled={currentPageIndex === maxPageIndex} onClick={() => {
                if (currentPageIndex !== maxPageIndex) {
                    switchPage(currentPageIndex + 1)
                }
            }}>&#9668;</MirroredText>
        </StyledNftNavBar>
    )
}