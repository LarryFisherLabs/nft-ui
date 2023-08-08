import { error } from "../redux/slices/connectSlice"
import { changeNet, connect } from "../redux/thunks/connectThunk"
import { urls } from "./json-constants/urls"
import { goToProfile } from "./redirect"

export const connectButtonActionIds = {
    reload: 'reload',
    changeNet: 'change-net',
    connect: 'connect',
    downloadMM: 'download-metamask',
    downloadBrave: 'download-brave',
    goToProfile: 'go-to-profile'
}

export const connectButtonAction = (dispatch, connectButtonActionId) => {
    switch (connectButtonActionId) {
        case connectButtonActionIds.reload:
            window.location.reload()
            break
        case connectButtonActionIds.changeNet:
            dispatch(changeNet(11155111))
            break
        case connectButtonActionIds.connect:
            dispatch(connect())
            break
        case connectButtonActionIds.downloadMM:
            window.open(urls.metaMaskDownload, "_blank")
            break
        case connectButtonActionIds.downloadBrave:
            window.open(urls.braveDownload, "_blank")
            break
        case connectButtonActionIds.goToProfile:
            goToProfile()
            break
        case 'disabled':
            break
        default:
            dispatch(error({ error: 'Error: bad connect button action' }))
    }
  }

