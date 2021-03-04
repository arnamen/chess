import cloneDeep from 'clone-deep';

import { TileIndex } from '../components/Tile';
import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import {getPossibleMoves} from './moves-logic-helper';

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