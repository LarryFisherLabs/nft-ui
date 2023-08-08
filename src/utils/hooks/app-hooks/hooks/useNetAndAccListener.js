import { isAddress } from "ethers/lib/utils"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAccount } from "../../../../redux/slices/connectSlice"

const useNetAndAccListener = () => {
    const address = useSelector(selectAccount)
    useEffect(() => {
        if (window.hasOwnProperty('ethereum')) {
            window.ethereum.on('accountsChanged', (_account) => {if (isAddress(address)) window.location.reload()})
            window.ethereum.on('chainChanged', () => window.location.reload())
        }
    }, [address])
}

export default useNetAndAccListener