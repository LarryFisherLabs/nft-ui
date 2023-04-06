import { useMemo, useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { selectNetId } from "../../redux/slices/connectSlice"
import { changeNet } from "../../redux/thunks/connectThunk"
import { StyledButton } from "../../styles/general"
import { getViewLevel } from "../../utils/deviceType"
import { useSecondaryConnectButtonAction } from "../../utils/hooks/connectButtonActionHook"
import { useOffElementClickListener } from "../../utils/hooks/hooks-general"
import { urls } from "../../utils/json-constants/urls"
import { goToCollectionView } from "../../utils/redirect"
import { isFormattedAntCollectionView, isFormattedCoinCollectionView } from "../../utils/url-utils/isUrlFormatted"
import { SecondaryConnectButton } from "./SecondaryConnectButton"

const StyledOptions = styled.div`
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

export const OptionsMenu = () => {
    const dispatch = useDispatch()
    const netId = useSelector(selectNetId)
    const [isOptionsOpen, updateIsOptionsOpen] = useState(false)
    const [connectButtonActionId, setConnectButtonActionId] = useState('disabled')
    const optionsPanelRef = useRef()
    const optionsToggleRef = useRef()
    const refArray = useMemo(() => [optionsPanelRef, optionsToggleRef], [optionsPanelRef, optionsToggleRef])

    useOffElementClickListener(refArray, isOptionsOpen, updateIsOptionsOpen)
    useSecondaryConnectButtonAction(connectButtonActionId, setConnectButtonActionId)
  
    const toggleOptions = () => {
        updateIsOptionsOpen(!isOptionsOpen)
    }
  
    const openFaucet = () => {
        if (netId !== null) {
            const link = netId === 0 ? urls.sepoliaFaucet : urls.goerliFaucet
            window.open(link, "_blank")
        }
    }
  
    const switchNet = () => {
        if (netId !== null) {
            const newNet = netId === 0 ? 1 : 0
            dispatch(changeNet(newNet))
        }
    }
  
    return (
        <StyledOptions>
            <StyledOptionsButton ref={optionsToggleRef} type='button' onClick={toggleOptions}>...</StyledOptionsButton>
            <StyledOptionsPanel isOpen={isOptionsOpen} id={'options-panel'} ref={optionsPanelRef}>
                {connectButtonActionId === 'disabled' ? null : <SecondaryConnectButton buttonActionId={connectButtonActionId} />}
                {netId === null ? null : <StyledButton onClick={openFaucet}>Go to faucet</StyledButton>}
                {netId === null ? null : <StyledButton onClick={switchNet}>{netId === 0 ? "Switch to Goerli" : "Switch to Sepolia"}</StyledButton>}
                <ButtonsRow>
                    <SelectableStyledButton isSelected={isFormattedCoinCollectionView()} onClick={() => goToCollectionView('coins', 1)}>Coins</SelectableStyledButton>
                    <SelectableStyledButton isSelected={isFormattedAntCollectionView()} onClick={() => goToCollectionView('ants', 1)}>Ants</SelectableStyledButton>
                </ButtonsRow>
                <StyledButton onClick={() => window.location = "/tools"}>Tools</StyledButton>
            </StyledOptionsPanel>
        </StyledOptions>
    )
  }