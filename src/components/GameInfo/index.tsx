import React, { ReactElement } from 'react'
import styled from 'styled-components';

import bordersTexture from '../../assets/movesLog/borders/textures/texture-seamless-wood-5.jpg';
import backgroundTexture from '../../assets/movesLog/background/movesLog-background.jpg';

const GameInfoBackdrop = styled.div`
    display: inline-block;
    position: relative;
    width: 20vw;
    max-width: 240px;
    height: 40vw;
    max-height: 504px;
    padding: 2.5vw 1vw 1vw 1vw;
    background: url(${bordersTexture}) center center/cover repeat;
`

const GameInfo = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${backgroundTexture}) center center/cover repeat;
    box-shadow: 2px 3px 25px 14px rgb(34 60 80 / 33%) inset;
    overflow: auto;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.1);
    }
`

const GameInfoHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: white;
    text-shadow: 1px 1px black;
    font-size: min(25px, 1.5vw);
    font-weight: 700;
    text-align: center;
    margin-top: 0.5vw;
`

const GameInfoText = styled.span`
background: url(${bordersTexture}) center center/cover repeat;
background-clip: text;
-webkit-background-clip: text;
color: transparent;
font-weight: 700;
font-size: 25px;
`
interface Props {
}

export default function index({}: Props): ReactElement {
    return (
        <GameInfoBackdrop>
            <GameInfoHeader><span>Information</span></GameInfoHeader>
            <GameInfo>
                <GameInfoText>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A quidem incidunt qui illo, quia sit. Accusamus nesciunt distinctio molestiae corrupti. Adipisci impedit possimus voluptas alias. Soluta placeat veritatis voluptatem impedit!</span>
                </GameInfoText>
            </GameInfo>
        </GameInfoBackdrop>
    )
}
