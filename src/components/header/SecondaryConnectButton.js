import { useDispatch } from "react-redux"
import { StyledButton } from "../../styles/general"
import { connectButtonAction, connectButtonActionIds } from "../../utils/connectButtonAction"

export const SecondaryConnectButton = ({ buttonActionId }) => {
    const dispatch = useDispatch()
    
    return (
        <StyledButton onClick={() => connectButtonAction(dispatch, buttonActionId)}>
            {
                buttonActionId === connectButtonActionIds.changeNet ? "Change Network" :
                buttonActionId === connectButtonActionIds.downloadMM || buttonActionId === connectButtonActionIds.downloadBrave ? "Get Wallet" :
                "out of bounds"
            }
        </StyledButton> 
    )
}