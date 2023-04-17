import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectIsCoinAdmin } from "../../redux/slices/coinSlice"
import { getViewLevel } from "../../utils/deviceType"
import { getHref } from "../../utils/redirect"

const Nav = styled.div`
  pointer-events: auto;
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

export const NavBar = () => {
    const isAdmin = useSelector(selectIsCoinAdmin)
    return (
      <Nav>
        {window.location.pathname === '/coin-builder' ? <ActiveLinkButton href={getHref("/coin-builder")}>Coin Builder</ActiveLinkButton> : <LinkButton href={getHref("/coin-builder")}>Coin Builder</LinkButton>}
        {window.location.pathname === '/ant-builder' ? <ActiveLinkButton href={getHref("/ant-builder")}>Ant Builder</ActiveLinkButton> : <LinkButton href={getHref("/ant-builder")}>Ant Builder</LinkButton>}
        {isAdmin === true ? window.location.pathname === '/admin' ? <ActiveLinkButton href={getHref("/admin")}>Admin</ActiveLinkButton> : <LinkButton href={getHref("/admin")}>Admin</LinkButton> : null}
      </Nav>
    )
}