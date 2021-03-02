import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

export const getPossibleMoves_KING = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {

    if (!selectedPiece || selectedPiece.piece.type !== 'KING') return [];

    const possibleMoves: TileIndex[] = [];
    const { x, y } = selectedPiece.tileIndex;

    if (chessboard[y - 1] &&
        chessboard[y - 1][x].side !== selectedPiece.piece.side)
        possibleMoves.push({ x, y: y - 1 })

    if (chessboard[y - 1] &&
        chessboard[y - 1][x - 1] &&
        chessboard[y - 1][x - 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x - 1, y: y - 1 })

    if (chessboard[y + 1] &&
        chessboard[y + 1][x - 1] &&
        chessboard[y + 1][x - 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x - 1, y: y + 1 })

    if (chessboard[y + 1] &&
        chessboard[y + 1][x].side !== selectedPiece.piece.side)
        possibleMoves.push({ x, y: y + 1 })

    if (chessboard[y + 1] &&
        chessboard[y + 1][x + 1] &&
        chessboard[y + 1][x + 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x + 1, y: y + 1 })

    if (chessboard[y][x + 1] &&
        chessboard[y][x + 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x + 1, y })

    if (chessboard[y][x - 1] &&
        chessboard[y][x - 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x - 1, y })

    if (chessboard[y - 1] &&
        chessboard[y - 1][x + 1] &&
        chessboard[y - 1][x + 1].side !== selectedPiece.piece.side)
        possibleMoves.push({ x: x + 1, y: y - 1 })

    return possibleMoves;

}