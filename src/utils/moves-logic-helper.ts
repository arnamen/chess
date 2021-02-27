import { ChessPieceType, SelectedPiece} from '../redux/reducers/chessboardReducer/types';
import {TileIndex} from '../components/Tile';

export interface CheckInfo {
    kingSide: 'WHITE' | 'BLACK',
    king: SelectedPiece | null,
    threatingPiece: SelectedPiece
}
//will be verified if there check for king of corresponding side
export const isCheck = (chessboard:ChessPieceType[][], playerSide: 'WHITE' | 'BLACK'): CheckInfo | null => {
    //find king position on board
    let king: SelectedPiece | null = null;
    //function wrapper for breaking from nested loop
    king = (():SelectedPiece => {
        for (let y = 0; y < chessboard.length; y++) {
            for (let x = 0; x < chessboard[y].length; x++) {
                const currentPiece:SelectedPiece = {piece: Object.assign(chessboard[y][x]), tileIndex: {x,y}};
                if(currentPiece.piece.side === playerSide && currentPiece.piece.type === 'KING') return Object.assign({}, currentPiece);
            }
        }
        return null;
    })()
    if(!king) throw new Error(`${playerSide} king is not on board`);

    const checkPossibleMovesThreat = (opponentPossMoves: TileIndex[], kingPos: TileIndex) => {
        for (const move of opponentPossMoves) {
            if(move.x === king?.tileIndex.x && move.y === king.tileIndex.y) return true; 
        }
        return false;
    }

    //get all possible moves of each opponent figure
    // and check if there is a check for the king
    for (let y = 0; y < chessboard.length; y++) {
        for (let x = 0; x < chessboard[y].length; x++) {
            
            const currentPiece:SelectedPiece = {piece: Object.assign(chessboard[y][x]), tileIndex: {x,y}};
            const opponentPiecePossibleMoves = getPossibleMoves(chessboard, currentPiece);

            if(checkPossibleMovesThreat(opponentPiecePossibleMoves, king.tileIndex)) {
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

export const getPossibleMoves = (chessboard:ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if(!selectedPiece) return [];
    let possibleMoves: TileIndex[] = [];
    switch (selectedPiece?.piece.type) {
        case 'PAWN':
            possibleMoves = getPossibleMoves_PAWN(chessboard, selectedPiece);
            break;
    
        default:
            break;
    }
    return possibleMoves;
}

const getPossibleMoves_PAWN = (chessboard:ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    if(!selectedPiece || selectedPiece.piece.type !== 'PAWN') return [];

    const possibleMoves: TileIndex[] = [];
    const pieceXpos = selectedPiece.tileIndex.x;
    const pieceYpos = selectedPiece.tileIndex.y;
    switch (selectedPiece.piece.side) {
        case 'WHITE':

            if(chessboard[pieceYpos - 1][pieceXpos] && chessboard[pieceYpos - 1][pieceXpos].type === 'EMPTY') 
            possibleMoves.push({x: pieceXpos, y: pieceYpos - 1});

            if( selectedPiece.piece.isFirstMove && 
                chessboard[pieceYpos - 2][pieceXpos] && 
                chessboard[pieceYpos - 2][pieceXpos].type === 'EMPTY') 
            possibleMoves.push({x: pieceXpos, y: pieceYpos - 2});
            //attack check
            if(chessboard[pieceYpos - 1][pieceXpos - 1] && 
                chessboard[pieceYpos - 1][pieceXpos - 1].type !== 'EMPTY'&& 
                chessboard[pieceYpos - 1][pieceXpos - 1].side !== 'WHITE') 
            possibleMoves.push({x: pieceXpos - 1, y: pieceYpos - 1});

            if(chessboard[pieceYpos - 1][pieceXpos + 1] && 
                chessboard[pieceYpos - 1][pieceXpos + 1].type !== 'EMPTY' && 
                chessboard[pieceYpos - 1][pieceXpos + 1].side !== 'WHITE') 
            possibleMoves.push({x: pieceXpos + 1, y: pieceYpos - 1});
            break;
            
        case 'BLACK':

            if(chessboard[pieceYpos + 1][pieceXpos] && chessboard[pieceYpos + 1][pieceXpos].type === 'EMPTY') 
            possibleMoves.push({x: pieceXpos, y: pieceYpos + 1});

            if( selectedPiece.piece.isFirstMove && 
                chessboard[pieceYpos + 2][pieceXpos] && 
                chessboard[pieceYpos + 2][pieceXpos].type === 'EMPTY') 
            possibleMoves.push({x: pieceXpos, y: pieceYpos + 2});
            //attack check
            if(chessboard[pieceYpos + 1][pieceXpos - 1] && 
                chessboard[pieceYpos + 1][pieceXpos - 1].type !== 'EMPTY' && 
                chessboard[pieceYpos + 1][pieceXpos - 1].side !== 'BLACK') 
            possibleMoves.push({x: pieceXpos - 1, y: pieceYpos + 1});

            if(chessboard[pieceYpos + 1][pieceXpos + 1] && 
                chessboard[pieceYpos + 1][pieceXpos + 1].type !== 'EMPTY' && 
                chessboard[pieceYpos + 1][pieceXpos + 1].side !== 'BLACK') 
            possibleMoves.push({x: pieceXpos + 1, y: pieceYpos + 1});
            break;
        default:
            break;
    }
    return possibleMoves;
}


