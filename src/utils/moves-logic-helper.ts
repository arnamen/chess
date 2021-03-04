import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

import {getPossibleMoves_ROOK} from './moves-rook';
import {getPossibleMoves_BISHOP} from './moves-bishop';
import {getPossibleMoves_PAWN} from './moves-pawn';
import {getPossibleMoves_KING} from './moves-king';
import {getPossibleMoves_QUEEN} from './moves-queen';
import {getPossibleMoves_KNIGHT} from './moves-knight';

/**
 * @param {ChessPieceType[][]}  chessboard - current chessboard
 * @param {SelectedPiece} selectedPiece - peice which player want to move
 * @return {TileIndex[]} array of possible moves for selected piece
 */
export const getPossibleMoves = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if (!selectedPiece) return [];
    let possibleMoves: TileIndex[] = [];
    switch (selectedPiece?.piece.type) {
        case 'PAWN':
            possibleMoves = getPossibleMoves_PAWN(chessboard, selectedPiece);
            break;
        case 'BISHOP':
            possibleMoves = getPossibleMoves_BISHOP(chessboard, selectedPiece);
            break;
        case 'KNIGHT':
            possibleMoves = getPossibleMoves_KNIGHT(chessboard, selectedPiece);
            break;
        case 'ROOK':
            possibleMoves = getPossibleMoves_ROOK(chessboard, selectedPiece);
            break;
        case 'QUEEN':
            possibleMoves = getPossibleMoves_QUEEN(chessboard, selectedPiece);
            break;
        case 'KING':
            possibleMoves = getPossibleMoves_KING(chessboard, selectedPiece);
            break;
        default:
            break;
    }
    return possibleMoves;
}