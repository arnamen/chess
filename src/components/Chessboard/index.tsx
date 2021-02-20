import React, { ReactElement } from 'react'
import Tile from '../Tile';
import {ChessPieceType} from '../../redux/reducers/chessboardReducer/types';

import classes from './Chessboard.module.css';
interface Props {
    chessboardData: ChessPieceType[][]
}

export default function Chessboard({chessboardData}: Props): ReactElement {
    return (
        <div className={classes.Chessboard}>
            {chessboardData.map((chessboardLine, y) => {
                return chessboardLine.map((piece, x) => {
                    return <Tile 
                    chessPieceType={piece} 
                    key={`${y*8+x}_${piece.side}_${piece.type}`}/>
                })
            })}
        </div>
    )
}
