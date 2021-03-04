import React, { ReactElement } from 'react'

import Tile, { TileIndex } from '../Tile';
import ChessboardBorderTop from './ChessboardBorderTop';
import ChessboardBorderBottom from './ChessboardBorderBottom';
import ChessboardBorderLeft from './ChessboardBorderLeft';
import ChessboardBorderRight from './ChessboardBorderRight';
import ChessboardCorner from './ChessboardCorner';
import ChessboardBorderTile from './ChessboardBorderTile';

import { ChessPieceType, SelectedPiece } from '../../redux/reducers/chessboardReducer/types';

import { CheckInfo } from '../../utils/checkmate-helper';

import classes from './Chessboard.module.css';


interface Props {
    chessboardData: ChessPieceType[][],
    currentPlayerTurn: 'WHITE' | 'BLACK',
    highlightedTiles?: TileIndex[],
    selectedPiece?: SelectedPiece,
    onSelectPiece: (selectedPiece: SelectedPiece) => void,
    onMovePiece: (tileIndex: TileIndex) => void,
    checkInfo: CheckInfo | null

}

export default function Chessboard({ chessboardData, currentPlayerTurn, onSelectPiece, highlightedTiles, selectedPiece, onMovePiece, checkInfo }: Props): ReactElement {

    const borderLeft: any[] = [];
    const borderRight: any[] = [];
    const borderTop: any[] = [];
    const borderBottom: any[] = [];
    const letters = 'abcdefgh';
    for (let i = 0; i < 8; i++) {
        borderLeft.push(<ChessboardBorderTile width={1} key={i}><span>{i}</span></ChessboardBorderTile>);
        borderRight.push(<ChessboardBorderTile width={1} key={i}/>);
        borderTop.push(<ChessboardBorderTile height={1} key={i} />);
        borderBottom.push(<ChessboardBorderTile height={1} key={i}><span>{letters.substr(i, 1)}</span></ChessboardBorderTile>);
    }

    return (
        <div className={classes.Chessboard}>

            <ChessboardBorderTop>{borderTop}</ChessboardBorderTop>
            <ChessboardBorderBottom>{borderLeft}</ChessboardBorderBottom>
            <ChessboardBorderLeft>{borderRight}</ChessboardBorderLeft>
            <ChessboardBorderRight>{borderBottom}</ChessboardBorderRight>
            <ChessboardCorner topLeft/>
            <ChessboardCorner topRight/>
            <ChessboardCorner bottomLeft/>
            <ChessboardCorner bottomRight/>
            {chessboardData.map((chessboardLine, y) => {

                return chessboardLine.map((piece, x) => {

                    return <Tile
                        tileIndex={{ x, y }}
                        chessPieceType={piece}
                        isActive={currentPlayerTurn === piece.side}
                        isHighlighted={!!highlightedTiles?.find(highlightedTile => highlightedTile.x === x && highlightedTile.y === y)}
                        isSelected={selectedPiece?.tileIndex.x === x && selectedPiece.tileIndex.y === y}
                        isImportant={checkInfo?.king?.tileIndex.y === y && checkInfo?.king?.tileIndex.x === x}
                        isDanger={checkInfo?.threatingPiece?.tileIndex.y === y && checkInfo?.threatingPiece?.tileIndex.x === x}
                        onSelectPiece={onSelectPiece}
                        onMovePiece={onMovePiece}
                        key={`${y * 8 + x}_${piece.side}_${piece.type}`}
                    />
                })
            })}
        </div>
    )
}
