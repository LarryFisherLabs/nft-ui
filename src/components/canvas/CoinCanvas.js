import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectFounder, selectPrices, selectTotalCount } from "../../redux/slices/coinSlice"
import { Canvas } from "../../styles/general"

import styled from 'styled-components'
import { getViewLevel } from "../../utils/deviceType"


const getImageFileName = (color) => {
  if (color === 4) {
      return 'coins/red.png'
  } else if (color === 3) {
      return 'coins/gem.png'
  } else if (color === 2) {
      return 'coins/gold.png'
  } else if (color === 1) {
      return 'coins/silver.png'
  } else if (color === 0) {
      return 'coins/bronze.png'
  }
}

export const getColor = (value, minPrices) => {
  const bronzePrice = minPrices.bronze || .001
  const silverPrice = minPrices.silver || .002
  const goldPrice = minPrices.gold || .003
  const diamondPrice = minPrices.diamond || .004
  if (value >= parseFloat(diamondPrice)) {
      return 3
  } else if (value >= parseFloat(goldPrice)) {
      return 2
  } else if (value >= parseFloat(silverPrice)) {
      return 1
  } else if (value >= parseFloat(bronzePrice)) {
      return 0
  }
  return -1
}

const embossText = (ctx, text, y = 1350, fontSize = '200px') => {
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.font = fontSize + ' times new roman'
  ctx.strokeStyle = '#a3a3a3'
  ctx.fillStyle = 'black'
  ctx.shadowColor = 'rgb(197 197 197)'
  ctx.shadowBlur = 1
  ctx.shadowOffsetY = -4
  ctx.shadowOffsetX = 6
  ctx.fillText(text, 1000, y)
  ctx.shadowColor = 'rgb(91 91 91)'
  ctx.shadowOffsetY = 4
  ctx.shadowOffsetX = -6
  ctx.fillText(text, 1000, y)
  ctx.shadowColor = null
  ctx.shadowOffsetY = 0
  ctx.shadowOffsetX = 0
  ctx.shadowBlur = 0
  ctx.globalCompositeOperation = 'destination-out'

  ctx.fillText(text, 1000, y)

  ctx.globalCompositeOperation = 'source-over'
}

// if only ctx is passed the canvas will be cleared
const updateCoinCanvas = ({ ctx, color = -1, amount, id }) => {
  ctx.clearRect(0, 0, 2000, 2000)
  if (color > -1) {
    const image = new Image(2000, 2000)
    
    image.src = getImageFileName(color)
    if (id !== 0) id = id || 'Please Connect'

    image.onload = () => {
      embossText(ctx, amount + ' ETH')
      embossText(ctx, id, 400, '150px')
      ctx.globalCompositeOperation = 'destination-over'

      ctx.drawImage(image, 0, 0)
      ctx.globalCompositeOperation = 'source-over'

      ctx.globalAlpha = .1
      ctx.font = '200px times new roman'
      ctx.fillText(amount + ' ETH', 1000, 1350)
      ctx.font = '150px times new roman'
      ctx.fillText(id, 1000, 400)
      ctx.globalAlpha = 1
    }
  }
}

export const StyledCoinCanvas = styled(Canvas)`
  display: ${props => props.isDisabled ? 'block' : 'none'};
  @media ${getViewLevel(4)} {
    width: 350px;
    height: 350px;
    margin-top: 5px;
  }
`

export const CoinCanvas = ({ amount }) => {
  const id = useSelector(selectTotalCount)
  const prices = useSelector(selectPrices)
  const founder = useSelector(selectFounder)
  const canvas = useRef()
  const [isCanvasVisible, toggleCanvas] = useState(false)

  useEffect(() => {
    const isFCBuilder = founder.value > 0 && !founder.isFCMinted
    const isDiscounted = founder.value > 0 && founder.isFCMinted && !founder.isFCDiscountUsed
    const color = isFCBuilder ? 4 : getColor(amount, prices)
    const finalAmount = isFCBuilder ? amount > 0 ? amount + founder.value : founder.value : isDiscounted ? amount * 2 : amount
    const ctx = canvas.current.getContext('2d');
    const bronzePrice = prices.bronze || .001
    if ((finalAmount >= bronzePrice) && !isCanvasVisible) toggleCanvas(true)
    else if (!(finalAmount >= bronzePrice) && isCanvasVisible) toggleCanvas(false)
    updateCoinCanvas({ ctx: ctx, color: color, amount: finalAmount, id: id })
  }, [amount, founder, id, prices, isCanvasVisible])

  return (
    <StyledCoinCanvas ref={canvas} height={2000} width={2000} isDisabled={isCanvasVisible} >
      No browser support
    </StyledCoinCanvas>
  )
}
