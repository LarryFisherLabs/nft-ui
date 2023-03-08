import React, { useEffect, useLayoutEffect } from 'react'

import { connect } from './redux/thunks/connectThunk'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsConnected, selectStatus, selectViewLevel, updateStatus, updateViewLevel } from './redux/slices/connectSlice'
import { AppView } from './views/AppView'

import styled from 'styled-components'


export const AppWrapper = styled.div`
  background-image: linear-gradient(rgb(197,180,227), rgb(77, 143, 234) 900px, rgb(151, 17, 17) 1800px, rgb(214, 118, 0) 2700px, rgb(151, 17, 17) 3600px, rgb(77, 143, 234) 4500px, rgb(197, 180, 227) 5400px, rgb(77, 143, 234) 6300px, rgb(151, 17, 17) 7200px, rgb(214, 118, 0) 8100px);
  background-size: cover;
  min-height: 100vh;
`

function App() {
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)
  const isConnected = useSelector(selectIsConnected)
  const viewLevel = useSelector(selectViewLevel)

  useEffect(() => {
    if (window.ethereum) {
      if (status === 'idle') {
        window.ethereum.on('accountsChanged', (_account) => {if (isConnected) window.location.reload()})
        window.ethereum.on("chainChanged", () => window.location.reload())
        dispatch(connect({}))
      }
    } else if (status === 'idle') {
      dispatch(updateStatus({ status: 'offline' }))
    }
  }, [status, dispatch, isConnected])

  useLayoutEffect(() => {
    const viewWidth = window.innerWidth
    const newViewLevel = viewWidth > 1183 ? 0 : viewWidth > 1034 ? 1 : viewWidth > 937 ? 2 : viewWidth > 847 ? 3 : viewWidth > 647 ? 4 : 5
    dispatch(updateViewLevel({ viewLevel: newViewLevel }))
  }, [viewLevel, dispatch])
  
  return (<AppWrapper><AppView/></AppWrapper>)
}

export default App;