const url = 'https://nft-api-bphk.onrender.com';

// nftType:
// 0 coins
// 1 ants
export const getNftInfo = async (netId, nftId, nftType) => {
  const nftTypePath = nftType === 0 ? 'coins' : 'ants'
  const response = await fetch(url + '/' + netId + '/' + nftTypePath + '/' + nftId, {
    method: 'GET',
  })
  console.log(response.body())
  return response.body();
}

export const getNftOwner = async (netId, nftId, nftType) => {
  const nftTypePath = nftType === 0 ? 'coin-owner' : 'ant-owner'
  const response = await fetch(url + '/' + netId + '/' + nftTypePath + '/' + nftId, {
    method: 'GET',
  })
  console.log(response.body())
  return response.body();
}

export const getNftCount = async (netId, nftType) => {
  const nftTypePath = nftType === 0 ? 'coins' : 'ants'
  const response = await fetch(url + '/' + netId + '/' + nftTypePath + '/count')
  console.log(await response.json())
  return response.body();
}

export const getOwnersNfts = async (netId, ownerAddress, nftType) => {
  const nftTypePath = nftType === 0 ? 'coin-ids' : 'ant-ids'
  const response = await fetch(url + '/' + netId + '/' + nftTypePath + '/' + ownerAddress, {
    method: 'GET',
  })
  console.log(response.body())
  return response.body();
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