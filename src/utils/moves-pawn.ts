import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

export const getPossibleMoves_PAWN = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if (!selectedPiece || selectedPiece.piece.type !== 'PAWN') return [];

    const possibleMoves: TileIndex[] = [];
    const pieceXpos = selectedPiece.tileIndex.x;
    const pieceYpos = selectedPiece.tileIndex.y;
    switch (selectedPiece.piece.side) {
        case 'WHITE':

            if (chessboard[pieceYpos - 1][pieceXpos] && chessboard[pieceYpos - 1][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos - 1 });

            if (selectedPiece.piece.isFirstMove &&
                chessboard[pieceYpos - 2][pieceXpos] &&
                chessboard[pieceYpos - 2][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos - 2 });
            //attack check
            if (chessboard[pieceYpos - 1][pieceXpos - 1] &&
                chessboard[pieceYpos - 1][pieceXpos - 1].type !== 'EMPTY' &&
                chessboard[pieceYpos - 1][pieceXpos - 1].side !== 'WHITE')
                possibleMoves.push({ x: pieceXpos - 1, y: pieceYpos - 1 });

            if (chessboard[pieceYpos - 1][pieceXpos + 1] &&
                chessboard[pieceYpos - 1][pieceXpos + 1].type !== 'EMPTY' &&
                chessboard[pieceYpos - 1][pieceXpos + 1].side !== 'WHITE')
                possibleMoves.push({ x: pieceXpos + 1, y: pieceYpos - 1 });
            break;

        case 'BLACK':

            if (chessboard[pieceYpos + 1][pieceXpos] && chessboard[pieceYpos + 1][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos + 1 });

            if (selectedPiece.piece.isFirstMove &&
                chessboard[pieceYpos + 2][pieceXpos] &&
                chessboard[pieceYpos + 2][pieceXpos].type === 'EMPTY')
                possibleMoves.push({ x: pieceXpos, y: pieceYpos + 2 });
            //attack check
            if (chessboard[pieceYpos + 1][pieceXpos - 1] &&
                chessboard[pieceYpos + 1][pieceXpos - 1].type !== 'EMPTY' &&
                chessboard[pieceYpos + 1][pieceXpos - 1].side !== 'BLACK')
                possibleMoves.push({ x: pieceXpos - 1, y: pieceYpos + 1 });

            if (chessboard[pieceYpos + 1][pieceXpos + 1] &&
                chessboard[pieceYpos + 1][pieceXpos + 1].type !== 'EMPTY' &&
                chessboard[pieceYpos + 1][pieceXpos + 1].side !== 'BLACK')
                possibleMoves.push({ x: pieceXpos + 1, y: pieceYpos + 1 });
            break;
        default:
            break;
    }
    return possibleMoves;
}