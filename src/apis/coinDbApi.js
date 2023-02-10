const coinUrl = 'http://127.0.0.1:3001/coins/images';

export const getCoinImage = async (id) => {
  const response = await fetch(coinUrl + '/' + id, {
    method: 'GET',
  })
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