import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus } from "../../../../redux/slices/connectSlice"
import { idleConnect } from "../../../../redux/thunks/connectThunk"

const useIdleConnect = () => {
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)

    useEffect(() => {
        if (window.hasOwnProperty('ethereum')) {
            if (status === 'idle') dispatch(idleConnect())
        }
    }, [status, dispatch])
}

export default useIdleConnect