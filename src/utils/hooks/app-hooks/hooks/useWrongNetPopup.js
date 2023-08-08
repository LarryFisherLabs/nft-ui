import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { popupTypes } from "../../../json-constants/popupInfo"
import { addPopup, selectNetId } from "../../../../redux/slices/connectSlice"

const useWrongNetPopup = () => {
    const dispatch = useDispatch()
    const netId = useSelector(selectNetId)
    
    useEffect(() => {
        if (netId === 0) dispatch(addPopup({ id: popupTypes.wrongNetData }))
    }, [dispatch, netId])
}

export default useWrongNetPopup