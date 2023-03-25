import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectIsConnected, selectIsWrongNet, selectStatus, selectViewLevel } from "../../redux/slices/connectSlice"
import { connectButtonActionIds } from "../connectButtonAction"

export const useConnectButtonAction = (connectButtonActionId, setConnectButtonActionId, isErrInRedux) => {
    const status = useSelector(selectStatus)
    const isWrongNet = useSelector(selectIsWrongNet)
    const isConnected = useSelector(selectIsConnected)
    const viewLevel = useSelector(selectViewLevel)
    useEffect(() => {
        // used to check button action based on conditions returns true if correct action found
        const buttonActionCheck = (actionCondition, actionId) => {
            if (actionCondition) {
                if (connectButtonActionId === actionId) return true
                else {
                    setConnectButtonActionId(actionId)
                    return true
                }
            }
            return false
        }
        let isSatisfied = buttonActionCheck(isErrInRedux, connectButtonActionIds.reload)
        if (!isSatisfied) isSatisfied = buttonActionCheck(isWrongNet, connectButtonActionIds.changeNet)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'succeeded' && !isConnected, connectButtonActionIds.connect)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel < 4, connectButtonActionIds.downloadMM)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel > 3, connectButtonActionIds.downloadBrave)
        if (!isSatisfied) buttonActionCheck(true, connectButtonActionIds.goToProfile)
    }, [connectButtonActionId, setConnectButtonActionId, isErrInRedux, status, isWrongNet, isConnected, viewLevel])
}

export const useSecondaryConnectButtonAction = (connectButtonActionId, setConnectButtonActionId) => {
    const status = useSelector(selectStatus)
    const isWrongNet = useSelector(selectIsWrongNet)
    const viewLevel = useSelector(selectViewLevel)
    useEffect(() => {
        // used to check button action based on conditions returns true if correct action found
        const buttonActionCheck = (actionCondition, actionId) => {
            if (actionCondition) {
                if (connectButtonActionId === actionId) return true
                else {
                    setConnectButtonActionId(actionId)
                    return true
                }
            }
            return false
        }
        let isSatisfied = buttonActionCheck(isWrongNet, connectButtonActionIds.changeNet)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel < 4, connectButtonActionIds.downloadMM)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel > 3, connectButtonActionIds.downloadBrave)
        if (!isSatisfied) buttonActionCheck(true, 'disabled')
    }, [connectButtonActionId, setConnectButtonActionId, status, isWrongNet, viewLevel])
}