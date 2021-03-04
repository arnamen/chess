import cloneDeep from 'clone-deep';

import { TileIndex } from '../components/Tile';
import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import {getPossibleMoves} from './moves-logic-helper';

export interface CheckInfo {
    kingSide: 'WHITE' | 'BLACK',
    king: SelectedPiece | null,
    threatingPiece: SelectedPiece,
}

export interface CheckmateInfo {
    isChechmate: boolean,
    winner: 'WHITE' | 'BLACK'
}

/**
 * this function will check all possible options for king to move away
 * or to defend king by other figure
 * if not - it is a checkmate
 * @param {ChessPieceType[][]}  chessboard - current chessboard
 * @param {SelectedPiece} king - king that has to be checked
 * @return {CheckmateInfo | null} information about if it is a checkmate or not
 */
export const isCheckmate = (chessboard: ChessPieceType[][], king: SelectedPiece): CheckmateInfo | null => {
    if(!king) return null;

    const canKingBeProtected = (chessboard: ChessPieceType[][], king: SelectedPiece) => {
        
    }

    let kingMoves = getPossibleMoves(chessboard, king);
    interface PieceOnBoard {
        piece: ChessPieceType,
        tileIndex: TileIndex,
        possibleMoves: TileIndex[]
    }

    const opponentPiecesOnBoard: PieceOnBoard[] = [];

    //get all opponent's pieces possible moves
    chessboard.forEach((chessboardRow, y) => chessboardRow.forEach((piece, x) => {

        if(piece.side !== king.piece.side && 
           piece.side !== 'NONE') {

            opponentPiecesOnBoard.push({
                piece, 
                tileIndex: {x, y}, 
                possibleMoves: getPossibleMoves(chessboard, {piece, tileIndex: {x, y}})
            })

        }

    }))

    //check if there are moves for king that are not blocked by opponent pieces
    kingMoves = kingMoves.filter(kingMove => {
        const threatingPieces = opponentPiecesOnBoard.filter(opponentPiece => {
            return opponentPiece.possibleMoves.find(possibleMove => possibleMove.x === kingMove.x && possibleMove.y === kingMove.y);
        })
        //if there are no threating pieces for the king 
        //on current possible move tileIndex
        if(threatingPieces.length === 0) return true;
        return false;
    })

    if(kingMoves.length === 0) {
        console.log('checkmate')
    }

    return null;
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
    //check if opponent's possible moves
    //overlap with king position
    const checkPossibleMovesThreat = (opponentPossMoves: TileIndex[], kingPos: TileIndex) => {
        for (const move of opponentPossMoves) {
            if (move.x === king?.tileIndex.x && move.y === king.tileIndex.y) return true;
        }
        return false;
    }

    //get all possible moves of all opponent figures
    //and check if there is a check for the king
    for (let y = 0; y < _chessboard.length; y++) {
        for (let x = 0; x < _chessboard[y].length; x++) {

            const currentPiece: SelectedPiece = { piece: Object.assign(_chessboard[y][x]), tileIndex: { x, y } };
            const opponentPiecePossibleMoves = getPossibleMoves(_chessboard, currentPiece);
            const checkToTheKing = checkPossibleMovesThreat(opponentPiecePossibleMoves, king.tileIndex);
            if (checkToTheKing) {

                // isCheckmate(chessboard, king);

                const checkInfo: CheckInfo = {
                    kingSide: playerSide,
                    king,
                    threatingPiece: currentPiece,
                }

                return checkInfo;
            }
        }
    }

    return null;

}