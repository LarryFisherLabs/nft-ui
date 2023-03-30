import React, { useEffect, useLayoutEffect, useState } from 'react'

import { connect } from './redux/thunks/connectThunk'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsConnected, selectNetId, selectStatus, selectViewLevel, updateIsConnected, updateNetId, updateStatus, updateViewLevel } from './redux/slices/connectSlice'
import { AppView } from './views/AppView'

import styled from 'styled-components'
import { viewLevelMaxWidth } from './utils/deviceType'
import { getUrlParam } from './utils/url-utils/getUrlParam'
import { Popup } from './components/popups/Popup'
import Cookies from 'js-cookie'


const AppWrapper = styled.div`
  background-image: linear-gradient(rgb(197,180,227), rgb(77, 143, 234) 900px, rgb(151, 17, 17) 1800px, rgb(214, 118, 0) 2700px, rgb(151, 17, 17) 3600px, rgb(77, 143, 234) 4500px, rgb(197, 180, 227) 5400px, rgb(77, 143, 234) 6300px, rgb(151, 17, 17) 7200px, rgb(214, 118, 0) 8100px);
  background-size: cover;
  min-height: 100vh;
`

function App() {
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const isConnected = useSelector(selectIsConnected)
  const viewLevel = useSelector(selectViewLevel)
  const netId = useSelector(selectNetId)
  const [cookieNetId, setCookieNetId] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      if (status === 'idle') {
        window.ethereum.on('accountsChanged', (_account) => {if (isConnected) window.location.reload()})
        window.ethereum.on("chainChanged", () => window.location.reload())
        dispatch(connect({}))
      }
    } else if (status === 'idle') {
      const passedNetId = getUrlParam('netId', true)
      if (passedNetId !== 0 && passedNetId !== 1) window.location = window.location.pathname + '?netId=1'
      else {
        dispatch(updateStatus({ status: 'offline' }))
        dispatch(updateNetId({ netId: passedNetId }))
        dispatch(updateIsConnected({ isConnected: false }))
      }
    }
  }, [status, dispatch, isConnected])

  useEffect(() => {
    if (netId !== null && cookieNetId !== netId) {
      const lastNetId = parseInt(Cookies.get('netId'))
      if (lastNetId !== netId) {
        setIsVisible(true)
        Cookies.set('netId', netId, { expires: 40 })
        setCookieNetId(netId)
      } else if (netId !== cookieNetId) setCookieNetId(netId)
    }
  }, [netId, cookieNetId])

  useLayoutEffect(() => {
    const viewWidth = window.innerWidth
    const maxWidths = viewLevelMaxWidth
    const newViewLevel = viewWidth > maxWidths[0] ? 0 : viewWidth > maxWidths[1] ? 1 : viewWidth > maxWidths[2] ? 2 : viewWidth > maxWidths[3] ? 3 : viewWidth > maxWidths[4] ? 4 : 5
    dispatch(updateViewLevel({ viewLevel: newViewLevel }))
  }, [viewLevel, dispatch])
  
  return (
    <AppWrapper>
      <AppView/>
      <Popup isVisible={isVisible} setIsVisible={setIsVisible} />
    </AppWrapper>
  )
}

export default App;