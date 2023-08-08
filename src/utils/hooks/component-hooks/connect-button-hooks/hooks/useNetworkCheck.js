import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectNetId } from "../../../../../redux/slices/connectSlice"
import { connectButtonActionIds } from "../../../../connectButtonAction"

const useNetworkCheck = (isOffline, setIsWrongNet, setButtonActionType) => {
    const netId = useSelector(selectNetId)

    useEffect(() => {
        if (isOffline === false) {
            if (netId === 0 || netId === 1) {
                setIsWrongNet(true)
                setButtonActionType(connectButtonActionIds.changeNet)
            }
            else setIsWrongNet(false)
        }
    }, [isOffline, netId, setIsWrongNet, setButtonActionType])
}

export default useNetworkCheck