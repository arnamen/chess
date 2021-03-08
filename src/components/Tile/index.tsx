import React, { ReactElement, FunctionComponent } from 'react'
import { ChessPieceType, SelectedPiece } from '../../redux/reducers/chessboardReducer/types';
import Spinner from '../Spinner';

import { getPieceElementByType } from '../../utils/pieces-assets-import';

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
    isImportant?: boolean,
    isDanger?: boolean,
    isGameFinished: boolean,
    onSelectPiece: (selectedPiece: SelectedPiece) => void,
    onMovePiece: (tileIndex: TileIndex) => void,
}

export default function Tile({ chessPieceType, tileIndex, isActive, isSelected, isHighlighted, onSelectPiece, onMovePiece, isImportant, isDanger }: Props): ReactElement {

    const appliedClasses: string[] = [classes.Tile];
    isImportant && appliedClasses.push(classes.Tile__important);
    isDanger && appliedClasses.push(classes.Tile__danger);
    //tiles color (calculates if tile is even or odd)
    if (Math.pow(-1, tileIndex.x + tileIndex.y) > 0)
        appliedClasses.push(classes.Tile__even);
    else appliedClasses.push(classes.Tile__odd);
    //svg image wrapped in component
    const Piece = getPieceElementByType(chessPieceType);
    if (Piece && isSelected) appliedClasses.push(classes.Tile__selected);
    else if (Piece && isActive) appliedClasses.push(classes.Tile__active);
    else if (isHighlighted) appliedClasses.push(classes.Tile__highlighted);
    //default tile
    let tile = <div
        className={appliedClasses.join(' ')}></div>
    //if tile is sufficient to make move on and has piece on it
    if (isHighlighted && Piece)
        tile = <div
            className={appliedClasses.join(' ')}
            onClick={() => onMovePiece(tileIndex)}>
            <Piece className={classes.Tile__piece} />
        </div>;
    //if tile is sufficient to make move on
    else if (isHighlighted)
        tile = <div className={appliedClasses.join(' ')}
            onClick={() => onMovePiece(tileIndex)}></div>
    //if tile has piece on it
    else if (Piece) 
        tile = <div
            className={appliedClasses.join(' ')}
            onClick={isActive ? () => onSelectPiece({ piece: chessPieceType, tileIndex }) : () => {}}>
            <Piece className={classes.Tile__piece} />
        </div>;

    return (
        tile
    )
}
