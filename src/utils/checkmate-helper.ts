import cloneDeep from 'clone-deep';

import { TileIndex } from '../components/Tile';
import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { getPossibleMoves } from './moves-logic-helper';

export interface CheckInfo {
    kingSide: 'WHITE' | 'BLACK',
    king: SelectedPiece | null,
    threateningPiece: SelectedPiece,
}

export interface CheckmateInfo {
    isChechmate: boolean,
    winner: 'WHITE' | 'BLACK'
}

interface PieceOnBoard {
    piece: ChessPieceType,
    tileIndex: TileIndex,
    possibleMoves: TileIndex[]
}

/**
 * this function will check if king able to move away
 * and if it is possible to defend king by other figure.
 * if not - it is a checkmate.
 * this function WILL NOT check if there is only check to the king. You have to use isCheck() for this instead
 * @param {ChessPieceType[][]}  chessboard - current chessboard
 * @param {SelectedPiece} king - king that has to be checked
 * @return {CheckmateInfo | null} information about if it is a checkmate or not
 */
export const isCheckmate = (chessboard: ChessPieceType[][], king: SelectedPiece): CheckmateInfo | null => {
    if (!king) return null;
    const kingMoves = getPossibleMoves(chessboard, king, king.piece.side);
    if(kingMoves.length > 0) return null; //if king able to move away - it is not a checkmate

    const opponentPiecesOnBoard: PieceOnBoard[] = [];
    let threateningOpponentPieces: PieceOnBoard[] = [];

    //get all opponent's pieces and their possible moves
    chessboard.forEach((chessboardRow, y) => chessboardRow.forEach((chessboardTile, x) => {

        if (chessboardTile.side !== king.piece.side &&
            chessboardTile.side !== 'NONE') {

            opponentPiecesOnBoard.push({
                piece: chessboardTile,
                tileIndex: { x, y },
                possibleMoves: getPossibleMoves(chessboard, { piece: chessboardTile, tileIndex: { x, y } })
            })

        }

    }))

    //get all threatening opponent pieces
    threateningOpponentPieces = opponentPiecesOnBoard.filter(opponentPieceData => {
        for (const possibleMove of opponentPieceData.possibleMoves) {
            if (possibleMove.x === king.tileIndex.x &&
                possibleMove.y === king.tileIndex.y) {
                return true;
            }
        }
        return false;
    })
    //if more than 2 pieces threatening to the king
    //and king cannot move
    //then it is a checkmate because you cannot block them simultaneously
    if (threateningOpponentPieces.length > 1) {
        return {
            isChechmate: true,
            winner: king.piece.side === 'WHITE' ? 'BLACK' : 'WHITE'
        }
    } else if (threateningOpponentPieces.length === 0) return null;
    const alliedFiguresPossibleMoves: TileIndex[] = [];
    //if only one piece - check if it is possible to beat it with other allied figure
    //we don't care what is this figure
    //only if it can beat or block threatening figure
    //therefore we only getting all possible moves of king's side figures
    for (let y = 0; y < chessboard.length; y++) {
        for (let x = 0; x < chessboard[y].length; x++) {
            if (chessboard[y][x].side === king.piece.side) {

                alliedFiguresPossibleMoves.push(...getPossibleMoves(chessboard, {
                    piece: chessboard[y][x],
                    tileIndex: { x, y }
                }, king.piece.side))

            }

        }

    }
    //we will get here only if only 1 piece is threatening to the king
    const [threateningPiece] = threateningOpponentPieces;
    console.log('------------------')
    const defendingMoves: TileIndex[] = getDefendKingMoves(king, threateningPiece, alliedFiguresPossibleMoves);
    console.log('def', alliedFiguresPossibleMoves)
    console.log(defendingMoves)
    //if impossible to defend king - it is a checkmate
    if(defendingMoves.length === 0) {
        return {
            isChechmate: true, 
            winner: king.piece.side === 'WHITE' ? 'BLACK' : 'WHITE'
        }
    }

    return null;
}

/**
 * this function only checks if there is a check to the king
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

                const checkInfo: CheckInfo = {
                    kingSide: playerSide,
                    king,
                    threateningPiece: currentPiece,
                }

                return checkInfo;
            }
        }
    }

    return null;

}

const getDefendKingMoves = (king: SelectedPiece, threateningPiece: PieceOnBoard, alliedFiguresPossibleMoves: TileIndex[]): TileIndex[] => {
    if (!king) return [];
    let defendingMoves: TileIndex[] = [];
    const kingPos = king.tileIndex;
    const threateningPos = threateningPiece.tileIndex;

    switch (threateningPiece.piece.type) {
        case 'PAWN':
        case 'KING':
            alert('getDefendKingMoves case PAWN case KING. If you see this message then bug occured.');
            defendingMoves.push(alliedFiguresPossibleMoves[0]); //for preventing breaking the game
            return defendingMoves;
        case 'KNIGHT':
            defendingMoves = alliedFiguresPossibleMoves.filter(move => move.x === threateningPiece.tileIndex.x && move.y === threateningPiece.tileIndex.y);
            return defendingMoves;
        case 'ROOK':

            if (threateningPos.x === kingPos.x) {

                for (let x_def = threateningPos.x; x_def !== kingPos.x; x_def += Math.sign(kingPos.x - threateningPos.x)) {
                    defendingMoves.push(...alliedFiguresPossibleMoves.filter(move => move.x === x_def));
                }

            } else if (threateningPos.y === kingPos.y) {

                for (let y_def = threateningPos.y; y_def !== kingPos.y; y_def += Math.sign(kingPos.y - threateningPos.y)) {
                    defendingMoves.push(...alliedFiguresPossibleMoves.filter(move => move.y === y_def));
                }

            }
            return defendingMoves;
        case 'BISHOP':
            //first we need to get a direction in which bishop should move to beat king
            const x_direction = Math.sign(kingPos.x - threateningPos.x); //-1: to the left, +1: to the right
            const y_direction = Math.sign(kingPos.y - threateningPos.y); //-1: up, +1: down
            const currentPoint = { x: threateningPos.x, y: threateningPos.y };

            while (currentPoint.x !== kingPos.x &&
                currentPoint.y !== kingPos.y) {
                defendingMoves.push(...alliedFiguresPossibleMoves.filter(move => move.y === currentPoint.y && move.x === currentPoint.x));
                currentPoint.x += x_direction;
                currentPoint.y += y_direction;
            }
            return defendingMoves;
        case 'QUEEN':
            //basically it is a combination of bishop and rook defending logic
            if (threateningPos.x === kingPos.x) {

                for (let x_def = threateningPos.x; x_def !== kingPos.x; x_def += Math.sign(kingPos.x - threateningPos.x)) {
                    defendingMoves.push(...alliedFiguresPossibleMoves.filter(move => move.x === x_def));
                }

            } else if (threateningPos.y === kingPos.y) {

                for (let y_def = threateningPos.y; y_def !== kingPos.y; y_def += Math.sign(kingPos.y - threateningPos.y)) {
                    defendingMoves.push(...alliedFiguresPossibleMoves.filter(move => move.y === y_def));
                }

            } else {
                //first we need to get a direction in which bishop should move to beat king
                const x_direction = Math.sign(kingPos.x - threateningPos.x); //-1: to the left, +1: to the right
                const y_direction = Math.sign(kingPos.y - threateningPos.y); //-1: up, +1: down
                const currentPoint = { x: threateningPos.x, y: threateningPos.y };

                while (currentPoint.x !== kingPos.x &&
                    currentPoint.y !== kingPos.y) {
                    defendingMoves.push(...alliedFiguresPossibleMoves.filter(move => move.y === currentPoint.y && move.x === currentPoint.x));
                    currentPoint.x += x_direction;
                    currentPoint.y += y_direction;
                }
            }
            return defendingMoves;
        default:
            return defendingMoves;
    }

}