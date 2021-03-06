import React, { ReactElement, useState, useEffect } from 'react'

import Tile, { TileIndex } from '../Tile';
import ChessboardBorderTop from './ChessboardBorderTop';
import ChessboardBorderBottom from './ChessboardBorderBottom';
import ChessboardBorderLeft from './ChessboardBorderLeft';
import ChessboardBorderRight from './ChessboardBorderRight';
import ChessboardCorner from './ChessboardCorner';
import ChessboardBorderTile from './ChessboardBorderTile';
import ChessboardModal from './ChessboardModal';
import ChessboardMessage from './ChessboardMessage';

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
    onClearMessage:() => void,
    checkInfo: CheckInfo | null,
    message?: string,
    children?: React.ReactNode

}

export default function Chessboard({ chessboardData, currentPlayerTurn, onSelectPiece, highlightedTiles, selectedPiece, onMovePiece, checkInfo, children, message, onClearMessage }: Props): ReactElement {

    const [showMessage, setShowMessage] = useState(false);
    const [messageClasses, setMessageClasses] = useState<string[]>([]);

    useEffect(() => {
        setMessageClasses(['slidein'])
        setShowMessage(!!message);
    }, [message]);

    const hideMessage = () => {
        setMessageClasses(['slideout'])
        setTimeout(function () {
            onClearMessage();
            setShowMessage(false);
        }, 490);
    }

    const borderLeft: any[] = [];
    const borderRight: any[] = [];
    const borderTop: any[] = [];
    const borderBottom: any[] = [];
    const letters = 'abcdefgh';
    for (let i = 0; i < 8; i++) {
        borderLeft.push(<ChessboardBorderTile width={1} key={i}><span>{i}</span></ChessboardBorderTile>);
        borderRight.push(<ChessboardBorderTile width={1} key={i} />);
        borderTop.push(<ChessboardBorderTile height={1} key={i} />);
        borderBottom.push(<ChessboardBorderTile height={1} key={i}><span>{letters.substr(i, 1)}</span></ChessboardBorderTile>);
    }

    return (
        <div className={classes.Chessboard}>

            {chessboardData.map((chessboardLine, y) => {

                return chessboardLine.map((piece, x) => {

                    return <Tile
                        tileIndex={{ x, y }}
                        chessPieceType={piece}
                        isActive={currentPlayerTurn === piece.side}
                        isHighlighted={!!highlightedTiles?.find(highlightedTile => highlightedTile.x === x && highlightedTile.y === y)}
                        isSelected={selectedPiece?.tileIndex.x === x && selectedPiece.tileIndex.y === y}
                        isImportant={checkInfo?.king?.tileIndex.y === y && checkInfo?.king?.tileIndex.x === x}
                        isDanger={checkInfo?.threateningPiece?.tileIndex.y === y && checkInfo?.threateningPiece?.tileIndex.x === x}
                        onSelectPiece={onSelectPiece}
                        onMovePiece={onMovePiece}
                        key={`${y * 8 + x}_${piece.side}_${piece.type}`}
                    />
                })
            })}
            <ChessboardModal>
                {showMessage && <ChessboardMessage message={message} 
                className={messageClasses}
                onClose={() => hideMessage()}/>}
                {children}
                </ChessboardModal>
            <ChessboardBorderTop>{borderTop}</ChessboardBorderTop>
            <ChessboardBorderBottom>{borderLeft}</ChessboardBorderBottom>
            <ChessboardBorderLeft>{borderRight}</ChessboardBorderLeft>
            <ChessboardBorderRight>{borderBottom}</ChessboardBorderRight>
            <ChessboardCorner topLeft />
            <ChessboardCorner topRight />
            <ChessboardCorner bottomLeft />
            <ChessboardCorner bottomRight />
        </div>
    )
}
