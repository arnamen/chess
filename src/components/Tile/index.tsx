import React, { ReactElement, FunctionComponent } from 'react'
import {ChessPieceType, SelectedPiece} from '../../redux/reducers/chessboardReducer/types';
import Spinner from '../Spinner';

import {getPieceElementByType} from '../../utils/pieces-import';

import classes from './Tile.module.css';

export interface TileIndex {
    x: number,
    y: number
}
interface Props {
    chessPieceType: ChessPieceType,
    tileIndex: TileIndex,
    isActive: boolean,
    isSelected?: boolean,
    isHighlighted?: boolean,
    onSelectPiece: (selectedPiece: SelectedPiece) => void
}

export default function Tile({chessPieceType, tileIndex, isActive, isSelected, isHighlighted, onSelectPiece}: Props): ReactElement {

    const appliedClasses: string[] = [classes.Tile];
    //tiles color
    if(Math.pow(-1, tileIndex.x + tileIndex.y) > 0)
     appliedClasses.push(classes.Tile__even);
    else appliedClasses.push(classes.Tile__odd);
    //svg image wrapped in component
    const Piece = getPieceElementByType(chessPieceType);
    if(Piece && isSelected) appliedClasses.push(classes.Tile__selected);
    else if(Piece && isActive) appliedClasses.push(classes.Tile__active);
    else if(isHighlighted) appliedClasses.push(classes.Tile__highlighted);

    let tile = <div
    className={appliedClasses.join(' ')}></div>

    if(Piece) {
        tile = <div
            className={appliedClasses.join(' ')}
            onClick={() => onSelectPiece({piece: chessPieceType, tileIndex})}>
                    <Piece className={classes.Tile__piece}/>
                </div>;
    }

    return (
        tile
    )
}
