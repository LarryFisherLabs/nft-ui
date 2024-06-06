import { urls } from "../utils/json-constants/urls";

const url = urls.web2BackEnd;
// const url = 'http://localhost:3001'

// nftType:
// 0 coins
// 1 ants
export const getNftInfo = async (passedNetId, nftId, nftType, version = 1) => {
  const netId = passedNetId === 0 || passedNetId === 1 ? 5 : passedNetId
  const nftTypePath = nftType === 0 ? 'coins' : 'ants'
  const response = await fetch(url + nftTypePath + '/' + netId + '/' + version + '/' + nftId, {
    method: 'GET',
  })
  return await response.json();
}

export const getNftCount = async (passedNetId, nftType, version = 1) => {
  const netId = passedNetId === 0 || passedNetId === 1 ? 5 : passedNetId
  const nftTypePath = nftType === 0 ? 'coins' : 'ants'
  const response = await fetch(url + nftTypePath + '/' + netId + '/' + version + '/count', {
    method: 'GET'
  })
  const jsonResponse = await response.json()
  console.log(jsonResponse)
  const count = jsonResponse.hasOwnProperty('message') && jsonResponse.message === 'No tokens yet' ? 0 : jsonResponse.count
  return count;
}

export const getOwnersNfts = async (passedNetId, ownerAddress, nftType, version = 1) => {
  const netId = passedNetId === 0 || passedNetId === 1 ? 5 : passedNetId
  const nftTypePath = nftType === 0 ? 'coin-ids' : 'ant-ids'
  const response = await fetch(url + nftTypePath + '/' + netId + '/' + version + '/' + ownerAddress, {
    method: 'GET',
  })
  const jsonResponse = await response.json()
  return jsonResponse.ids;
}

// export const postCoin = async(id, color, value) => {
//   const response = await fetch(coinUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: {
//       'id': id,
//       'color': color,
//       'value': value
//     }
//   });
//   return response.json();
// }

// export const getCoin = async