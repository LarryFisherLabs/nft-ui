const antConflictsStartIndex = 18
// end indexes are the next index after that section (really the start index for whatever section comes after)
const antConflictOpticalEndIndex = antConflictsStartIndex + 13
const antConflictBandolierEndIndex = antConflictOpticalEndIndex + 10
const antConflictEndIndex = antConflictBandolierEndIndex + 6
const shortTimer = 3
const normTimer = 7
const longTimer = 10

export const popupTypes = {
    sepoliaData: 0,
    goerliData: 1,
    mainNetData: 2,
    wrongNetData: 3,
    buyingCoin: 4,
    buyingAnt: 5,
    profileRedirect: 6,
    txWaiting: 7,
    txDenied: 8,
    badBuyCoinVal: 9,
    coinPricesChanged: 10,
    txFailed: 11,
    insufficientFunds: 12,
    gettingApprovals: 13,
    gettingApprovalsForAll: 14,
    removingApproval: 15,
    removingApprovalForAll: 16,
    reconnect: 17,
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
            bandolier: antConflictsStartIndex + 7,
            overEarOptical: antConflictsStartIndex + 8,
        },
        shemagh: {
            eod: antConflictsStartIndex + 9,
        },
        optical: {
            gasMask: antConflictsStartIndex + 10,
            shrouded: antConflictsStartIndex + 11,
            overEar: {
                eod: antConflictsStartIndex + 12,
            },
        },
        mouth: {
            gasMask: antConflictOpticalEndIndex,
            eod: antConflictOpticalEndIndex + 1,
            shrouded: antConflictsStartIndex + 2,
        },
        face: {
            gasMask: antConflictOpticalEndIndex + 3,
            shrouded: antConflictOpticalEndIndex + 4,
        },
        head: {
            eod: antConflictOpticalEndIndex + 5,
        }, 
        body: {
            eod: antConflictOpticalEndIndex + 6,
            sleeved: {
                reflective: antConflictOpticalEndIndex + 7,
            },
        },
        bandolier: {
            eod: antConflictOpticalEndIndex + 8,
            reflective: {
                sleevedBody: antConflictOpticalEndIndex + 9,
            },
        },
        tallHeadGear: {
            antenna: antConflictBandolierEndIndex,
        },
        antenna: {
            tallHeadGear: antConflictBandolierEndIndex + 1,
        },
        shrouded: {
            faceGear: antConflictBandolierEndIndex + 2,
            optical: antConflictBandolierEndIndex + 3,
            faceAcc: antConflictBandolierEndIndex + 4,
            mouth: antConflictBandolierEndIndex + 5,
        },
        epicMax: antConflictEndIndex,
        legendaryMax: antConflictEndIndex + 1,
        upcomingSelected: antConflictEndIndex + 2,
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
        msg: 'Connected to wrong net, viewing data from goerli test network',
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
        msg: 'EOD incompatible with Bandolier Belts',
        timer: shortTimer
    },
    {
        msg: 'EOD incompatible with "Over Ear Optical Gear"',
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
        msg: 'Optical Gear incompatible with Shrouded Helmet',
        timer: shortTimer
    },
    {
        msg: '"Over Ear Optical Gear" incompatible with EOD',
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
        msg: 'Mouth Accessories incompatible with Shrouded Helmet',
        timer: shortTimer
    },
    {
        msg: 'Face Accessories incompatible with Gas Mask',
        timer: shortTimer
    },
    {
        msg: 'Face Accessories and Gear incompatible with Shrouded Helmet',
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
    {
        msg: '"Sleeved Body Gear" incompatible with Reflective Belt',
        timer: shortTimer
    },
    {
        msg: 'Bandolier Belts incompatible with EOD',
        timer: shortTimer
    },
    {
        msg: 'Reflective Belt incompatible with "Sleeved Body Gear"',
        timer: shortTimer
    },
    {
        msg: 'Tall Head Gear incompatible with special antenna',
        timer: shortTimer
    },
    {
        msg: 'Special antenna incompatible with tall Head Gear',
        timer: shortTimer
    },
    {
        msg: 'Shrouded Helmet incompatible with Face Gear',
        timer: shortTimer
    },
    {
        msg: 'Shrouded Helmet incompatible with Optical Gear',
        timer: shortTimer
    },
    {
        msg: 'Shrouded Helmet incompatible with Face Accessories',
        timer: shortTimer
    },
    {
        msg: 'Shrouded Helmet incompatible with Mouth Accessories',
        timer: shortTimer
    },
    {
        msg: '2 epic or better traits max',
        timer: shortTimer
    },
    {
        msg: '1 legendary trait max',
        timer: shortTimer
    },
    {
        msg: 'Please remove upcoming demo traits',
        timer: normTimer
    },
]