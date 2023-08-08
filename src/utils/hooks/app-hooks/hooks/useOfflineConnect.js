import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatus, updateNetId, updateStatus } from "../../../../redux/slices/connectSlice"
import { getUrlParam } from "../../../url-utils/getUrlParam"
import { netInfo } from "../../../json-constants/networkInfo"

const useOfflineConnect = () => {
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)

    useEffect(() => {
        if (window.hasOwnProperty('ethereum') === false) {
            if (status === 'idle') {
                const passedNetId = getUrlParam('netId', true)
                // no data yet on main net aka 1
                if (!netInfo.hasOwnProperty(passedNetId) || passedNetId === 1) window.location = window.location.pathname + '?netId=5'
                else {
                    dispatch(updateStatus({ status: 'offline' }))
                    dispatch(updateNetId({ netId: passedNetId }))
                }
            }
        }
    }, [status, dispatch])
}

export default useOfflineConnect