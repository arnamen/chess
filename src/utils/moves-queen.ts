import { ChessPieceType, SelectedPiece } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

import {getPossibleMoves_ROOK} from './moves-rook';
import {getPossibleMoves_BISHOP} from './moves-bishop';

export const getPossibleMoves_QUEEN = (chessboard: ChessPieceType[][], selectedPiece: SelectedPiece): TileIndex[] => {
    const possibleMoves: TileIndex[] = [];
    //since queen has the same moves as rook and bishop combined
    //we can just merge their moves
    possibleMoves.push(...getPossibleMoves_ROOK(chessboard, selectedPiece));
    possibleMoves.push(...getPossibleMoves_BISHOP(chessboard, selectedPiece));

    return possibleMoves;
}