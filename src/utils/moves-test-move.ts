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

    _chessboard[tileTo.y][tileTo.x] = _chessboard[tileFrom.y][tileFrom.x];
    if (_chessboard[tileTo.y][tileTo.x].isFirstMove)
        _chessboard[tileTo.y][tileTo.x].isFirstMove = false;

    _chessboard[tileFrom.y][tileFrom.x] = _chessboard[tileFrom.y][tileFrom.x].side === 'WHITE' ? WHITE.EMPTY : BLACK.EMPTY;

    return _chessboard;
}