import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Profile } from './Profile'
import { AntBuilder } from './AntBuilder'
import { AdminPage } from './AdminPage'
import { CoinBuilder } from './CoinBuilder'

import { StyledButton, Text } from '../styles/general'
import { selectAccount, selectErr, selectIsConnected, selectIsWrongNet, selectNetId, selectStatus, selectViewLevel } from '../redux/slices/connectSlice'
import { loadCoinAdmin } from '../redux/thunks/coinAdminThunks'
import { selectCoinStatus, selectIsCoinAdmin } from '../redux/slices/coinSlice'

import styled from 'styled-components'
import { changeNet, connect } from '../redux/thunks/connectThunk'
import { selectAntStatus } from '../redux/slices/antSlice'
import { getViewLevel } from '../utils/deviceType'

const Nav = styled.div`
  margin-left: 2rem;
  background-color: rgb(145, 162, 230);
  width: fit-content;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonborder;
  justify-self: auto;
  @media ${getViewLevel(1)} {
    margin-left: 1.2rem;
  }
  @media ${getViewLevel(3)} {
    justify-self: center;
    margin-left: 0;
    margin-top: -1.1rem;
  }
  @media ${getViewLevel(4)} {
    margin-top: -1.2rem;
  }
`

const LinkButton = styled.a`
  border-radius: 14px;
  font-weight: 600;
  color: #fed600;
  text-decoration: none;
  font-size: 1.2rem;
  padding: .15rem;
  text-align: center;
  @media ${getViewLevel(3)} {
    font-size: 1rem;
  }
  @media ${getViewLevel(4)} {
    font-size: .9rem;
  }
`

const ActiveLinkButton = styled(LinkButton)`
  background-color: rgb(241 132 200);
`

const NavBar = () => {
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

const StyledConnectButton = styled(StyledButton)`
  padding: .2rem;
  font-size: 1.1rem;
  margin-right: 1rem;
  justify-self: flex-end;
  display: ${props => props.index === 0 ? 'block' : 'none'};
  @media ${getViewLevel(3)} {
    font-size: 1rem;
    margin-right: 0;
    margin-top: -.8rem;
    display: ${props => props.index === 0 ? 'none' : 'block'};
  }
  @media ${getViewLevel(4)} {
    margin-top: -.6rem;
    font-size: .85rem;
  }
`

const connectButtonAction = (dispatch, status, antStatus, coinStatus, isWrongNet, isConnected, viewLevel) => {
  if ((status === 'failed') || (antStatus === 'failed') || (coinStatus === 'failed')) window.location.reload()
  else if (isWrongNet === true) dispatch(changeNet(1))
  else if (status === 'succeeded' && !isConnected) dispatch(connect())
  else if (status === 'offline' && viewLevel < 4) window.open("https://chrome.google.com/webstore/search/metamask", "_blank")
  else if (status === 'offline' && viewLevel > 3) window.open("https://brave.com/download", "_blank")
}

const ConnectButton = ({ index }) => {
  const status = useSelector(selectStatus)
  const coinStatus = useSelector(selectCoinStatus)
  const antStatus = useSelector(selectAntStatus)
  const account = useSelector(selectAccount)
  const isConnected = useSelector(selectIsConnected)
  const isWrongNet = useSelector(selectIsWrongNet)
  const viewLevel = useSelector(selectViewLevel)
  const dispatch = useDispatch()

  const buttonAction = () => {
    connectButtonAction(dispatch, status, antStatus, coinStatus, isWrongNet, isConnected, viewLevel)
  }

  return (
    <StyledConnectButton type="button" onClick={buttonAction} index={index}>
      {
        (status === 'failed') || (antStatus === 'failed') || (coinStatus === 'failed') ? "Reload" :
        isWrongNet ? "Change Network" :
        (status === 'succeeded' && !isConnected) ? "Connect Wallet" :
        status === 'succeeded' ? account :
        (status === 'offline' && viewLevel < 4) ? "Download Metamask" :
        (status === 'offline' && viewLevel > 3) ? "Download Brave" :
        "loading"
      }
    </StyledConnectButton>
  )
}

const StyledOptions = styled.div`
  flex-flow: column nowrap;
  @media ${getViewLevel(4)} {
    margin-top: -.6rem;
    margin-right: -.4rem;
  }
`

const StyledOptionsButton = styled(StyledButton)`
  background-color: #946cb0;
  min-width: 45px;
`

const StyledOptionsPanel = styled.div`
  margin-left: -6rem;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-flow: column nowrap;
  z-index: 2;
  position: absolute;
  background-color: #946cb0;
  padding: 4px;
  border-radius: 16px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonborder;
`

const StickyHeader = styled.header`
  z-index: 2;
  position: sticky;
  top: 0;
  display: flex;
  flex-flow: column;
  padding-bottom: .5rem;
`

const HeaderWrapper = styled.header`
  display: grid;
  flex-flow: row nowrap;
  width: 100%;
  height: fit-content;
  align-items: center;
  padding: 1rem;
  padding-bottom: 0;
  grid-template-columns: 1fr 10fr 10fr 1fr;
  @media ${getViewLevel(3)} {
    grid-template-columns: 1fr 12fr 1fr;
  }
`

const HomeButton = styled.a`
  background-image: url('logo.png');
  background-size: contain;
  width: 45px;
  height: 45px;
  @media ${getViewLevel(4)} {
    margin-top: -.6rem;
    margin-left: -.4rem;
  }
`

export const AppView = () => {
  const dispatch = useDispatch()

  const status = useSelector(selectStatus)
  const antStatus = useSelector(selectAntStatus)
  const coinStatus = useSelector(selectCoinStatus)
  const isWrongNet = useSelector(selectIsWrongNet)
  const errorMsg = useSelector(selectErr)
  const isConnected = useSelector(selectIsConnected)
  const isAdmin = useSelector(selectIsCoinAdmin)
  const netId = useSelector(selectNetId)
  const viewLevel = useSelector(selectViewLevel)

  const [isOptionsOpen, updateIsOptionsOpen] = useState(false)

  useEffect(() => {
    if (status === 'succeeded' && isConnected && isAdmin === null) dispatch(loadCoinAdmin())
  }, [status, dispatch, isConnected, isAdmin])

  const toggleOptions = () => {
    updateIsOptionsOpen(!isOptionsOpen)
  }

  const openFaucet = () => {
    if (netId !== null) {
      const link = netId === 0 ? "https://sepolia-faucet.pk910.de/" : "https://goerlifaucet.com/"
      window.open(link, "_blank")
    }
  }

  const switchNet = () => {
    if (netId !== null) {
      const newNet = netId === 0 ? 1 : 0
      dispatch(changeNet(newNet))
    }
  }

  const altConnect = () => {
    connectButtonAction(dispatch, status, antStatus, coinStatus, isWrongNet, isConnected, viewLevel)
  }

  return (
    <div>
      <StickyHeader>
        <HeaderWrapper>
          <HomeButton href='.' />
          <NavBar />
          <ConnectButton index={0} />
          <StyledOptions>
            <StyledOptionsButton type='button' onClick={toggleOptions}>...</StyledOptionsButton>
            <StyledOptionsPanel isOpen={isOptionsOpen}>
              {netId === null ? null : <StyledButton onClick={openFaucet}>Go to faucet</StyledButton>}
              {netId === null ? null : <StyledButton onClick={switchNet}>{netId === 0 ? "Switch to Goerli" : "Switch to Sepolia"}</StyledButton>}
              {netId === null ? <StyledButton onClick={altConnect}>Please Connect</StyledButton> : null}
            </StyledOptionsPanel>
          </StyledOptions>
        </HeaderWrapper>
        <ConnectButton index={1} />
      </StickyHeader>
      {
        status === 'idle' ? <Text>loading...</Text> :
        status === 'failed' ? <p>{errorMsg}</p> :
        status === 'succeeded' || status === 'offline' ? 
          window.location.pathname === '/' ? <Profile /> :
          window.location.pathname === '/coin-builder' ? <CoinBuilder /> :
          window.location.pathname === '/ant-builder' ? <AntBuilder /> :
          (window.location.pathname === '/admin') && isAdmin ? <AdminPage /> :
          <p>Out of bounds!</p> :
        <Text>{status}</Text>
      }
    </div>
  )
}