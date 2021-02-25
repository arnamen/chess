import React from 'react';

import { ChessPieceType } from '../redux/reducers/chessboardReducer/types';

import { ReactComponent as b_bishop } from '../assets/pieces/b_bishop.svg';
import { ReactComponent as b_king } from '../assets/pieces/b_king.svg';
import { ReactComponent as b_knight } from '../assets/pieces/b_knight.svg';
import { ReactComponent as b_pawn } from '../assets/pieces/b_pawn.svg';
import { ReactComponent as b_queen } from '../assets/pieces/b_queen.svg';
import { ReactComponent as b_rook } from '../assets/pieces/b_rook.svg';
import { ReactComponent as w_bishop } from '../assets/pieces/w_bishop.svg';
import { ReactComponent as w_king } from '../assets/pieces/w_king.svg';
import { ReactComponent as w_knight } from '../assets/pieces/w_knight.svg';
import { ReactComponent as w_pawn } from '../assets/pieces/w_pawn.svg';
import { ReactComponent as w_queen } from '../assets/pieces/w_queen.svg';
import { ReactComponent as w_rook } from '../assets/pieces/w_rook.svg';

export const importedAssets = {
    b_bishop, b_king, b_knight, b_pawn, b_rook, b_queen, w_bishop, w_king, w_knight, w_pawn, w_queen, w_rook
}

export const getPieceElementByType = (pieceType: ChessPieceType) => {
    switch (pieceType.side) {
        case 'WHITE':
            switch (pieceType.type) {
                case 'BISHOP':
                    return w_bishop;
                case 'KING':
                    return w_king;
                case 'KNIGHT':
                    return w_knight;
                case 'PAWN':
                    return w_pawn;
                case 'QUEEN':
                    return w_queen;
                case 'ROOK':
                    return w_rook;
                default:
                    break;
            }
            break;
        case 'BLACK':
            switch (pieceType.type) {
                case 'BISHOP':
                    return b_bishop;
                case 'KING':
                    return b_king;
                case 'KNIGHT':
                    return b_knight;
                case 'PAWN':
                    return b_pawn;
                case 'QUEEN':
                    return b_queen;
                case 'ROOK':
                    return b_rook;
                default:
                    break;
            }
        break;
        default: break;
    }
}