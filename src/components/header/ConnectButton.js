import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { selectAccount } from "../../redux/slices/connectSlice"
import { StyledButton } from "../../styles/general"
import { connectButtonAction, connectButtonActionIds } from "../../utils/connectButtonAction"
import { getViewLevel } from "../../utils/deviceType"
import { useConnectButtonAction } from "../../utils/hooks/connectButtonActionHook"
import { useReduxErrCheckAll } from "../../utils/hooks/reduxErrHooks"

const StyledConnectButton = styled(StyledButton)`
  pointer-events: auto;
  padding: .2rem;
  font-size: 1.1rem;
  margin-right: 1rem;
  justify-self: flex-end;
  display: ${props => props.index === 0 ? 'block' : 'none'};
  background-color: ${props => props.isHome || (props.buttonActionId !== connectButtonActionIds.goToProfile && props.buttonActionId !== null) ? 'rgb(241 132 200)' : null};
  cursor: ${props => props.isHome && props.buttonActionId === connectButtonActionIds.goToProfile ? 'default' : null};
  @media ${getViewLevel(3)} {
    font-size: 1rem;
    margin-right: 0;
    margin-top: -.8rem;
    display: ${props => props.index === 0 ? 'none' : 'block'};
  }
  @media ${getViewLevel(4)} {
    margin-top: -.6rem;
    font-size: .85rem;
  }
`

// index 0 is inline connect button for desktop/larger screen
// index 1 is below nav for phone/smaller screen
// only one index should be showing at a time
export const ConnectButton = ({ index }) => {
  const account = useSelector(selectAccount)
  const dispatch = useDispatch()
  const [isErrInRedux, setIsErrInRedux] = useState(false)
  const [connectButtonActionId, setConnectButtonActionId] = useState(null)
  const isHome = window.location.pathname === '/'

  useReduxErrCheckAll(isErrInRedux, setIsErrInRedux)

  useConnectButtonAction(connectButtonActionId, setConnectButtonActionId, isErrInRedux)

  return (
    <StyledConnectButton isHome={isHome} buttonActionId={connectButtonActionId} type="button" onClick={() => connectButtonAction(dispatch, connectButtonActionId)} index={index}>
      {
        connectButtonActionId === null ? "loading..." :
        connectButtonActionId === connectButtonActionIds.reload ? "Reload" :
        connectButtonActionId === connectButtonActionIds.changeNet ? "Change Network" :
        connectButtonActionId === connectButtonActionIds.connect ? "Connect Wallet" :
        connectButtonActionId === connectButtonActionIds.goToProfile && account ? account :
        connectButtonActionId === connectButtonActionIds.downloadMM ? "Download Metamask" :
        connectButtonActionId === connectButtonActionIds.downloadBrave ? "Download Brave" :
        "Loading..."
      }
    </StyledConnectButton>
  )
}