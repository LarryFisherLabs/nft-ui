import React from 'react'
import styled from 'styled-components'

import { AppView } from './views/AppView'
import { PopupBar } from './components/popups/PopupBar'
import useAppHooks from './utils/hooks/app-hooks/useAppHooks'


const AppWrapper = styled.div`
  background-image: linear-gradient(rgb(197,180,227), rgb(77, 143, 234) 900px, rgb(151, 17, 17) 1800px, rgb(214, 118, 0) 2700px, rgb(151, 17, 17) 3600px, rgb(77, 143, 234) 4500px, rgb(197, 180, 227) 5400px, rgb(77, 143, 234) 6300px, rgb(151, 17, 17) 7200px, rgb(214, 118, 0) 8100px);
  background-size: cover;
  min-height: 100vh;
`

// Different app states:
//   Offline:
//     desc: user does not have a recognized browser wallet
//     tell: connect slice status will be "offline"
//   Not Connected:
//     desc: user has a recognized browser wallet but it is not connected
//     tell: connect slice status will be "succeeded" but connect slice account variable is null
// TODO: Add other states!

function App() {
  // run all initial hooks
  useAppHooks()
  
  return (
    <AppWrapper>
      <AppView/>
      <PopupBar />
    </AppWrapper>
  )
}

export default App;