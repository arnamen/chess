import React, { ReactElement, useEffect, useRef } from 'react'
import styled from 'styled-components';

import MovePlate from './MovePlate';

import {Move} from '../../redux/reducers/movesLogReducer/types';

import bordersTexture from '../../assets/movesLog/borders/textures/texture-seamless-wood-5.jpg';
import backgroundTexture from '../../assets/movesLog/background/movesLog-background.jpg';

const MovesLogBackdrop = styled.div`
    display: inline-flex;
    position: relative;
    width: 20vw;
    max-width: 240px;
    height: 40vw;
    max-height: 504px;
    padding: 2.5vw 1vw 1vw 1vw;
    background: url(${bordersTexture}) center center/cover repeat;
`

const MovesLog = styled.div`
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

const MovesLogHeader = styled.div`
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
interface Props {
    moves: Move[]
}

export default function MovesLogComponent({moves}: Props): ReactElement {

    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(lastElementRef.current) lastElementRef.current.scrollIntoView();
    }, [moves])

    return (
        <MovesLogBackdrop>
            <MovesLogHeader><span>Moves log</span></MovesLogHeader>
            <MovesLog>
                {moves.map((move, index) => <MovePlate 
                key={`${move.currentPlayer}-${move.gameEnd}-${move.gameStart}-${move.oldPos.x}-${move.oldPos.y}-${move.newPos.x}-${move.newPos.y}`} 
                ref={index === moves.length - 1 ? lastElementRef : null}
                moveData={move}/>)}
            </MovesLog>
        </MovesLogBackdrop>
    )
}
