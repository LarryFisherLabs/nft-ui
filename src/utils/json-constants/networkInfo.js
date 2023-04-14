import { ethers } from "ethers"

export const netInfo = {
    1: {
        localName: 'mainNet',
        chainId: '0x1',
        popupId: 2
    },
    11155111: {
        localName: 'sepolia',
        coinContract: "0xc65480c0fcb7f2bef837aab38800a10b7e38be94",
        antContract: "0x85c995570e03051ca1e610e15e34abe2cfca649d",
        testBitDaoContract: "0x94E58F810aB066cA932225C72b7e6Cfa948E5A70",
        testBitDaoContract2: "0x3EdcadF16ad4474e257Dac92605e6Ba6EF04C922",
        chainName: 'Sepolia Testnet',
        chainId: ethers.utils.hexlify(11155111),
        nativeCurrency: { name: 'SepoliaETH', decimals: 18, symbol: 'SEP' },
        rpcUrls: ['https://sepolia.infura.io/v3/'],
        popupId: 0
    },
    5: {
        localName: 'goerli',
        coinContract: "0x164fc781381ef05ea9983b8f23b565dfa41502a4",
        antContract: "0x91dada74286e9cf287e536e2969fc14d034b85b0",
        chainName: 'Goerli Testnet',
        chainId: '0x5',
        nativeCurrency: { name: 'GoerliETH', decimals: 18, symbol: 'GOE' },
        rpcUrls: ['https://goerli.infura.io/v3/'],
        popupId: 1
    }
}