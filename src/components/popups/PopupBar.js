import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useClickListener } from "../../utils/hooks/hooks-general"
import { removePopup, selectPopupIds } from "../../redux/slices/connectSlice"
import styled, { css } from "styled-components"
import { SmallText, Text } from "../../styles/general"
import { getViewLevel } from "../../utils/deviceType"
import { popupDetailsById } from "../../utils/json-constants/popupInfo"

const PopupPanel = styled.div`
    background-color: rgb(127, 0, 214);
    border-radius: 16px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonborder;
    position: fixed;
    text-align: center;
    cursor: pointer;
    padding: 0rem;
    right: -14rem;
    bottom: -4rem;
    opacity: .1;
    transform: scale(.2);
    transition: all 1000ms ease-in-out;
    ${({ index }) => {
        if (index !== null) return css`
            padding: 1.3rem;
            right: .7rem;
            bottom: ${`${index * 6.2 + .7}rem`};
            opacity: .8;
            transform: scale(1);
            @media ${getViewLevel(2)} {
                bottom: ${`${index * 5.9 + .7}rem`};
            }
            @media ${getViewLevel(3)} {
                bottom: ${`${index * 5.6 + .7}rem`};
            }
            @media ${getViewLevel(4)} {
                bottom: ${`${index * 5.3 + .7}rem`};
            }
            @media ${getViewLevel(5)} {
                bottom: ${`${index * 5.2 + .7}rem`};
            }
        `
        else return css`
            padding: 0rem;
            right: -14rem;
            bottom: -4rem;
            opacity: .1;
            transform: scale(.2);
        `
    }};
`

const PopupText = styled(Text)`
    padding: .2rem;
`

const Popup = ({ popupId }) => {
    const dispatch = useDispatch()
    const popupIds = useSelector(selectPopupIds, shallowEqual)
    const [timer, setTimer] = useState(popupDetailsById[popupId].timer)
    const [isTimerExpired, setIsTimerExpired] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [idIndex, setIdIndex] = useState(null)

    useEffect(() => {
        if (popupIds.length > 0) {
            const tempIndex = popupIds.length - (popupIds.indexOf(popupId) + 1)
            setIdIndex(tempIndex)
        }
    }, [popupIds, popupId])

    useEffect(() => { 
        if (!isVisible && idIndex !== null) {
            setIdIndex(null)
            setTimeout(() => {
                dispatch(removePopup({ id: popupId }))
            }, 900)
        }
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
    }, [dispatch, timer, isVisible, popupId, idIndex]);

    useClickListener(isVisible, setIsVisible, isTimerExpired)

    return (
        <PopupPanel index={idIndex} onClick={() => isTimerExpired ? null : setIsVisible(false)}>
            <PopupText>{popupDetailsById[popupId].msg}</PopupText>
            <SmallText>{isTimerExpired ? '( Click anywhere to dismiss )' : `( ${timer}s )`}</SmallText>
        </PopupPanel>
    )
}

export const PopupBar = () => {
    const popupIds = useSelector(selectPopupIds, shallowEqual)

    if (popupIds.length === 0) return null

    return (
        <div>
            {popupIds.length > 0 ? popupIds.map(popupId => {
                return <Popup key={popupId} popupId={popupId} />
            }) : null}
        </div>
    )
}