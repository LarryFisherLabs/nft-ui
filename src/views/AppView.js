import React from 'react'
import { useSelector } from 'react-redux'

import { Profile } from './pages/Profile'
import { AntBuilder } from './pages/AntBuilder'
import { AdminPage } from './pages/AdminPage'
import { CoinBuilder } from './pages/CoinBuilder'
import { NftView } from './pages/NftView'
import { NftCollection } from './pages/NftCollection'
import { ProfilePanel, ToolsPage } from './pages/ToolsPage'

import { CenteredText, Text } from '../styles/general'
import { selectErr, selectStatus } from '../redux/slices/connectSlice'
import { selectIsCoinAdmin } from '../redux/slices/coinSlice'
import { Header } from '../components/header/Header'
import { isFormattedBuilder, isFormattedCollectionView, isFormattedNftViewUrl, isFormattedRemoteProfile } from '../utils/url-utils/isUrlFormatted'
import useContractOwnerVerifier from '../utils/hooks/view-hooks/useContractOwnerVerifier'

export const AppView = () => {
  const status = useSelector(selectStatus)
  const errorMsg = useSelector(selectErr)
  const isAdmin = useSelector(selectIsCoinAdmin)

  // once user's wallet address is set in redux figure out if user is owner
  useContractOwnerVerifier()

  return (
    <div>
      <Header />
      {
        status === 'idle' ? <Text>loading...</Text> :
        status === 'failed' ? (
          <ProfilePanel>
            <CenteredText>
              Connection error. Please check wallet/network. Metamask plugin for chrome(on desktop) or brave browser are 
              the preferred methods for accessing this site.
            </CenteredText>
            <CenteredText>
              {errorMsg}
            </CenteredText>
          </ProfilePanel>
        ) :
        status === 'succeeded' || status === 'offline' ? 
          window.location.pathname === '/' ? <Profile /> :
          isFormattedBuilder(true) ? <CoinBuilder /> :
          isFormattedBuilder(false) ? <AntBuilder /> :
          isFormattedCollectionView() ? <NftCollection /> :
          isFormattedNftViewUrl() ? <NftView /> :
          isFormattedRemoteProfile() ? <Profile remoteAddress={window.location.pathname.split('/')[1]} /> :
          (window.location.pathname === '/admin') && isAdmin ? <AdminPage /> :
          window.location.pathname === '/tools' ? <ToolsPage toolIndex={null} /> :
          window.location.pathname === '/tools/approval-manager' ? <ToolsPage toolIndex={0} /> :
          <p>Out of bounds!</p> :
        <Text>{status}</Text>
      }
    </div>
  )
}