import { useCallback, useEffect, useState } from "react"

export const useOffElementClickListener = (refArray, isSelected, setIsSelected) => {
    const [isListening, setIsListening] = useState(false)
    const handleClickOffElement = useCallback((event) => {
        let tempIsUnselected = false
        for (let i = 0; i < refArray.length; i++) {
            const ref = refArray[i]
            if (!ref.current.contains(event.target)) {
                tempIsUnselected = i === 0 ? true : tempIsUnselected
            } else tempIsUnselected = false
        }
        if (tempIsUnselected) {
            setIsSelected(false)
        }
    }, [refArray, setIsSelected])
    useEffect(() => {
        let isOneRefPresent = false
        for (let i = 0; i < refArray.length; i++) {
            const ref = refArray[i]
            if (ref.current) {
                i = refArray.length
                isOneRefPresent = true
            }
        }
        if (isSelected && isOneRefPresent && !isListening) {
            document.addEventListener("mousedown", handleClickOffElement)
            setIsListening(true)
        }

        return () => {
            if (isListening) {
                setIsListening(false)
                document.removeEventListener("mousedown", handleClickOffElement)
            }
        }
    }, [refArray, isSelected, isListening, setIsListening, handleClickOffElement])
}

export const useClickListener = (isOnPage, setIsOnPage, isWaitingForClick) => {
    const [isListening, setIsListening] = useState(false)
    const handleClick = useCallback(() => {
        setIsOnPage(false)
    }, [setIsOnPage])
    useEffect(() => {
        if (isWaitingForClick && isOnPage && !isListening) {
            document.addEventListener("mousedown", handleClick)
            setIsListening(true)
        }

        return () => {
            if (isListening) {
                setIsListening(false)
                document.removeEventListener("mousedown", handleClick)
            }
        }
    }, [isOnPage, isListening, setIsListening, handleClick, isWaitingForClick])
}