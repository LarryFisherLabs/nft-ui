import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Text, Title2, ViewStyle } from '../styles/general.js'
import { ethers } from 'ethers'
import { getAntContract, getCoinContract, getProvider } from '../utils/ethers-utils.js'
import { selectCoinErr } from '../redux/slices/coinSlice.js'
import { addFounder, coinBaseURI, updateBaseCoinURI, withdraw } from '../apis/coinContractApi.js'
import { antBaseURI, antWithdraw, updateBaseAntURI } from '../apis/antContractApi.js'
import { selectAntErrMsg } from '../redux/slices/antSlice.js'

export const AdminPage = () => {
    const provider = getProvider()
    const coinErr = useSelector(selectCoinErr)
    const antErr = useSelector(selectAntErrMsg)
    const coinRefURI = useRef()
    const antRefURI = useRef()

    const [address, updateAddress] = useState()
    const [value, updateValue] = useState()
    const [balance, setBalance] = useState('Loading...')
    const [antBalance, setAntBalance] = useState('Loading...')
    const [antURI, setAntURI] = useState("Loading...")
    const [coinURI, setCoinURI] = useState("Loading...")

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
        const coinContract = await getCoinContract()
        const bal = await provider.getBalance(coinContract.address)
        setBalance(ethers.utils.formatEther(bal))
    }

    const updateAntBalance = async () => {
        const antContract = await getAntContract()
        const bal = await provider.getBalance(antContract.address)
        setAntBalance(ethers.utils.formatEther(bal))
    }

    const coinWithdraw = async () => {
        await withdraw()
    }

    const _antWithdraw = async () => {
        await antWithdraw()
    }

    const updateCoinURI = async () => {
        await updateBaseCoinURI(coinRefURI.value)
    }

    const updateAntURI = async () => {
        await updateBaseAntURI(antRefURI.value)
    }

    const refreshCoinURI = async () => {
        const uri = await coinBaseURI()
        setCoinURI(uri)
    }

    const refreshAntURI = async () => {
        const uri = await antBaseURI()
        setAntURI(uri)
    }

    refreshCoinURI()
    refreshAntURI()
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
                {coinURI}
                <button onClick={refreshCoinURI}><img src='refresh.png' alt='Refresh' width={25} height={25} /></button>
            </section>
            <section>
                <Text>New Coin URI:</Text>
                <input ref={coinRefURI} />
                <button onClick={updateCoinURI}>Update Coin URI</button>
            </section>
            <section>
                {antURI}
                <button onClick={refreshAntURI}><img src='refresh.png' alt='Refresh' width={25} height={25} /></button>
            </section>
            <section>
                <Text>New Ant URI:</Text>
                <input ref={antRefURI} />
                <button onClick={updateAntURI}>Update Ant URI</button>
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
            {antErr !== "" ? antErr : null}
        </ViewStyle>
    )
}
