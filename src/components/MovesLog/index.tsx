import React, { ReactElement } from 'react'
import styled from 'styled-components';

import {Move} from '../../redux/reducers/movesLogReducer/types';

import bordersTexture from '../../assets/movesLog/borders/textures/texture-seamless-wood-5.jpg';
import backgroundTexture from '../../assets/movesLog/background/movesLog-background.jpg';

const MovesLogBackdrop = styled.div`
    display: inline-block;
    width: 20vw;
    max-width: 240px;
    height: 42vw;
    max-height: 504px;
    padding: 1vw;
    background: url(${bordersTexture}) center center/cover repeat;
`

const MovesLog = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${backgroundTexture}) center center/cover repeat;
    box-shadow: 2px 3px 25px 14px rgb(34 60 80 / 33%) inset;
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
interface Props {
    moves: Move[]
}

export default function index({moves}: Props): ReactElement {
    console.log(moves)
    return (
        <MovesLogBackdrop>
            <MovesLog>

            </MovesLog>
        </MovesLogBackdrop>
    )
}
