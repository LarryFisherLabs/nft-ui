import useIdleConnect from "./hooks/useIdleConnect"
import useLastNetIdFromCookie from "./hooks/useLastNetIdFromCookie"
import useLayoutViewLevel from "./hooks/useLayoutViewLevel"
import useNetAndAccListener from "./hooks/useNetAndAccListener"
import useOfflineConnect from "./hooks/useOfflineConnect"
import useWrongNetPopup from "./hooks/useWrongNetPopup"

const useAppHooks = () => {
    // reload page if network or account are changed
    useNetAndAccListener()

    // if status is idle (aka initial load) and wallet is present run idle connect
    useIdleConnect()

    // if status is idle (aka initial load) and wallet is not present run offline connect
    useOfflineConnect()

    // anytime app loads connected to wrong network give user a popup
    useWrongNetPopup()

    // once netId is loaded check if it is different from user's cookie netId give popup for new network and update cookie if necessary
    useLastNetIdFromCookie()

    // on render get screen width view level
    useLayoutViewLevel()
}

export default useAppHooks