import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAccount } from "../../../../../redux/slices/connectSlice"
import { connectButtonActionIds } from "../../../../connectButtonAction"

const useConnectionCheck = (isWrongNet, setButtonActionType) => {
    const address = useSelector(selectAccount)

    useEffect(() => {
        if (isWrongNet === false) {
            if (address === null) setButtonActionType(connectButtonActionIds.connect)
            else setButtonActionType(connectButtonActionIds.goToProfile)
        }
    }, [isWrongNet, address, setButtonActionType])
}

export default useConnectionCheck