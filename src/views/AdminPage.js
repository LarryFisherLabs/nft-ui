import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, Title2, ViewStyle } from '../styles/general.js'
import { ethers } from 'ethers'
import { getAntContract, getCoinContract, getProvider } from '../utils/ethers-utils.js'
import { selectCoinErr } from '../redux/slices/coinSlice.js'
import { addFounder, withdraw } from '../apis/coinContractApi.js'
import { antWithdraw } from '../apis/antContractApi.js'

export const AdminPage = () => {
    const provider = getProvider()
    const coinContract = getCoinContract()
    const antContract = getAntContract()
    const coinErr = useSelector(selectCoinErr)

    const [address, updateAddress] = useState()
    const [value, updateValue] = useState()
    const [balance, setBalance] = useState('Loading...')
    const [antBalance, setAntBalance] = useState('Loading...')

    const onFounderInputChange = (event) => {
        updateAddress(event.target.value)
    }

    const onValueInputChange = (event) => {
        updateValue(event.target.value)
    }

    const addCoinFounder = async () => {
        await addFounder(address, value)
    }

    const updateBalance = async () => {
        const bal = await provider.getBalance(coinContract.address)
        setBalance(ethers.utils.formatEther(bal))
    }

    const updateAntBalance = async () => {
        const bal = await provider.getBalance(antContract.address)
        setAntBalance(ethers.utils.formatEther(bal))
    }

    const coinWithdraw = async () => {
        await withdraw()
    }

    const _antWithdraw = async () => {
        await antWithdraw()
    }

    updateBalance()
    updateAntBalance()
    return (
        <ViewStyle>
            <Title2>Admin Page</Title2>
            <section>
                <Text>Address: </Text>
                <input onChange={onFounderInputChange} />
                <Text>Value: </Text>
                <input type='number' onChange={onValueInputChange} />
                <button onClick={addCoinFounder}>Add Founder</button>
            </section>
            <section>
                {balance}
                <button onClick={updateBalance}><img src='refresh.png' alt='Refresh' width={25} height={25} /></button>
            </section>
            {balance > 0 ? <button onClick={coinWithdraw}>Withdraw</button> : <button disabled>Withdraw</button>}
            <section>
                {antBalance}
                <button onClick={updateAntBalance}><img src='refresh.png' alt='Refresh' width={25} height={25} /></button>
            </section>
            {antBalance > 0 ? <button onClick={_antWithdraw}>Withdraw</button> : <button disabled>Withdraw</button>}
            {coinErr !== "" ? coinErr : null}
        </ViewStyle>
    )
}
