import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Profile } from './Profile'
import { AntBuilder } from './AntBuilder'
import { AdminPage } from './AdminPage'
import { CoinBuilder } from './CoinBuilder'

import { Text } from '../styles/general'
import { selectErr, selectIsConnected, selectStatus } from '../redux/slices/connectSlice'
import { loadCoinAdmin } from '../redux/thunks/coinAdminThunks'
import { selectIsCoinAdmin } from '../redux/slices/coinSlice'

import { NftView } from './NftView'
import { NftCollection } from './NftCollection'
import { Header } from '../components/header/Header'
import { isFormattedBuilder, isFormattedCollectionView, isFormattedNftViewUrl, isFormattedRemoteProfile } from '../utils/url-utils/isUrlFormatted'

export const AppView = () => {
  const dispatch = useDispatch()

  const status = useSelector(selectStatus)
  const errorMsg = useSelector(selectErr)
  const isConnected = useSelector(selectIsConnected)
  const isAdmin = useSelector(selectIsCoinAdmin)

  useEffect(() => {
    if (status === 'succeeded' && isConnected && isAdmin === null) dispatch(loadCoinAdmin())
  }, [status, dispatch, isConnected, isAdmin])

  return (
    <div>
      <Header />
      {
        status === 'idle' ? <Text>loading...</Text> :
        status === 'failed' ? <p>{errorMsg}</p> :
        status === 'succeeded' || status === 'offline' ? 
          window.location.pathname === '/' ? <Profile /> :
          isFormattedBuilder(true) ? <CoinBuilder /> :
          isFormattedBuilder(false) ? <AntBuilder /> :
          isFormattedCollectionView() ? <NftCollection /> :
          isFormattedNftViewUrl() ? <NftView /> :
          isFormattedRemoteProfile() ? <Profile remoteAddress={window.location.pathname.split('/')[1]} /> :
          (window.location.pathname === '/admin') && isAdmin ? <AdminPage /> :
          <p>Out of bounds!</p> :
        <Text>{status}</Text>
      }
    </div>
  )
}