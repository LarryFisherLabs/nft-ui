import { useDispatch } from "react-redux"
import { useLayoutEffect } from "react"
import { viewLevelMaxWidth } from "../../../deviceType"
import { updateViewLevel } from "../../../../redux/slices/connectSlice"

const useLayoutViewLevel = () => {
    const dispatch = useDispatch()
    
    useLayoutEffect(() => {
        const viewWidth = window.innerWidth
        const maxWidths = viewLevelMaxWidth
        const newViewLevel = viewWidth > maxWidths[0] ? 0 : viewWidth > maxWidths[1] ? 1 : viewWidth > maxWidths[2] ? 2 : viewWidth > maxWidths[3] ? 3 : viewWidth > maxWidths[4] ? 4 : 5
        dispatch(updateViewLevel({ viewLevel: newViewLevel }))
    }, [dispatch])
}

export default useLayoutViewLevel