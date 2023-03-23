import styled from 'styled-components'
import { getViewLevel } from '../utils/deviceType'

// pagelayout
export const ViewStyle = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    padding-bottom: 1rem;
`

export const Text = styled.div`
    color: #fed600;
    font-size: 1.1rem;
    @media ${getViewLevel(2)} {
        font-size: .9rem;
    }
    @media ${getViewLevel(3)} {
        font-size: .8rem;
    }
    @media ${getViewLevel(4)} {
        font-size: .7rem;
    }
    @media ${getViewLevel(5)} {
        font-size: .68rem;
    }
`

export const TextLink = styled.a`
    text-underline-position: below;
    margin-left: .3rem;
    color: #fed600;
    font-size: 1.1rem;
    @media ${getViewLevel(2)} {
        font-size: .9rem;
    }
    @media ${getViewLevel(3)} {
        font-size: .8rem;
    }
    @media ${getViewLevel(4)} {
        font-size: .7rem;
    }
    @media ${getViewLevel(5)} {
        font-size: .68rem;
    }
`

export const LargeText = styled.div`
    color: #fed600;
    font-size: 1.2rem;
    @media ${getViewLevel(3)} {
        font-size: .9rem;
    }
    @media ${getViewLevel(5)} {
        font-size: .83rem;
    }
`

export const SmallText = styled(Text)`
    font-size: .9rem;
    @media ${getViewLevel(2)} {
        font-size: .73rem;
    }
    @media ${getViewLevel(3)} {
        font-size: .65rem;
    }
    @media ${getViewLevel(4)} {
        font-size: .57rem;
    }
`

export const IndentedText = styled(Text)`
    padding-left: 20%;
`

export const Title = styled(Text)`
    font-size: 2.5rem;
    font-weight: 120;
`

export const LeftTitle = styled(Title)`
    font-size: 2rem;
`

export const Title2 = styled(Title)`
    font-size: 1.5rem;
    font-weight: 100;
`

export const Title2CrossHair = styled(Title2)`
    cursor: crosshair;
`

export const Title4 = styled(Title2)`
    font-size: .9rem;
    @media ${getViewLevel(0)} {
        font-size: .8rem;
    }
    @media ${getViewLevel(2)} {
        font-size: .73rem;
    }
    @media ${getViewLevel(3)} {
        font-size: .65rem;
    }
    @media ${getViewLevel(4)} {
        font-size: .57rem;
    }
`

export const StyledButton = styled.button`
    border-radius: 16px;
    background-color: #c397e1;
    color: #fed600;
    padding: .3rem;
    font-size: 1rem;
    cursor: pointer;
    align-self: center;
`

export const ThinStyledButton = styled(StyledButton)`
    padding: .12rem;
    font-size: .9rem;
    border-radius: 0% 16px 16px 0%;
`

export const TopMarginBtn = styled(StyledButton)`
    margin-top: .3rem;
`

export const Canvas = styled.canvas`
    width: 450px;
    height: 450px;
    border: 1px solid #d3d3d3;
    image-rendering: pixelated;
    margin: 15px;
    align-self: center;
    @media ${getViewLevel(4)} {
        margin: 10px;
    }
`

export const StyledAntCanvas = styled(Canvas)`
    @media ${getViewLevel(0)} {
        width: 355px;
        height: 355px;
    }
    @media ${getViewLevel(1)} {
        width: 300px;
        height: 300px;
    }
    @media ${getViewLevel(2)} {
        width: 250px;
        height: 250px;
    }
    @media ${getViewLevel(4)} {
        width: 220px;
        height: 220px;
    }
`

export const CoinImg = styled.img`
    width: 280px;
    height: 280px;
    cursor: pointer;
    @media ${getViewLevel(3)} {
        width: 220px;
        height: 220px;
    }
    @media ${getViewLevel(4)} {
        width: 160px;
        height: 160px;
    }
    @media ${getViewLevel(5)} {
        width: 140px;
        height: 140px;
    }
`

export const AntImg = styled(CoinImg)`
    image-rendering: pixelated;
    border-radius: 16px;
`

export const LargeCoinImg = styled.img`
    width: 550px;
    height: 550px;
    @media ${getViewLevel(3)} {
        width: 520px;
        height: 520px;
    }
    @media ${getViewLevel(4)} {
        width: 420px;
        height: 420px;
    }
    @media ${getViewLevel(5)} {
        width: 350px;
        height: 350px;
    }
`

export const LargeAntImg = styled(LargeCoinImg)`
    padding-bottom: .3rem;
    image-rendering: pixelated;
    border-radius: 16px;
`

export const Panel = styled.div`
    margin-top: 8px;
    background-color: rgb(127, 0, 214, .29);
    max-width: 80%;
    padding: 4px;
    border-radius: 16px;
    border-width: 2px;
    border-style: outset;
    border-color: buttonborder;
`

export const CanvasPanel = styled(Panel)`
    display: flex;
    flex-flow: column;
    width: fit-content;
    min-width: 600px;
    margin-bottom: 1rem;
    @media ${getViewLevel(4)} {
        min-width: fit-content;
    }
`

export const TextBlock = styled(Text)`
    align-self: center;
    padding: 5px;
`

export const NftGrid = styled.div`
    display: flex;
    margin-top: 5px;
    flex-flow: row wrap;
    gap: 5px;
    justify-content: center;
`

export const StyledInput = styled.input`
    align-self: center;
    margin-top: 8px;
    background: transparent;
    border-radius: 16px;
`

export const InputWithFlatSide = styled(StyledInput)`
    padding-top: .1rem;
    padding-bottom: .1rem;
    border-radius: 16px 0% 0% 16px;
    max-width: 5rem;
    text-align: center;
    padding-left: .18rem;
`
