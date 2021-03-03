import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

import {getPossibleMoves_ROOK} from './moves-rook';
import {getPossibleMoves_BISHOP} from './moves-bishop';
import {getPossibleMoves_PAWN} from './moves-pawn';
import {getPossibleMoves_KING} from './moves-king';
import {getPossibleMoves_QUEEN} from './moves-queen';
import {getPossibleMoves_KNIGHT} from './moves-knight';
import cloneDeep from 'clone-deep';
export interface CheckInfo {
    kingSide: 'WHITE' | 'BLACK',
    king: SelectedPiece | null,
    threatingPiece: SelectedPiece
}
/**
 * @param {ChessPieceType[][]}  chessboard - current chessboard
 * @param {'WHITE' | 'BLACK'} playerSide - current player turn (will be checked if there is a check to current player's king)
 * @return {CheckInfo | null} information about what figure causes check or null
 */
export const isCheck = (chessboard: ChessPieceType[][], playerSide: 'WHITE' | 'BLACK'): CheckInfo | null => {
    const _chessboard = cloneDeep(chessboard);
    //find king position on board
    let king: SelectedPiece | null = null;
    //function wrapper for breaking from nested loop
    king = ((): SelectedPiece => {
        for (let y = 0; y < _chessboard.length; y++) {
            for (let x = 0; x < _chessboard[y].length; x++) {
                const currentPiece: SelectedPiece = { piece: Object.assign(_chessboard[y][x]), tileIndex: { x, y } };
                if (currentPiece.piece.side === playerSide && currentPiece.piece.type === 'KING') return Object.assign({}, currentPiece);
            }
        }
        return null;
    })()
    if (!king) throw new Error(`${playerSide} king is not on board`);

    const checkPossibleMovesThreat = (opponentPossMoves: TileIndex[], kingPos: TileIndex) => {
        for (const move of opponentPossMoves) {
            if (move.x === king?.tileIndex.x && move.y === king.tileIndex.y) return true;
        }
        return false;
    }

    //get all possible moves of each opponent figure
    // and check if there is a check for the king
    for (let y = 0; y < _chessboard.length; y++) {
        for (let x = 0; x < _chessboard[y].length; x++) {

            const currentPiece: SelectedPiece = { piece: Object.assign(_chessboard[y][x]), tileIndex: { x, y } };
            const opponentPiecePossibleMoves = getPossibleMoves(_chessboard, currentPiece);

            if (checkPossibleMovesThreat(opponentPiecePossibleMoves, king.tileIndex)) {
                const checkInfo: CheckInfo = {
                    kingSide: playerSide,
                    king,
                    threatingPiece: currentPiece
                }
                return checkInfo;
            }
        }
    }

    return null;

}

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