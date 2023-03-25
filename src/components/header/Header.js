import styled from 'styled-components'
import { getViewLevel } from '../../utils/deviceType'
import { getCurrentUrlParam, getHref } from '../../utils/redirect'
import { getUrlParam } from '../../utils/url-utils/getUrlParam'
import { ConnectButton } from './ConnectButton'
import { NavBar } from './NavBar'
import { OptionsMenu } from './OptionsMenu'

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
    background-image: url('/logo.png');
    background-size: contain;
    width: 45px;
    height: 45px;
    @media ${getViewLevel(4)} {
        margin-top: -.6rem;
        margin-left: -.4rem;
    }
`

export const Header = () => {
    return (
        <StickyHeader>
            <HeaderWrapper>
                <HomeButton href={getHref('/')} />
                <NavBar />
                <ConnectButton index={0} />
                <OptionsMenu />
            </HeaderWrapper>
            <ConnectButton index={1} />
        </StickyHeader>
    )
}