import React, { ReactElement } from 'react'
import Tile from '../Tile';
import {ChessPieceType} from '../../redux/reducers/chessboardReducer/types';

import classes from './Chessboard.module.css';
interface Props {
    chessboardData: ChessPieceType[][],
    currentPlayerTurn: 'white' | 'black',
    onSelectPiece: (piece: ChessPieceType, tileIndex: {x: number, y: number}) => void
}

export default function Chessboard({chessboardData, currentPlayerTurn, onSelectPiece}: Props): ReactElement {

    
    return (
        <div className={classes.Chessboard}>
            {chessboardData.map((chessboardLine, y) => {
                return chessboardLine.map((piece, x) => {
                    return <Tile 
                    tileIndex={{x, y}}
                    chessPieceType={piece} 
                    isActive={currentPlayerTurn === piece.side.toLowerCase()}
                    key={`${y*8+x}_${piece.side}_${piece.type}`}
                    onSelectPiece={onSelectPiece}
                    />
                })
            })}
        </div>
    )
}
