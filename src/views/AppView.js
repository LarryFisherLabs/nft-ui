import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Profile } from './Profile'
import { AntBuilder } from './AntBuilder'
import { AdminPage } from './AdminPage'
import { CoinBuilder } from './CoinBuilder'

import { CenteredText, Text } from '../styles/general'
import { selectAccount, selectErr, selectNetId, selectStatus } from '../redux/slices/connectSlice'
import { loadCoinAdmin } from '../redux/thunks/coinAdminThunks'
import { selectIsCoinAdmin } from '../redux/slices/coinSlice'

import { NftView } from './NftView'
import { NftCollection } from './NftCollection'
import { Header } from '../components/header/Header'
import { isFormattedBuilder, isFormattedCollectionView, isFormattedNftViewUrl, isFormattedRemoteProfile } from '../utils/url-utils/isUrlFormatted'
import { ProfilePanel, ToolsPage } from './ToolsPage'

export const AppView = () => {
  const dispatch = useDispatch()

  const status = useSelector(selectStatus)
  const errorMsg = useSelector(selectErr)
  const isAdmin = useSelector(selectIsCoinAdmin)
  const netId = useSelector(selectNetId)
  const address = useSelector(selectAccount)

  useEffect(() => {
    if (status === 'succeeded' && address !== null && isAdmin === null && netId !== 0 && netId !== 1 && netId !== null) dispatch(loadCoinAdmin())
  }, [status, dispatch, address, isAdmin, netId])

  return (
    <div>
      <Header />
      {
        status === 'idle' ? <Text>loading...</Text> :
        status === 'failed' ? <ProfilePanel><CenteredText>{errorMsg}</CenteredText></ProfilePanel> :
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