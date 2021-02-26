import React, { ReactElement } from 'react'
import {v4} from 'uuid';

import Tile, {TileIndex} from '../Tile';
import {ChessPieceType, SelectedPiece} from '../../redux/reducers/chessboardReducer/types';

import classes from './Chessboard.module.css';
interface Props {
    chessboardData: ChessPieceType[][],
    currentPlayerTurn: 'WHITE' | 'BLACK',
    highlightedTiles?: TileIndex[],
    selectedPiece?: SelectedPiece,
    onSelectPiece: (selectedPiece: SelectedPiece) => void,
    onMovePiece: (tileIndex: TileIndex) => void,
    
}

export default function Chessboard({chessboardData, currentPlayerTurn, onSelectPiece, highlightedTiles, selectedPiece, onMovePiece}: Props): ReactElement {

    
    return (
        <div className={classes.Chessboard}>
            {chessboardData.map((chessboardLine, y) => {
                
                return chessboardLine.map((piece, x) => {

                    return <Tile 
                    tileIndex={{x, y}}
                    chessPieceType={piece} 
                    isActive={currentPlayerTurn === piece.side}
                    isHighlighted={!!highlightedTiles?.find(highlightedTile => highlightedTile.x === x && highlightedTile.y === y)}
                    isSelected={selectedPiece?.tileIndex.x === x && selectedPiece.tileIndex.y === y}
                    key={`${y*8+x}_${piece.side}_${piece.type}`}
                    onSelectPiece={onSelectPiece}
                    onMovePiece={onMovePiece}
                    />
                })
            })}
        </div>
    )
}
