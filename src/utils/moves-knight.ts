import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

export const getPossibleMoves_KNIGHT = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {

    if (!selectedPiece || selectedPiece.piece.type !== 'KNIGHT') return [];

    const possibleMoves: TileIndex[] = [];
    const { x, y } = selectedPiece.tileIndex;
    //up
    if (chessboard[y - 2] &&
        chessboard[y - 2][x - 1] &&
        chessboard[y - 2][x - 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 2, x: x - 1 });
    }

    if (chessboard[y - 2] &&
        chessboard[y - 2][x + 1] &&
        chessboard[y - 2][x + 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 2, x: x + 1 });
    }
    //down
    if (chessboard[y + 2] &&
        chessboard[y + 2][x - 1] &&
        chessboard[y + 2][x - 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 2, x: x - 1 });
    }

    if (chessboard[y + 2] &&
        chessboard[y + 2][x + 1] &&
        chessboard[y + 2][x + 1].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 2, x: x + 1 });
    }
    //left
    if (chessboard[y + 1] &&
        chessboard[y + 1][x - 2] &&
        chessboard[y + 1][x - 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 1, x: x - 2 });
    }

    if (chessboard[y - 1] &&
        chessboard[y - 1][x - 2] &&
        chessboard[y - 1][x - 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 1, x: x - 2 });
    }
    //right
    if (chessboard[y + 1] &&
        chessboard[y + 1][x + 2] &&
        chessboard[y + 1][x + 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y + 1, x: x + 2 });
    }

    if (chessboard[y - 1] &&
        chessboard[y - 1][x + 2] &&
        chessboard[y - 1][x + 2].side !== selectedPiece.piece.side) {
        possibleMoves.push({ y: y - 1, x: x + 2 });
    }

    return possibleMoves;
}