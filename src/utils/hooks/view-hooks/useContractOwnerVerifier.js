import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAccount, selectNetId } from "../../../redux/slices/connectSlice"
import { loadCoinAdmin } from "../../../redux/thunks/coinAdminThunks"

const useContractOwnerVerifier = () => {
    const dispatch = useDispatch()
    const address = useSelector(selectAccount)
    const netId = useSelector(selectNetId)
    const [isSupportedNet, setIsSupportedNet] = useState(null)

    useEffect(() => {
        if (netId !== null && netId !== 0 && netId !== 1) setIsSupportedNet(true)
        else if (netId !== null) setIsSupportedNet(false)
    }, [netId])
    
    useEffect(() => {
        if (address !== null && isSupportedNet === true) dispatch(loadCoinAdmin())
    }, [dispatch, address, isSupportedNet])
}

export default useContractOwnerVerifier