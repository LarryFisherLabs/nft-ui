import { ethers } from "ethers"
import { popupTypes } from "./popupInfo"

export const netInfo = {
    1: {
        localName: 'mainNet',
        chainId: '0x1',
        popupId: popupTypes.mainNetData
    },
    11155111: {
        localName: 'sepolia',
        coinContracts: {
            og: "0xc65480c0fcb7f2bef837aab38800a10b7e38be94",
            v0000: "0x9bf33ef2f78b957709eaa8ab6dcd69e8833102aa"
        },
        antContracts: {
            og: "0x85c995570e03051ca1e610e15e34abe2cfca649d",
            v0000: "0xa177a0b2f52f75babf9d34386900bce3eb47b7a2"
        },
        testBitDaoContract: "0x94E58F810aB066cA932225C72b7e6Cfa948E5A70",
        testBitDaoContract2: "0x3EdcadF16ad4474e257Dac92605e6Ba6EF04C922",
        chainName: 'Sepolia Testnet',
        chainId: ethers.utils.hexlify(11155111),
        nativeCurrency: { name: 'SepoliaETH', decimals: 18, symbol: 'SEP' },
        rpcUrls: ['https://sepolia.infura.io/v3/'],
        popupId: popupTypes.sepoliaData
    },
    5: {
        localName: 'goerli',
        coinContracts: {
            og: "0x164fc781381ef05ea9983b8f23b565dfa41502a4",
            v0000: "0xbc0cc29b4134f4c8a53ad70cAeE4D507cce94c2c",
        },
        antContracts: {
            og: "0x91dada74286e9cf287e536e2969fc14d034b85b0",
            v0000: "0x695d67BA37ab330F6E776f959aD2fD06fF3136D7"
        },
        chainName: 'Goerli Testnet',
        chainId: '0x5',
        nativeCurrency: { name: 'GoerliETH', decimals: 18, symbol: 'GOE' },
        rpcUrls: ['https://goerli.infura.io/v3/'],
        popupId: popupTypes.goerliData
    }
}