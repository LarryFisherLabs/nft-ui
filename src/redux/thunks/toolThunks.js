import { constants, ethers } from "ethers"
import { getAntContract, getAntContractAddress, getCoinContract, getCoinContractAddress, getERC721Contract, getProvider } from "../../utils/ethers-utils"
import { toolErr, updateApprovals, updateApprovalsForAll } from "../slices/toolSlice"
import { hexStripZeros, hexZeroPad } from "ethers/lib/utils"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { addPopup } from "../slices/connectSlice"
import { popupTypes } from "../../utils/json-constants/popupInfo"

const getLogs = async (isForAll, account) => {
    const provider = getProvider()
    const eventSig = isForAll ? "ApprovalForAll(address,address,bool)" : "Approval(address,address,uint256)"
    const approvalFilterTopic = ethers.utils.id(eventSig)
    const approvalLogs = await provider.getLogs({
        // address: getAntContractAddress(),
        fromBlock: 0,
        toBlock: 'latest',
        topics: [
        approvalFilterTopic,
        hexZeroPad(account, 32)
        ]
    })
    return approvalLogs
}

/* 
  {
    nftId: ,
    approvedAddress: 
  }
*/
const createNftIdApprovalsObject = (nftId, approvedAddress) => {
  return {
    nftId: nftId,
    approvedAddress: approvedAddress
  }
}

/* 
  {
    nftContractAddress: ,
    contractName: ,
    contractSymbol: ,
    nftIdApprovals: []
  }
*/
const createApprovalObject = async (nftContract, nftIdArray, approvedAddressArray) => {
  const contractName = await nftContract.name()
  const contractSymbol = await nftContract.symbol()
  const nftIdApprovals = []
  for (let i = 0; i < nftIdArray.length; i++) {
    nftIdApprovals.push(createNftIdApprovalsObject(nftIdArray[i], approvedAddressArray[i]))
  }
  return {
    contractAddress: nftContract.address.toLowerCase(),
    contractName: contractName,
    contractSymbol: contractSymbol,
    nftIdApprovals: nftIdApprovals
  }
}
  
export const getApprovals = createAsyncThunk(
  "toolSlice/getApprovals",
  async (_, { dispatch, getState }) => {
    try {
      const account = getState().connectSlice.account
      const approvalLogs = await getLogs(false, account)
      if (approvalLogs.length === 0) {
        return
      }
      console.log(approvalLogs)
      const contractAddressArray = []
      const nftIdArrays = []
      const approvedAddressArrays = []
      const ignoredContractAddressArray = []
      const ignoredIdArrays = []
      // go through all logs
      for (let i = 0; i < approvalLogs.length; i++) {
        const nftId = parseInt(approvalLogs[i].topics[3])
        const contractAddress = approvalLogs[i].address.toLowerCase()
        const approvedAddress = hexStripZeros(approvalLogs[i].topics[2])
        const ignoredContractIndex = ignoredContractAddressArray.indexOf(contractAddress) 
        const isIdIgnored = ignoredContractIndex !== -1 ? ignoredIdArrays[ignoredContractIndex].includes(nftId) : false
        // ignore approval removals as well as nft [contract, id] pairs that have already been checked
        if (approvedAddress !== constants.AddressZero && !isIdIgnored) {
          const erc721Contract = getERC721Contract(contractAddress)
          const owner = (await erc721Contract.ownerOf(nftId)).toLowerCase()
          // ignore nfts no longer owned by user
          if (owner === account) {
            const apprvdAddyFromCont = (await erc721Contract.getApproved(nftId)).toLowerCase()
            // ignore nfts with no active approval
            if (apprvdAddyFromCont !== constants.AddressZero) {
              const contractIndex = contractAddressArray.indexOf(contractAddress) 
              // if contract already included in array
              if (contractIndex !== -1) {
                nftIdArrays[contractIndex].push(nftId)
                approvedAddressArrays[contractIndex].push(approvedAddress)
              } else {
                contractAddressArray.push(contractAddress)
                nftIdArrays.push([nftId])
                approvedAddressArrays.push([approvedAddress])
              }
            }
          }
          if (ignoredContractIndex !== -1) {
            ignoredIdArrays[ignoredContractIndex].push(nftId)
          } else {
            ignoredContractAddressArray.push(contractAddress)
            ignoredIdArrays.push([nftId])
          }
        }
      }
      const finalApprovalState = []
      for (let i = 0; i < contractAddressArray.length; i++) {
        const erc721Contract = getERC721Contract(contractAddressArray[i])
        const contApprovalDeets = await createApprovalObject(erc721Contract, nftIdArrays[i], approvedAddressArrays[i])
        finalApprovalState.push(contApprovalDeets)
      }
      if (contractAddressArray.length === 0) return
      dispatch(updateApprovals({ approvalDetails: finalApprovalState }))
    } catch (err) {
      dispatch(toolErr({error: err.message}))
    }
  }
)

export const removeApproval = createAsyncThunk(
  "toolSlice/removeApproval",
  async ({nftContract, nftId}, {dispatch}) => {
    try {
      const erc721Contract = getERC721Contract(nftContract)
      const tx = await erc721Contract.approve(constants.AddressZero, nftId)
      dispatch(addPopup({id: popupTypes.removingApproval}))
      const receipt = await tx.wait()
      if (receipt.status === 1) {
        return
      } else {
        throw new Error('Bad tx. Logs: ' + receipt.logs)
      }
    } catch (err) {
      let legalErr = false
      if (err.message.includes("User denied") || err.message.includes("User rejected")) {
        legalErr = true
        dispatch(addPopup({ id: popupTypes.txDenied }))
      } else if (err.message.includes("insufficient funds")) {
        legalErr = true
        dispatch(addPopup({ id: popupTypes.insufficientFunds }))
      }
      if (!legalErr) {
        dispatch(toolErr({error: err.message}))
      }
    }
  }
)

export const addApproval = createAsyncThunk(
  "toolSlice/addApproval",
  async ({nftId, nftType = 1}, {dispatch}) => {
    try {
      if (nftType === 1) {
        const antContract = await getAntContract()
        await antContract.approve(await getCoinContractAddress(), nftId)
      } else {
        const coinContract = await getCoinContract()
        await coinContract.approve(await getAntContractAddress(), nftId)
      }
    } catch (err) {
      dispatch(toolErr({error: err.message}))
    }
  }
)

/*
  {
    contractAddress: ,
    contractName: ,
    contractSymbol: ,
    approvedForAllArray: []
  }
*/
const createApprovalForAllObject = async (erc721Contract, approvedForAllArray) => {
  const name = await erc721Contract.name()
  const symbol = await erc721Contract.symbol()
  return {
    contractAddress: erc721Contract.address.toLowerCase(),
    contractName: name,
    contractSymbol: symbol,
    approvedForAllArray: approvedForAllArray
  }
}

export const getApprovalsForAll = createAsyncThunk(
    "toolSlice/getApprovalsForAll",
    async (_, { dispatch, getState }) => {
      try {
        const account = getState().connectSlice.account
        const approvalLogs = await getLogs(true, account)
        console.log(approvalLogs)
        if (approvalLogs.length === 0) {
          return
        }
        const contractAddresses = []
        const approvedAddressArrays = []
        const ignoredContractAddresses = []
        const ignoredApprovedAddressArrays = []
        for (let i = 0; i < approvalLogs.length; i++) {
          const contractAddress = approvalLogs[i].address.toLowerCase()
          const approvedAddress = hexStripZeros(approvalLogs[i].topics[2])
          const ignoredContractIndex = ignoredContractAddresses.indexOf(contractAddress)
          const isApprovedContractIgnored = ignoredContractIndex !== -1 ? ignoredApprovedAddressArrays[ignoredContractIndex].includes(approvedAddress) : false
          console.log(isApprovedContractIgnored)
          if (!isApprovedContractIgnored) {
            const erc721Contract = getERC721Contract(contractAddress)
            console.log(`account: ${account} approved: ${approvedAddress}`)
            const isApproved = await erc721Contract.isApprovedForAll(account, approvedAddress)
            console.log(isApproved)
            if (isApproved) {
              const contractIndex = contractAddresses.indexOf(contractAddress)
              if (contractIndex !== -1) {
                approvedAddressArrays[contractIndex].push(approvedAddress)
              } else {
                contractAddresses.push(contractAddress)
                approvedAddressArrays.push([approvedAddress])
              }
            }
            if (ignoredContractIndex !== -1) {
              ignoredApprovedAddressArrays[ignoredContractIndex].push(approvedAddress)
            } else {
              ignoredContractAddresses.push(contractAddress)
              ignoredApprovedAddressArrays.push([approvedAddress])
            }
            
          }
        }
        const finalState = []
        for (let i = 0; i < contractAddresses.length; i++) {
          const erc721Contract = getERC721Contract(contractAddresses[i])
          finalState.push(await createApprovalForAllObject(erc721Contract, approvedAddressArrays[i]))
        }
        if (finalState.length > 0) dispatch(updateApprovalsForAll({ approvalForAllDeets: finalState }))
      } catch (err) {
        dispatch(toolErr({error: err.message}))
      }
    }
  )

export const removeApprovalForAll = createAsyncThunk(
  "toolSlice/removeApprovalForAll",
  async ({nftContract, approvedAddress}, {dispatch}) => {
    try {
      const erc721Contract = getERC721Contract(nftContract)
      const tx = await erc721Contract.setApprovalForAll(approvedAddress, false)
      dispatch(addPopup({id: popupTypes.removingApprovalForAll}))
      const receipt = await tx.wait()
      if (receipt.status === 1) {
        return
      } else {
        throw new Error('Bad tx. Logs: ' + receipt.logs)
      }
    } catch (err) {
      let legalErr = false
      if (err.message.includes("User denied") || err.message.includes("User rejected")) {
        legalErr = true
        dispatch(addPopup({ id: popupTypes.txDenied }))
      } else if (err.message.includes("insufficient funds")) {
        legalErr = true
        dispatch(addPopup({ id: popupTypes.insufficientFunds }))
      }
      if (!legalErr) {
        dispatch(toolErr({error: err.message}))
      }
    }
  }
)

export const addApprovalForAll = createAsyncThunk(
  "toolSlice/addApprovalForAll",
  async (nftType, { dispatch }) => {
    try {
      const contract = nftType === 0 ? await getCoinContract() : await getAntContract()
      const approvedAddress = nftType === 0 ? await getAntContractAddress() : await getCoinContractAddress()
      const tx = await contract.setApprovalForAll(approvedAddress, true)
      const receipt = await tx.wait()
      if (receipt.status === 1) {
        return
      } else {
        throw new Error('Bad tx. Logs: ' + receipt.logs)
      }
    } catch (err) {
      let legalErr = false
      if (err.message.includes("User denied") || err.message.includes("User rejected")) {
        legalErr = true
        dispatch(addPopup({ id: popupTypes.txDenied }))
      } else if (err.message.includes("insufficient funds")) {
        legalErr = true
        dispatch(addPopup({ id: popupTypes.insufficientFunds }))
      }
      if (!legalErr) {
        dispatch(toolErr({error: err.message}))
      }
    }
  }
)