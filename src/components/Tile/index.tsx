import React, { ReactElement, FunctionComponent } from 'react'
import {ChessPieceType} from '../../redux/reducers/chessboardReducer/types';
import Spinner from '../Spinner';

import {getPieceElementByType} from '../../utils/pieces-import';

import classes from './Tile.module.css';

interface Props {
    chessPieceType: ChessPieceType,
    // tileIndex: number
}

export default function Tile({chessPieceType}: Props): ReactElement {

    const Piece = getPieceElementByType(chessPieceType);
    let tile = <div
    className={classes.Tile}></div>
    if(Piece) {
        tile = <div
            className={classes.Tile + ` ${chessPieceType.side === 'WHITE' ? classes.Tile__white : classes.Tile__black}`}>
                    <Piece/>
                </div>;
    }

    return (
        tile
    )
}
