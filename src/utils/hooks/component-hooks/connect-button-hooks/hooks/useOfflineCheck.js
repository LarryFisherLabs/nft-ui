import { useSelector } from "react-redux"
import { selectStatus } from "../../../../../redux/slices/connectSlice"
import { useEffect } from "react"
import { connectButtonActionIds } from "../../../../connectButtonAction"

const useOfflineCheck = (setIsOffline, isErrInRedux, setButtonActionType) => {
    const status = useSelector(selectStatus)

    useEffect(() => {
        if (isErrInRedux === false) {
            if (status === 'offline') {
                setIsOffline(true)
                if (window.innerWidth > 1024) setButtonActionType(connectButtonActionIds.downloadMM)
                else setButtonActionType(connectButtonActionIds.downloadBrave)
            }
            else if (status === 'succeeded') setIsOffline(false)
        }
    }, [isErrInRedux, status, setIsOffline, setButtonActionType])
}

export default useOfflineCheck