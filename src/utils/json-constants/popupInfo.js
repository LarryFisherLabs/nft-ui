const antConflictsStartIndex = 17
const shortTimer = 3
const normTimer = 7
const longTimer = 10

export const popupTypes = {
    sepoliaData: 0,
    goerliData: 1,
    mainNetData: 2,
    buyingCoin: 3,
    buyingAnt: 4,
    profileRedirect: 5,
    txWaiting: 6,
    txDenied: 7,
    badBuyCoinVal: 8,
    coinPricesChanged: 9,
    txFailed: 10,
    insufficientFunds: 11,
    gettingApprovals: 12,
    gettingApprovalsForAll: 13,
    removingApproval: 14,
    removingApprovalForAll: 15,
    reconnect: 16,
    antConflict: {
        gasMask: {
            eod: antConflictsStartIndex,
            optical: antConflictsStartIndex + 1,
            mouth: antConflictsStartIndex + 2,
            face: antConflictsStartIndex + 3,
        },
        eod: {
            shemagh: antConflictsStartIndex + 4,
            gasMask: antConflictsStartIndex + 5,
            mouth: antConflictsStartIndex + 6,
        },
        shemagh: {
            eod: antConflictsStartIndex + 7,
        },
        optical: {
            gasMask: antConflictsStartIndex + 8,
        },
        mouth: {
            gasMask: antConflictsStartIndex + 9,
            eod: antConflictsStartIndex + 10,
        },
        face: {
            gasMask: antConflictsStartIndex + 11,
        },
        head: {
            eod: antConflictsStartIndex + 12,
        }, 
        body: {
            eod: antConflictsStartIndex + 13,
        }
    }
}

export const popupDetailsById = [
    {
        msg: 'Viewing data from Sepolia test network',
        timer: normTimer
    },
    {
        msg: 'Viewing data from Goerli test network',
        timer: normTimer
    },
    {
        msg: 'Connected to main net, viewing goerli data for everything besides the tools page',
        timer: normTimer
    },
    {
        msg: 'Buying coin',
        timer: normTimer
    },
    {
        msg: 'Buying ant',
        timer: normTimer
    },
    {
        msg: 'You will be redirected to your profile once purchase is complete',
        timer: longTimer
    },
    {
        msg: 'Transcation has been sent to your wallet for approval',
        timer: normTimer
    },
    {
        msg: 'Transcation has been rejected',
        timer: normTimer
    },
    {
        msg: 'Not enough eth for coin',
        timer: normTimer
    },
    {
        msg: 'Coin prices have changed',
        timer: longTimer
    },
    {
        msg: 'Transaction failed',
        timer: longTimer
    },
    {
        msg: 'Not enough eth in wallet',
        timer: normTimer
    },
    {
        msg: 'Getting approvals',
        timer: shortTimer
    },
    {
        msg: 'Getting approvals for all',
        timer: shortTimer
    },
    {
        msg: 'Removing approval, page will update when transaction is complete',
        timer: longTimer
    },
    {
        msg: 'Removing approval for all, page will update when transaction is complete',
        timer: longTimer
    },
    {
        msg: 'Please reconnect',
        timer: longTimer
    },
    {
        msg: 'Gas Mask incompatible with EOD',
        timer: shortTimer
    },
    {
        msg: 'Gas Mask incompatible with Optical Gear',
        timer: shortTimer
    },
    {
        msg: 'Gas Mask incompatible with Mouth Accessories',
        timer: shortTimer
    },
    {
        msg: 'Gas Mask incompatible with Face Gear',
        timer: shortTimer
    },
    {
        msg: 'EOD incompatible with Shemagh',
        timer: shortTimer
    },
    {
        msg: 'EOD incompatible with Gas Mask',
        timer: shortTimer
    },
    {
        msg: 'EOD incompatible with Mouth Accessories',
        timer: shortTimer
    },
    {
        msg: 'Shemagh incompatible with EOD',
        timer: shortTimer
    },
    {
        msg: 'Optical Gear incompatible with Gas Mask',
        timer: shortTimer
    },
    {
        msg: 'Mouth Accessories incompatible with Gas Mask',
        timer: shortTimer
    },
    {
        msg: 'Mouth Accessories incompatible with EOD',
        timer: shortTimer
    },
    {
        msg: 'Face Accessories incompatible with Gas Mask',
        timer: shortTimer
    },
    {
        msg: 'EOD Mask must be paired with EOD Suit',
        timer: shortTimer
    },
    {
        msg: 'EOD Suit must be paired with EOD Mask',
        timer: shortTimer
    },
]