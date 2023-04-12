import React, { useEffect, useLayoutEffect, useState } from 'react'

import { idleConnect } from './redux/thunks/connectThunk'
import { useDispatch, useSelector } from 'react-redux'
import { addPopup, selectAccount, selectNetId, selectStatus, selectViewLevel, updateNetId, updateStatus, updateViewLevel } from './redux/slices/connectSlice'
import { AppView } from './views/AppView'

import styled from 'styled-components'
import { viewLevelMaxWidth } from './utils/deviceType'
import { getUrlParam } from './utils/url-utils/getUrlParam'
import Cookies from 'js-cookie'
import { PopupBar } from './components/popups/PopupBar'
import { netInfo } from './utils/json-constants/networkInfo'


const AppWrapper = styled.div`
  background-image: linear-gradient(rgb(197,180,227), rgb(77, 143, 234) 900px, rgb(151, 17, 17) 1800px, rgb(214, 118, 0) 2700px, rgb(151, 17, 17) 3600px, rgb(77, 143, 234) 4500px, rgb(197, 180, 227) 5400px, rgb(77, 143, 234) 6300px, rgb(151, 17, 17) 7200px, rgb(214, 118, 0) 8100px);
  background-size: cover;
  min-height: 100vh;
`

function App() {
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const viewLevel = useSelector(selectViewLevel)
  const netId = useSelector(selectNetId)
  const address = useSelector(selectAccount)
  const [cookieNetId, setCookieNetId] = useState(null)

  useEffect(() => {
    if (window.ethereum) {
      if (status === 'idle') {
        window.ethereum.on('accountsChanged', (_account) => {if (address !== null) window.location.reload()})
        window.ethereum.on("chainChanged", () => window.location.reload())
        dispatch(idleConnect({}))
      }
    } else if (status === 'idle') {
      const passedNetId = getUrlParam('netId', true)
      // no data yet on main net aka 1
      if (!netInfo.hasOwnProperty(passedNetId) || passedNetId === 1) window.location = window.location.pathname + '?netId=5'
      else {
        dispatch(updateStatus({ status: 'offline' }))
        dispatch(updateNetId({ netId: passedNetId }))
      }
    }
  }, [status, dispatch, address])

  useEffect(() => {
    if (netId !== null && cookieNetId !== netId) {
      const lastNetId = parseInt(Cookies.get('netId'))
      if (lastNetId !== netId) {
        dispatch(addPopup({ id: netInfo[netId].popupId }))
        Cookies.set('netId', netId, { expires: 40 })
        setCookieNetId(netId)
      } else if (netId !== cookieNetId) setCookieNetId(netId)
    }
  }, [dispatch, netId, cookieNetId])

  useLayoutEffect(() => {
    const viewWidth = window.innerWidth
    const maxWidths = viewLevelMaxWidth
    const newViewLevel = viewWidth > maxWidths[0] ? 0 : viewWidth > maxWidths[1] ? 1 : viewWidth > maxWidths[2] ? 2 : viewWidth > maxWidths[3] ? 3 : viewWidth > maxWidths[4] ? 4 : 5
    dispatch(updateViewLevel({ viewLevel: newViewLevel }))
  }, [viewLevel, dispatch])
  
  return (
    <AppWrapper>
      <AppView/>
      <PopupBar />
    </AppWrapper>
  )
}

export default App;