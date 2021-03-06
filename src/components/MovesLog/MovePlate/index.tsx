import React, { ReactElement } from 'react'
import styled from 'styled-components';

import {Move} from '../../../redux/reducers/movesLogReducer/types';

import {ReactComponent as MoveArrow} from '../../../assets/movesLog/moveArrow/right-arrow.svg';

import classes from './style.module.css';

interface MovePlateStyleProps {
    playersSideColor: 'WHITE' | 'BLACK',
    gameStart: boolean,
    gameEnd: boolean
}

const MovePlate = styled.div<MovePlateStyleProps>`
display: flex;
position: relative;
justify-content: center;
align-items: center;
width: 100%;
height: 10%;
&:before {
    content: '';
    height: 100%;
    width: 5%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${props => props.playersSideColor === 'WHITE' ? '#fff' : '#000'}
}
&:after {
    content: '';
    display: ${props => props.gameStart || props.gameEnd ? 'block' : 'none'};
    height: 100%;
    width: 5%;
    position: absolute;
    left: 5%;
    top: 0;
    background-color: ${props => {
        if(props.gameStart) return '#0f0';
        if(props.gameEnd) return '#f00';
        else return '#000';
    }}
}
`

const MoveValue = styled.div`
    width: 30%;
    text-align: center;
    color: white;
    text-shadow: 1px 1px black;
    font-size: 25px;
    font-weight: 700;
`

interface Props {
    moveData: Move
}

export default function index({moveData}: Props): ReactElement {

    const xAxisSymbols = 'ABCDEFGH';

    return (
        <MovePlate playersSideColor={moveData.currentPlayer} 
        gameStart={moveData.gameStart} 
        gameEnd={moveData.gameEnd}>
            <MoveValue>{xAxisSymbols.substr(moveData.oldPos.x, 1) + moveData.oldPos.y}</MoveValue>
            <MoveArrow className={classes.MoveArrow} style={{fill: moveData.currentPlayer.toLowerCase()}}/>
            <MoveValue>{xAxisSymbols.substr(moveData.newPos.x, 1) + moveData.newPos.y}</MoveValue>
        </MovePlate>
    )
}
