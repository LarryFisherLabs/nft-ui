import React from 'react'

import { Text } from './styles/general'
import { connect } from './redux/thunks/connectThunk'
import { useDispatch, useSelector } from 'react-redux'
import { selectStatus } from './redux/slices/connectSlice'
import { AppView } from './views/AppView'

import styled from 'styled-components'


export const AppWrapper = styled.div`
  background-image: linear-gradient(rgb(197,180,227), rgb(77, 143, 234) 900px, rgb(151, 17, 17) 1800px, rgb(214, 118, 0) 2700px, rgb(151, 17, 17) 3600px, rgb(77, 143, 234) 4500px, rgb(197, 180, 227) 5400px, rgb(77, 143, 234) 6300px, rgb(151, 17, 17) 7200px);
  background-size: cover;
  min-height: 100vh;
`

function App() {
  console.log('start')
  const dispatch = useDispatch()
  const status = useSelector(selectStatus)

  if (window.ethereum) {
    if (status === 'idle') {
      dispatch(connect({}))
    }
  }
  return (<AppWrapper>{
    window.ethereum ? <AppView/> : <Text>Download Metamask</Text>
  }</AppWrapper>)
}

export default App;