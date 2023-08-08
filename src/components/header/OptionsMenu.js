import { useMemo, useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { selectNetId, selectStatus } from "../../redux/slices/connectSlice"
import { changeNet } from "../../redux/thunks/connectThunk"
import { StyledButton } from "../../styles/general"
import { getViewLevel } from "../../utils/deviceType"
import { useOffElementClickListener } from "../../utils/hooks/hooks-general"
import { urls } from "../../utils/json-constants/urls"
import { goToCollectionView, goToTools } from "../../utils/redirect"
import { isFormattedAntCollectionView, isFormattedCoinCollectionView } from "../../utils/url-utils/isUrlFormatted"
import { SecondaryConnectButton } from "./SecondaryConnectButton"
import { connectButtonActionIds } from "../../utils/connectButtonAction"
import { useEffect } from "react"

const StyledOptions = styled.div`
  pointer-events: auto;
  justify-self: flex-end;
  flex-flow: column nowrap;
  @media ${getViewLevel(4)} {
    margin-top: -.6rem;
    margin-right: -.4rem;
  }
`

const StyledOptionsButton = styled(StyledButton)`
  padding: .5rem;
  background-color: #946cb0;
  min-width: 45px;
  @media ${getViewLevel(6)} {
    min-width: 37px;
    padding: .32rem;
    margin-right: -.1rem;
  }
`

const StyledOptionsPanel = styled.div`
    width: 150px;
    margin-left: -6.6rem;
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-flow: column nowrap;
    z-index: 2;
    position: absolute;
    background-color: #946cb0;
    padding: 4px;
    border-radius: 16px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonborder;
`

const ButtonsRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: fit-content;
  align-self: center;
`

const SelectableStyledButton = styled(StyledButton)`
    background-color: ${props => props.isSelected ? 'rgb(241 132 200)' : null};
`

export const OptionsMenu = ({ connectButtonActionId }) => {
    const dispatch = useDispatch()
    const netId = useSelector(selectNetId)
    const status = useSelector(selectStatus)
    const [isOptionsOpen, updateIsOptionsOpen] = useState(false)
    const [isCnctBtnDis, setIsCnctBtnDis] = useState(true)
    const optionsPanelRef = useRef()
    const optionsToggleRef = useRef()
    const refArray = useMemo(() => [optionsPanelRef, optionsToggleRef], [optionsPanelRef, optionsToggleRef])

    useOffElementClickListener(refArray, isOptionsOpen, updateIsOptionsOpen)

    useEffect(() => {
        // button should only be present for reload or get wallet
        if (connectButtonActionId === connectButtonActionIds.reload || connectButtonActionId === connectButtonActionIds.downloadBrave || connectButtonActionId === connectButtonActionIds.downloadMM) {
            setIsCnctBtnDis(false)
        } else setIsCnctBtnDis(true)
    }, [connectButtonActionId])
  
    const toggleOptions = () => {
        updateIsOptionsOpen(!isOptionsOpen)
    }
  
    const openFaucet = () => {
        const link = netId === 5 ? urls.goerliFaucet : urls.sepoliaFaucet
        window.open(link, "_blank")
    }
  
    const switchNet = (newNetId) => {
        dispatch(changeNet(newNetId))
    }
  
    return (
        <StyledOptions>
            <StyledOptionsButton ref={optionsToggleRef} type='button' onClick={toggleOptions}>...</StyledOptionsButton>
            <StyledOptionsPanel isOpen={isOptionsOpen} id={'options-panel'} ref={optionsPanelRef}>
                {isCnctBtnDis === true ? null : <SecondaryConnectButton buttonActionId={connectButtonActionId} />}
                {netId === null ? null : <StyledButton onClick={openFaucet}>Go to faucet</StyledButton>}
                {netId === null || netId === 11155111 ? null : <StyledButton onClick={() => switchNet(11155111)}>Switch to Sepolia</StyledButton>}
                {netId === null || netId === 5 ? null : <StyledButton onClick={() => switchNet(5)}>Switch to Goerli</StyledButton>}
                {netId === null || netId === 1 || status === 'offline' ? null : <StyledButton onClick={() => switchNet(1)}>Main Net</StyledButton>}
                <ButtonsRow>
                    <SelectableStyledButton isSelected={isFormattedCoinCollectionView()} onClick={() => goToCollectionView('coins', 1)}>Coins</SelectableStyledButton>
                    <SelectableStyledButton isSelected={isFormattedAntCollectionView()} onClick={() => goToCollectionView('ants', 1)}>Ants</SelectableStyledButton>
                </ButtonsRow>
                <StyledButton onClick={goToTools}>Tools</StyledButton>
            </StyledOptionsPanel>
        </StyledOptions>
    )
  }