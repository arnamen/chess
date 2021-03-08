import React, { ReactElement, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import equal from 'deep-equal';

import MovePlate from './MovePlate';

import {Move} from '../../redux/reducers/movesLogReducer/types';

import { updateChessboard, createChessboard } from '../../redux/reducers/chessboardReducer/types';
import { RemoveMoveFromLog } from '../../redux/reducers/movesLogReducer/types';

import bordersTexture from '../../assets/movesLog/borders/textures/texture-seamless-wood-5.jpg';
import backgroundTexture from '../../assets/movesLog/background/movesLog-background.jpg';

const mapDispatchToProps = {updateChessboard, RemoveMoveFromLog, createChessboard};

const connector = connect(null, mapDispatchToProps);

const MovesLogBackdrop = styled.div`
    display: inline-flex;
    position: relative;
    width: 20vw;
    max-width: 240px;
    height: 40vw;
    max-height: 504px;
    padding: 2.5vw 1vw 1vw 1vw;
    background: url(${bordersTexture}) center center/cover repeat;
    @media (max-width: 650px) {
        order: 2;
        margin-top: 10px;
        height: 40vh;
        width: 40vw;
        padding: 3vh 1vw 1vh 1vw;
        margin-top: 2vh;
      }
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

type PropsFromRedux = ConnectedProps<typeof connector>;

function MovesLogComponent({moves, updateChessboard, RemoveMoveFromLog, createChessboard}: Props & PropsFromRedux): ReactElement {

    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(lastElementRef.current && window.innerWidth > 650) lastElementRef.current.scrollIntoView();
    }, [moves])

    const onUndoMove = (move: Move) => {
        const moveIndex = moves.findIndex(curMove => equal(curMove.chessboard, move.chessboard));

        if(moveIndex === 0) {
            RemoveMoveFromLog(0);
            createChessboard();
            return;
        }

        if(moveIndex !== -1) {
            for (let i = moves.length - 1; i >= moveIndex; i--) {
                 RemoveMoveFromLog(i);
            }
            updateChessboard(moves[moveIndex - 1].chessboard);

        }
    }

    return (
        <MovesLogBackdrop>
            <MovesLogHeader><span>Moves log</span></MovesLogHeader>
            <MovesLog>
                {moves.map((move, index) => <MovePlate 
                key={`${move.currentPlayer}-${move.gameEnd}-${move.gameStart}-${move.oldPos.x}-${move.oldPos.y}-${move.newPos.x}-${move.newPos.y}`} 
                ref={index === moves.length - 1 ? lastElementRef : null}
                moveData={move}
                onUndoMove={onUndoMove}/>)}
            </MovesLog>
        </MovesLogBackdrop>
    )
}

export default connector(MovesLogComponent);