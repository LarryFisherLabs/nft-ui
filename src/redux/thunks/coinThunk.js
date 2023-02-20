import { createAsyncThunk } from '@reduxjs/toolkit'
import { isDiscountUsed } from '../../apis/antContractApi'
import { balanceOf, createExactCoin, createFounderCoin, getCoin, getCounters, getFounder, getTierPrices, isOnFounderList, ownerOf } from '../../apis/coinContractApi'
import { getCoinContract } from '../../utils/ethers-utils'
import { coinError, updateCoins } from '../slices/coinSlice'

const _getCoinIds = async (account) => {
    const coinContract = getCoinContract()
    const coinBalance = await balanceOf(account)
    let coins = []
    if (coinBalance > 0) {
        const transferLogs = await coinContract.queryFilter(coinContract.filters.Transfer(null, account))
        for (let i = 0; i < transferLogs.length; i++) {
            // get the indexed id 
            const id = parseInt(transferLogs[i].args[2])
            if (!coins.includes(id)) {
                coins.push(id)
            }
        }
        if (coins.length > coinBalance) {
            for (let i = 0; i < coins.length; i++) {
                const owner = await ownerOf(coins[i])
                if (owner !== account) {
                    coins.splice(i, 1)
                }
                if (coins.length === coinBalance) {
                    i = coins.length
                }
            }
        }
    }
    return coins
}

const _getFounder = async (account) => {
    const isAccountFounder = await isOnFounderList(account)

    let founder = {
        value: 0,
        isFCMinted: false,
        isFCDiscountUsed: false,
    }

    if (isAccountFounder) {
        const rawFounder = await getFounder(account)
        founder.value = rawFounder[0]
        founder.isFCMinted = rawFounder[1]
        founder.isFCDiscountUsed = rawFounder[2]
    }

    return founder
}

export const loadCoinIds = createAsyncThunk(
    'coinSlice/loadCoinIds', 
    async (_, { dispatch, getState }) => {
        try {
            const account = getState().connectSlice.account
            const coinIds = await _getCoinIds(account)
            let coins = []

            for (let i = 0; i < coinIds.length; i++) {
                const rawCoin = await getCoin(coinIds[i])
                const _isDiscountUsed = await isDiscountUsed(coinIds[i])
                const coin = {
                    id: coinIds[i],
                    color: rawCoin[1],
                    isDiscountUsed: _isDiscountUsed
                }
                coins.push(coin)
            }

            dispatch(updateCoins({ coins: coins }))
        } catch (err) {
            dispatch(coinError({ error: err.message }))
        }
    }
)

// TODO: combine following three functions or extract shared code

// get coins and founder deets
export const coinsConnect = createAsyncThunk(
    'coinSlice/coinsConnect', 
    async (_, { dispatch, getState }) => {
        try {
            const account = getState().connectSlice.account
            const coinIds = await _getCoinIds(account)
            const founder = await _getFounder(account)

            let coins = []
            

            for (let i = 0; i < coinIds.length; i++) {
                const rawCoin = await getCoin(coinIds[i])
                const coin = {
                    id: coinIds[i],
                    value: rawCoin[0],
                    color: rawCoin[1],
                }
                coins.push(coin)
            }

            return {
                coins: coins,
                founder: founder,
            };
        } catch (err) {
            return {
                status: "failed",
                err: err.message
            };
        }
    }
)

// get founder, price and count deets
export const loadBuilder = createAsyncThunk(
    'coinSlice/loadBuilder', 
    async (_, { dispatch, getState }) => {
        try {
            const account = getState().connectSlice.account
            const founder = await _getFounder(account)
            const counters = await getCounters()
            const userBalance = await balanceOf(account)
            let isDicounted = founder.value > 0 && founder.isFCMinted && !founder.isFCDiscountUsed
            const prices = await getTierPrices(isDicounted)

            return {
                founder: founder,
                prices: prices,
                counters: counters,
                userBalance: userBalance,
            };
        } catch (err) {
            return {
                coinBuilderStatus: "failed",
                err: err.message,
            };
        }
    }
)

export const buyCoin = createAsyncThunk(
    'coinSlice/buyCoin',
    async({ value, color }, { dispatch, getState }) => {
        try {
            const account = getState().connectSlice.account
            const founder = await _getFounder(account)
            const isFounder = founder.value > 0
            const statePrices = getState().coinSlice.prices
            const statePricesAsArray = [statePrices.bronze, statePrices.silver, statePrices.gold, statePrices.diamond]
            let tx
            let prices = false

            if (isFounder) {
                if (color === 4 && !founder.isFCMinted) {
                    tx = await createFounderCoin(value)
                } else if (founder.isFCMinted && !founder.isFCDiscountUsed) {
                    prices = await getTierPrices(true)
                } 
            } 
            if (color === 4 && tx === null) {
                throw new Error('Founder coin already minted or not permitted!')
            }
            
            if (color !== 4) {
                if (prices === false) {
                    prices = await getTierPrices(false)
                }
                if (prices[color] > value) {
                    if (prices[color] !== statePricesAsArray[color]) {
                        return {
                            builderStatus: 'bad pricing',
                            prices: prices,
                        }
                    }
                    return {
                        builderStatus: 'bad value',
                        prices: prices,
                    }
                } else {
                    tx = await createExactCoin(value, color)
                }
            }
            const receipt = await tx.wait()
            if (receipt.status === 1) {
                window.location.href = '/'
            } else {
                throw new Error('Bad tx. Logs: ' + receipt.logs)
            }
        } catch (err) {
            return {
                builderStatus: 'failed',
                err: err.message
            }
        }
    }
)