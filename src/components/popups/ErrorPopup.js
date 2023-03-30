import React from 'react'
import { Text2 } from '../styles/components'
import Popup from 'reactjs-popup'

export const ErrorPopup = (message) => {
    return (
        <Popup open={true} closeOnDocumentClick >
            <Text2>{message}</Text2>
        </Popup>
    )
    }