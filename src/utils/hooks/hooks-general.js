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
        if (tempIsUnselected) setIsSelected(false)
    }, [refArray, setIsSelected])
    useEffect(() => {
        let isOneRefPresent
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
                document.removeEventListener("mousedown", handleClickOffElement)
                setIsListening(false)
            }
        }
    }, [refArray, isSelected, isListening, setIsListening, handleClickOffElement])
}