const url = 'https://nft-api-bphk.onrender.com';
// const url = 'http://localhost:3001'

// nftType:
// 0 coins
// 1 ants
export const getNftInfo = async (passedNetId, nftId, nftType) => {
  const netId = passedNetId === 0 || passedNetId === 1 ? 5 : passedNetId
  const nftTypePath = nftType === 0 ? 'coins' : 'ants'
  const response = await fetch(url + '/' + netId + '/' + nftTypePath + '/' + nftId, {
    method: 'GET',
  })
  return await response.json();
}

export const getNftCount = async (passedNetId, nftType) => {
  const netId = passedNetId === 0 || passedNetId === 1 ? 5 : passedNetId
  const nftTypePath = nftType === 0 ? 'coins' : 'ants'
  const response = await fetch(url + '/' + netId + '/' + nftTypePath + '/count', {
    method: 'GET'
  })
  const jsonResponse = await response.json()
  return jsonResponse.count;
}

export const getOwnersNfts = async (passedNetId, ownerAddress, nftType) => {
  const netId = passedNetId === 0 || passedNetId === 1 ? 5 : passedNetId
  const nftTypePath = nftType === 0 ? 'coin-ids' : 'ant-ids'
  const response = await fetch(url + '/' + netId + '/' + nftTypePath + '/' + ownerAddress, {
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