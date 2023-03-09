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
    font-size: 1.2rem;
    @media ${getViewLevel(4)} {
        font-size: 1rem;
    }
`

export const SmallText = styled(Text)`
    font-size: 1rem;
    @media ${getViewLevel(4)} {
        font-size: .8rem;
    }
`

export const IndentedText = styled(SmallText)`
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
    font-size: 1rem;
`

export const StyledButton = styled.button`
    border-radius: 16px;
    background-color: #c397e1;
    color: #fed600;
    padding: .5rem;
    font-size: 1rem;
    cursor: pointer;
    align-self: center;
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
    @media ${getViewLevel(3)} {
        width: 220px;
        height: 220px;
    }
    @media ${getViewLevel(4)} {
        width: 190px;
        height: 190px;
    }
`

export const AntImg = styled(CoinImg)`
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
`
