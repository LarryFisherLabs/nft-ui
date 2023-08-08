import { useState } from "react"
import useOfflineCheck from "./hooks/useOfflineCheck"
import useReduxErrCheck from "./hooks/useReduxErrCheck"
import useNetworkCheck from "./hooks/useNetworkCheck"
import useConnectionCheck from "./hooks/useConnectionCheck"

const useConnectButtonHooks = (setButtonActionType) => {
    const [isErrInRedux, setIsErrInRedux] = useState(null)
    const [isOffline, setIsOffline] = useState(null)
    const [isWrongNet, setIsWrongNet] = useState(null)

    useReduxErrCheck(isErrInRedux, setIsErrInRedux, setButtonActionType)
    useOfflineCheck(setIsOffline, isErrInRedux, setButtonActionType)
    useNetworkCheck(isOffline, setIsWrongNet, setButtonActionType)
    useConnectionCheck(isWrongNet, setButtonActionType)
}

export default useConnectButtonHooks