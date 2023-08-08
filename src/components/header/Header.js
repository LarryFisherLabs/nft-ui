import styled from 'styled-components'
import { getViewLevel } from '../../utils/deviceType'
import { getHref } from '../../utils/redirect'
import { ConnectButton } from './ConnectButton'
import { NavBar } from './NavBar'
import { OptionsMenu } from './OptionsMenu'
import useConnectButtonHooks from '../../utils/hooks/component-hooks/connect-button-hooks/useConnectButtonHooks'
import { useState } from 'react'

const StickyHeader = styled.header`
    z-index: 2;
    pointer-events: none;
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
    pointer-events: auto;
    background-image: url('/favicon.ico');
    background-size: contain;
    width: 45px;
    height: 45px;
    @media ${getViewLevel(4)} {
        margin-top: -.6rem;
        margin-left: -.4rem;
    }
    @media ${getViewLevel(6)} {
        width: 38px;
        height: 38px;
        margin-left: -.5rem;
    }
`

export const Header = () => {
    const [connectButtonActionId, setConnectButtonActionId] = useState(null)

    // determine proper state for connect button
    useConnectButtonHooks(setConnectButtonActionId)

    return (
        <StickyHeader>
            <HeaderWrapper>
                <HomeButton href={getHref('/')} />
                <NavBar />
                <ConnectButton index={0} connectButtonActionId={connectButtonActionId} />
                <OptionsMenu connectButtonActionId={connectButtonActionId} />
            </HeaderWrapper>
            <ConnectButton index={1} connectButtonActionId={connectButtonActionId} />
        </StickyHeader>
    )
}