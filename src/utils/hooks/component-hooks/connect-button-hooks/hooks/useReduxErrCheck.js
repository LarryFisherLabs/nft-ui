import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectStatus } from "../../../../../redux/slices/connectSlice"
import { selectAntStatus } from "../../../../../redux/slices/antSlice"
import { selectCoinStatus } from "../../../../../redux/slices/coinSlice"
import { selectNftViewErr } from "../../../../../redux/slices/nftViewSlice"
import { selectToolErr } from "../../../../../redux/slices/toolSlice"
import { connectButtonActionIds } from "../../../../connectButtonAction"


const useReduxErrCheck = (isErrInRedux, setIsErrInRedux, setButtonActionType) => {
    const status = useSelector(selectStatus)
    const antStatus = useSelector(selectAntStatus)
    const coinStatus = useSelector(selectCoinStatus)
    const nftViewErr = useSelector(selectNftViewErr)
    const toolErr = useSelector(selectToolErr)

    useEffect(() => {
        if (!isErrInRedux) {
            if ((status === 'failed') || (antStatus === 'failed') || (coinStatus === 'failed') || nftViewErr !== null || toolErr !== null) {
                setIsErrInRedux(true)
                setButtonActionType(connectButtonActionIds.reload)
            } else setIsErrInRedux(false)
        }
    }, [isErrInRedux, setIsErrInRedux, status, antStatus, coinStatus, nftViewErr, toolErr, setButtonActionType])
}

export default useReduxErrCheck