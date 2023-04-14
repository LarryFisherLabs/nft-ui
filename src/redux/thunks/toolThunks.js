import { BigNumber, constants, ethers } from "ethers"
import { getAntContract, getAntContractAddress, getBitDaoContract, getBitDaoContract2, getCoinContract, getCoinContractAddress, getERC20Contract, getERC721Contract, getProvider } from "../../utils/ethers-utils"
import { toolErr, updateApprovals, updateApprovalsForAll, updateERC20Approvals } from "../slices/toolSlice"
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
    approvedAddress: ,
    allowance: 
  }
*/
const createERC20ApprovedObject = (approvedAddress, allowance) => {
  return {
    approvedAddress: approvedAddress,
    allowance: allowance
  }
}

/* 
  {
    contractAddress: ,
    contractName: ,
    contractSymbol: ,
    approvedObjects: []
  }
*/
const createERC20ApprovalObject = async (contract, approvedAddresses, allowances) => {
  const contractName = await contract.name()
  const contractSymbol = await contract.symbol()

  const erc20ApprovedObjects = []
  for (let i = 0; i < approvedAddresses.length; i++) {
    erc20ApprovedObjects.push(createERC20ApprovedObject(approvedAddresses[i], allowances[i]))
  }
  return {
    contractAddress: contract.address.toLowerCase(),
    contractName: contractName,
    contractSymbol: contractSymbol,
    approvedObjects: erc20ApprovedObjects
  }
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
  
// add allowance array for erc20 then add function for adding object with allowance and add visual
export const getApprovals = createAsyncThunk(
  "toolSlice/getApprovals",
  async (_, { dispatch, getState }) => {
    try {
      const account = getState().connectSlice.account
      const approvalLogs = await getLogs(false, account)
      if (approvalLogs.length === 0) {
        return
      }
      // for erc20
      const erc20AddressArray = []
      const erc20ApprovedArrays = []
      const allowancesArrays = []
      const ignoredERC20AddressArray = []
      const ignoredApprovedArrays = []
      // for erc721
      const contractAddressArray = []
      const nftIdArrays = []
      const approvedAddressArrays = []
      const ignoredContractAddressArray = []
      const ignoredIdArrays = []
      // go through all logs
      for (let i = 0; i < approvalLogs.length; i++) {
        const topicsLength = approvalLogs[i].topics.length
        // distinguish between erc721 and erc20
        if (topicsLength === 3) {
          const contractAddress = approvalLogs[i].address.toLowerCase()
          const approvedAddress = hexStripZeros(approvalLogs[i].topics[2])
          const ignoredContractIndex = ignoredERC20AddressArray.indexOf(contractAddress) 
          const isApprovedIgnored = ignoredContractIndex !== -1 ? ignoredApprovedArrays[ignoredContractIndex].includes(approvedAddress) : false
          // ignore token [contract, approved] pairs that have already been checked
          if (approvedAddress !== constants.AddressZero && !isApprovedIgnored) {
            const erc20Contract = getERC20Contract(contractAddress)
            const allowance = parseInt(await erc20Contract.allowance(account, approvedAddress))
            // ignore 0 balance allowance
            if (allowance > 0) {
              const decimals = await erc20Contract.decimals()
              const displayAllowance = allowance / 10 ** decimals
              const contractIndex = erc20AddressArray.indexOf(contractAddress) 
              // if contract already included in array
              if (contractIndex !== -1) {
                erc20ApprovedArrays[contractIndex].push(approvedAddress)
                allowancesArrays[contractIndex].push(displayAllowance)
              } else {
                erc20AddressArray.push(contractAddress)
                erc20ApprovedArrays.push([approvedAddress])
                allowancesArrays.push([displayAllowance])
              }
            }
            if (ignoredContractIndex !== -1) {
              ignoredApprovedArrays[ignoredContractIndex].push(approvedAddress)
            } else {
              ignoredERC20AddressArray.push(contractAddress)
              ignoredApprovedArrays.push([approvedAddress])
            }
          }
        } else if (topicsLength === 4) {
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
      }
      const finalERC20ApprovalState = []
      const finalApprovalState = []
      for (let i = 0; i < erc20AddressArray.length; i++) {
        const erc20Contract = getERC20Contract(erc20AddressArray[i])
        const contApprovalDeets = await createERC20ApprovalObject(erc20Contract, erc20ApprovedArrays[i], allowancesArrays[i])
        finalERC20ApprovalState.push(contApprovalDeets)
      }
      for (let i = 0; i < contractAddressArray.length; i++) {
        const erc721Contract = getERC721Contract(contractAddressArray[i])
        const contApprovalDeets = await createApprovalObject(erc721Contract, nftIdArrays[i], approvedAddressArrays[i])
        finalApprovalState.push(contApprovalDeets)
      }
      dispatch(updateERC20Approvals({ approvalDetails: finalERC20ApprovalState }))
      dispatch(updateApprovals({ approvalDetails: finalApprovalState }))
    } catch (err) {
      dispatch(toolErr({error: err.message}))
    }
  }
)

export const removeERC20Approval = createAsyncThunk(
  "toolSlice/removeERC20Approval",
  async ({erc20Address, approvedAddress}, {dispatch}) => {
    try {
      const erc20Contract = getERC20Contract(erc20Address)
      const tx = await erc20Contract.approve(approvedAddress, 0)
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

export const addERC20Approval = createAsyncThunk(
  "toolSlice/addERC20Approval",
  async ({isBitDao2, isMethod0}, { dispatch }) => {
    try {
      const bitdaoContract = isBitDao2 === false ? await getBitDaoContract() : await getBitDaoContract2()
      const addressToApprove = isMethod0 ? await getCoinContractAddress() : await getAntContractAddress()
      const allowance = isMethod0 ? BigNumber.from("1000000000000000000000") : 100000000
      await bitdaoContract.approve(addressToApprove, allowance)
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
          if (!isApprovedContractIgnored) {
            const erc721Contract = getERC721Contract(contractAddress)
            const isApproved = await erc721Contract.isApprovedForAll(account, approvedAddress)
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
        dispatch(updateApprovalsForAll({ approvalForAllDeets: finalState }))
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
  async ({nftType, methodNum}, { dispatch }) => {
    try {
      const contract = nftType === 0 ? await getCoinContract() : await getAntContract()
      const approvedAddress = methodNum === 0 ? nftType === 0 ? await getAntContractAddress() : await getCoinContractAddress() : "0x50342d2b8d5b1b30af024dd09610c576e9006133"
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