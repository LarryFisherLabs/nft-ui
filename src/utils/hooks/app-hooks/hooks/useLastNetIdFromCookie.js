import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { addPopup, selectNetId } from "../../../../redux/slices/connectSlice"
import { netInfo } from "../../../json-constants/networkInfo"

const useLastNetIdFromCookie = () => {
  const dispatch = useDispatch()
  const netId = useSelector(selectNetId)
  const [cookieNetId, setCookieNetId] = useState(null)
  
  useEffect(() => {
    if (netId !== null && cookieNetId !== netId) {
      const lastNetId = parseInt(Cookies.get('netId'))
      if (lastNetId !== netId) {
        // there is a different useEffect for netId 0 (aka wrong net) popup so that it occurs on every load
        if (netId !== 0) dispatch(addPopup({ id: netInfo[netId].popupId }))
        Cookies.set('netId', netId, { expires: 40 })
        setCookieNetId(netId)
      } else setCookieNetId(netId)
    }
  }, [dispatch, netId, cookieNetId])
}

export default useLastNetIdFromCookie