// pathName should be 'coin' or 'ant'
export const goToNftView = (pathName, nftIndex) => {
    window.location = '/' + pathName + '/' + nftIndex
}