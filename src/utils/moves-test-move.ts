import cloneDeep from 'clone-deep';

import { ChessPieceType, WHITE, BLACK } from '../redux/reducers/chessboardReducer/types';
import { TileIndex } from '../components/Tile';

/**
 * this function allows to test move without changing state of current chessboard
 * @param {ChessPieceType[][]}  chessboard - current chessboard
 * @param {TileIndex} tileFrom - the tile player moves piece from
 * @param {TileIndex} tileTo - the tile player moves piece on
 * @return {ChessPieceType[][]} temporary chessboard with commited move
 */
export const makeTempMove = (chessboard: ChessPieceType[][], tileFrom: TileIndex, tileTo: TileIndex) => {
    let _chessboard = cloneDeep(chessboard);

    if(chessboard[tileFrom.y][tileFrom.x].side === chessboard[tileTo.y][tileTo.x].side &&
        (chessboard[tileFrom.y][tileFrom.x].type === 'KING' || chessboard[tileFrom.y][tileFrom.x].type === 'ROOK') &&
        (chessboard[tileTo.y][tileTo.x].type === 'KING' || chessboard[tileTo.y][tileTo.x].type === 'ROOK') &&
        chessboard[tileFrom.y][tileFrom.x].type !== chessboard[tileTo.y][tileTo.x].type){
           return chessboardMakeCastling(chessboard, tileFrom, tileTo);
   }

    _chessboard[tileTo.y][tileTo.x] = _chessboard[tileFrom.y][tileFrom.x];
    if (_chessboard[tileTo.y][tileTo.x].isFirstMove)
        _chessboard[tileTo.y][tileTo.x].isFirstMove = false;

    _chessboard[tileFrom.y][tileFrom.x] = _chessboard[tileFrom.y][tileFrom.x].side === 'WHITE' ? WHITE.EMPTY : BLACK.EMPTY;

    return _chessboard;
}

const chessboardMakeCastling = (chessboard: ChessPieceType[][], tileFrom: TileIndex, tileTo: TileIndex) => {

    if(chessboard){

    const king = chessboard[tileFrom.y][tileFrom.x].type === 'KING' ? tileFrom : tileTo;
    const rook = chessboard[tileFrom.y][tileFrom.x].type === 'ROOK' ? tileFrom : tileTo;
    //determine whether king to the left or to the right from rook
    const direction = Math.sign(-king.x + rook.x); //1 - king on the right side, "-1" - king on the left side
        //make castling
        chessboard[king.y][king.x + direction*2] = cloneDeep(chessboard[king.y][king.x]);
        chessboard[king.y][king.x + direction*2].isFirstMove = false;
        chessboard[king.y][king.x] = WHITE.EMPTY;
        //
        chessboard[king.y][king.x + direction] = cloneDeep(chessboard[rook.y][rook.x]);
        chessboard[king.y][king.x + direction].isFirstMove = false;
        chessboard[rook.y][rook.x] = WHITE.EMPTY;

        return chessboard;

    }

    return chessboard;
}