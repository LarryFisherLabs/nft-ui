import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAccount, selectNetId, selectStatus, selectViewLevel } from "../../redux/slices/connectSlice"
import { connectButtonActionIds } from "../connectButtonAction"

export const useConnectButtonAction = (connectButtonActionId, setConnectButtonActionId, isErrInRedux) => {
    const status = useSelector(selectStatus)
    const netId = useSelector(selectNetId)
    const address = useSelector(selectAccount)
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
        if (!isSatisfied) isSatisfied = buttonActionCheck(netId === 0, connectButtonActionIds.changeNet)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'succeeded' && address === null, connectButtonActionIds.connect)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel < 4, connectButtonActionIds.downloadMM)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel > 3, connectButtonActionIds.downloadBrave)
        if (!isSatisfied) buttonActionCheck(address !== null, connectButtonActionIds.goToProfile)
    }, [connectButtonActionId, setConnectButtonActionId, isErrInRedux, status, netId, address, viewLevel])
}

export const useSecondaryConnectButtonAction = (connectButtonActionId, setConnectButtonActionId) => {
    const status = useSelector(selectStatus)
    const netId = useSelector(selectNetId)
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
        let isSatisfied = buttonActionCheck(netId === 0, connectButtonActionIds.changeNet)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel < 4, connectButtonActionIds.downloadMM)
        if (!isSatisfied) isSatisfied = buttonActionCheck(status === 'offline' && viewLevel > 3, connectButtonActionIds.downloadBrave)
        if (!isSatisfied) buttonActionCheck(true, 'disabled')
    }, [connectButtonActionId, setConnectButtonActionId, status, netId, viewLevel])
}