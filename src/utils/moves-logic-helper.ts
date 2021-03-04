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
export const getPossibleMoves = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece, currentPlayerTurn: 'WHITE' | 'BLACK' | null = null): TileIndex[] => {
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
    
    if(currentPlayerTurn && 
       selectedPiece.piece.side === currentPlayerTurn) {
        possibleMoves = validateMoves(chessboard, selectedPiece, possibleMoves, currentPlayerTurn);
    }

    return possibleMoves;
}

export const validateMoves = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece, moves: TileIndex[], currentPlayerTurn: 'WHITE' | 'BLACK' | null = null): TileIndex[] => {

    if(!selectedPiece) return [];

    switch (selectedPiece.piece.type) {
        case 'KING':
            return validateMoves_KING(chessboard, selectedPiece, moves, currentPlayerTurn);
    
        default:
            return moves;
    }
}

const validateMoves_KING = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece, moves: TileIndex[], currentPlayerTurn: 'WHITE' | 'BLACK' | null = null): TileIndex[] => {
    if(!selectedPiece) return [];
    interface PieceOnBoard {
        piece: ChessPieceType,
        tileIndex: TileIndex,
        possibleMoves: TileIndex[]
    }

    const opponentPiecesOnBoard: PieceOnBoard[] = [];

    //get all opponent's pieces possible moves
    chessboard.forEach((chessboardRow, y) => chessboardRow.forEach((piece, x) => {

        if(piece.side !== selectedPiece.piece.side && 
           piece.side !== 'NONE') {

            opponentPiecesOnBoard.push({
                piece, 
                tileIndex: {x, y}, 
                possibleMoves: getPossibleMoves(chessboard, {piece, tileIndex: {x, y}})
            })

        }

    }))

    //check if there are moves for selectedPiece that are not blocked by opponent pieces
    moves = moves.filter(kingMove => {
        const threatingPieces = opponentPiecesOnBoard.filter(opponentPiece => {
            return opponentPiece.possibleMoves.find(possibleMove => possibleMove.x === kingMove.x && possibleMove.y === kingMove.y);
        })
        //if there are no threating pieces for the selectedPiece 
        //on current possible move tileIndex
        if(threatingPieces.length === 0) return true;
        return false;
    })

    return moves;
}