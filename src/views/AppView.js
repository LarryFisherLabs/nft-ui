import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Profile } from './Profile'
import { AntBuilder } from './AntBuilder'
import { AdminPage } from './AdminPage'
import { CoinBuilder } from './CoinBuilder'

import { StyledButton, Text, Title } from '../styles/general'
import { selectAccount, selectErr, selectIsConnected, selectStatus } from '../redux/slices/connectSlice'
import { loadCoinAdmin } from '../redux/thunks/coinAdminThunks'
import { selectIsCoinAdmin } from '../redux/slices/coinSlice'

import styled from 'styled-components'
import { connect } from '../redux/thunks/connectThunk'

export const Nav = styled.div`
  margin-left: 2rem;
  background-color: rgb(145, 162, 230);
  width: fit-content;
  padding: 2px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonborder;
`

export const LinkButton = styled.a`
  border-radius: 14px;
  font-weight: 600;
  color: #fed600;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 2px 2px;;
`

export const ActiveLinkButton = styled(LinkButton)`
  background-color: rgb(241 132 200);
`

export const NavBar = () => {
    const isAdmin = useSelector(selectIsCoinAdmin)
    return (
      <Nav>
        {window.location.pathname === '/' ? <ActiveLinkButton href="/">Profile</ActiveLinkButton> : <LinkButton href="/">Profile</LinkButton>}
        {window.location.pathname === '/coin-builder' ? <ActiveLinkButton href="/coin-builder">Coin Builder</ActiveLinkButton> : <LinkButton href="/coin-builder">Coin Builder</LinkButton>}
        {window.location.pathname === '/ant-builder' ? <ActiveLinkButton href="/ant-builder">Ant Builder</ActiveLinkButton> : <LinkButton href="/ant-builder">Ant Builder</LinkButton>}
        {isAdmin === true ? window.location.pathname === '/admin' ? <ActiveLinkButton href="/admin">Admin</ActiveLinkButton> : <LinkButton href="/admin">Admin</LinkButton> : null}
      </Nav>
    )
}

export const StyledConnectButton = styled(StyledButton)`
  justify-self: flex-end;
`

export const ConnectButton = () => {
    const status = useSelector(selectStatus)
    const account = useSelector(selectAccount)
    const isConnected = useSelector(selectIsConnected)
    const dispatch = useDispatch()
  
    const buttonAction = () => {
      if (status === 'succeeded' && !isConnected) dispatch(connect())
      else if (status === 'failed') window.location.reload()
    }
  
    return (
      <StyledConnectButton type="button" onClick={buttonAction}>
        {
          (status === 'succeeded' && !isConnected) ? "Connect Wallet" :
          status === 'succeeded' ? account :
          status === 'failed' ? "Reload" :
          "loading"
        }
      </StyledConnectButton>
    )
}

export const HeaderWrapper = styled.header`
  display: grid;
  flex-flow: row nowrap;
  width: 100%;
  height: fit-content;
  align-items: center;
  z-index: 2;
  padding: 1rem;
  grid-template-columns: 1fr 10fr 10fr;
  position: sticky;
  top: 0;
`

export const HomeButton = styled.a`
  background-image: url('logo.png');
  background-size: contain;
  width: 45px;
  height: 45px;
`

export const AppView = () => {
    console.log('start top view')
    const dispatch = useDispatch()

    const status = useSelector(selectStatus)
    const errorMsg = useSelector(selectErr)
    const isConnected = useSelector(selectIsConnected)
    const isAdmin = useSelector(selectIsCoinAdmin)

    window.ethereum.on('accountsChanged', (_account) => {
        if (isConnected) window.location.reload()
    })
    window.ethereum.on("chainChanged", () => window.location.reload())

    useEffect(() => {
        if (status === 'succeeded' && isConnected && isAdmin === null) dispatch(loadCoinAdmin())
    }, [status, dispatch, isConnected, isAdmin])

    return (
        <div>  
            <HeaderWrapper>
                <HomeButton href='.' />
                <NavBar />
                <ConnectButton />
            </HeaderWrapper>
            {
                status === 'idle' ? <Text>loading...</Text> :
                status === 'failed' ? <p>{errorMsg}</p> :
                status === 'succeeded' ? 
                    isConnected === false ? <Title>Please connect</Title> :
                    window.location.pathname === '/' ? <Profile /> :
                    window.location.pathname === '/coin-builder' ? <CoinBuilder /> :
                    window.location.pathname === '/ant-builder' ? <AntBuilder /> :
                    (window.location.pathname === '/admin') && isAdmin ? <AdminPage /> :
                    <p>You are not admin!</p> :
                <Text>{status}</Text>
            }
        </div>
    )
}