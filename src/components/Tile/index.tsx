import React, { ReactElement, FunctionComponent } from 'react'
import {ChessPieceType} from '../../redux/reducers/chessboardReducer/types';
import Spinner from '../Spinner';

import {getPieceElementByType} from '../../utils/pieces-import';

import classes from './Tile.module.css';

interface Props {
    chessPieceType: ChessPieceType,
    tileIndex: {
        x: number,
        y: number
    }
}

export default function Tile({chessPieceType, tileIndex}: Props): ReactElement {

    const appliedClasses: string[] = [classes.Tile];
    //tiles color
    if(Math.pow(-1, tileIndex.x + tileIndex.y) > 0)
     appliedClasses.push( classes.Tile__even);
    else appliedClasses.push( classes.Tile__odd);

    const Piece = getPieceElementByType(chessPieceType);
    let tile = <div
    className={appliedClasses.join(' ')}></div>
    if(Piece) {
        tile = <div
            className={appliedClasses.join(' ')}>
                    <Piece className={classes.Tile__piece}/>
                </div>;
    }

    return (
        tile
    )
}
