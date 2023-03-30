import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useClickListener } from "../../utils/hooks/hooks-general"
import { selectNetId } from "../../redux/slices/connectSlice"
import styled from "styled-components"
import { SmallText, Text } from "../../styles/general"
import { CSSTransition } from "react-transition-group"

const PopupPanel = styled.div`
    background-color: rgb(127, 0, 214);
    border-radius: 16px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonborder;
    position: fixed;
    text-align: center;
    cursor: pointer;
`

const PopupText = styled(Text)`
    padding: .2rem;
`

export const Popup = ({ isVisible, setIsVisible }) => {
    const netId = useSelector(selectNetId)
    const popupRef = useRef()
    const [timer, setTimer] = useState(5)
    const [isTimerExpired, setIsTimerExpired] = useState(false)

    useEffect(() => { 
        if (!isVisible || timer === 0) return
        const interval = setInterval(() => {
            if ((timer - 1) === 0) {
                setTimer(0)
                setIsTimerExpired(true)
            }
            else {
                setTimer(timer - 1)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [timer, isVisible]);

    useClickListener(isVisible, setIsVisible, isTimerExpired)

    return (
        <CSSTransition in={isVisible} nodeRef={popupRef} timeout={900} classNames="popup" unmountOnExit>
            <PopupPanel ref={popupRef} onClick={() => isTimerExpired ? null : setIsVisible(false)}>
                <PopupText>{`Viewing data from ${netId === 0 ? 'Sepolia' : 'Goerli'} test network`}</PopupText>
                <SmallText>{isTimerExpired ? '( Click anywhere to dismiss )' : `( ${timer}s )`}</SmallText>
            </PopupPanel>
        </CSSTransition>
    )
}