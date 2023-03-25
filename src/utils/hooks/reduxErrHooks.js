import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAntStatus } from "../../redux/slices/antSlice"
import { selectCoinStatus } from "../../redux/slices/coinSlice"
import { selectStatus } from "../../redux/slices/connectSlice"
import { selectNftViewErr } from "../../redux/slices/nftViewSlice"

export const useReduxErrCheckAll = (isErrInRedux, setIsErrInRedux) => {
    const status = useSelector(selectStatus)
    const antStatus = useSelector(selectAntStatus)
    const coinStatus = useSelector(selectCoinStatus)
    const nftViewErr = useSelector(selectNftViewErr)

    useEffect(() => {
        if (!isErrInRedux) {
            if ((status === 'failed') || (antStatus === 'failed') || (coinStatus === 'failed') || nftViewErr !== null) setIsErrInRedux(true)
        }
    }, [isErrInRedux, setIsErrInRedux, status, antStatus, coinStatus, nftViewErr])
}