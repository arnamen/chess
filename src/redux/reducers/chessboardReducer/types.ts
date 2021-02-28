import {TileIndex} from '../../../components/Tile';

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

interface WHITE_interface {
  PAWN:{
    type: 'PAWN',
    points: 1,
    side: 'WHITE',
    isFirstMove: boolean
  },
  BISHOP:{
    type: 'BISHOP',
    points: 10,
    side: 'WHITE',
    isFirstMove: boolean
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: 10,
    side: 'WHITE',
    isFirstMove: boolean
  },
  ROOK:{
    type: 'ROOK',
    points: 10,
    side: 'WHITE',
    isFirstMove: boolean
  },
  QUEEN:{
    type: 'QUEEN',
    points: 100,
    side: 'WHITE',
    isFirstMove: boolean
  },
  KING:{
    type: 'KING',
    points: 1000,
    side: 'WHITE',
    isFirstMove: boolean
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
    isFirstMove: boolean
  },
};

interface BLACK_interface {
  PAWN:{
    type: 'PAWN',
    points: -1,
    side: 'BLACK',
    isFirstMove: boolean
  },
  BISHOP:{
    type: 'BISHOP',
    points: -10,
    side: 'BLACK',
    isFirstMove: boolean
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: -10,
    side: 'BLACK',
    isFirstMove: boolean
  },
  ROOK:{
    type: 'ROOK',
    points: -10,
    side: 'BLACK',
    isFirstMove: boolean
  },
  QUEEN:{
    type: 'QUEEN',
    points: -100,
    side: 'BLACK',
    isFirstMove: boolean
  },
  KING:{
    type: 'KING',
    points: -1000,
    side: 'BLACK',
    isFirstMove: boolean
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
    isFirstMove: boolean
  },
};

export const WHITE: WHITE_interface = {
  PAWN:{
    type: 'PAWN',
    points: 1,
    side: 'WHITE',
    isFirstMove: true
  },
  BISHOP:{
    type: 'BISHOP',
    points: 10,
    side: 'WHITE',
    isFirstMove: true
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: 10,
    side: 'WHITE',
    isFirstMove: true
  },
  ROOK:{
    type: 'ROOK',
    points: 10,
    side: 'WHITE',
    isFirstMove: true
  },
  QUEEN:{
    type: 'QUEEN',
    points: 100,
    side: 'WHITE',
    isFirstMove: true
  },
  KING:{
    type: 'KING',
    points: 1000,
    side: 'WHITE',
    isFirstMove: true
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
    isFirstMove: true
  },
};

export const BLACK: BLACK_interface = {
  PAWN:{
    type: 'PAWN',
    points: -1,
    side: 'BLACK',
    isFirstMove: true
  },
  BISHOP:{
    type: 'BISHOP',
    points: -10,
    side: 'BLACK',
    isFirstMove: true
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: -10,
    side: 'BLACK',
    isFirstMove: true
  },
  ROOK:{
    type: 'ROOK',
    points: -10,
    side: 'BLACK',
    isFirstMove: true
  },
  QUEEN:{
    type: 'QUEEN',
    points: -100,
    side: 'BLACK',
    isFirstMove: true
    
  },
  KING:{
    type: 'KING',
    points: -1000,
    side: 'BLACK',
    isFirstMove: true
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
    isFirstMove: true
  },
};

type ValueOf<T> = T[keyof T];
export type ChessPieceType = ValueOf<typeof WHITE> | ValueOf<typeof BLACK>;

export type SelectedPiece = {
    piece: ChessPieceType,
    tileIndex: {x: number, y: number}
} | null


export interface StateInterface {
  chessboard: ChessPieceType[][] | null,
}

export const updateChessboard = (newChessboard: ChessPieceType[][]) => {
  return typedAction('chessboard/update', { chessboard: newChessboard });
}

export const updateChessboardOneTile = (tileIndex: TileIndex, newTileValue: ChessPieceType) => {
  return typedAction('chessboard/updateOneTile', { tileIndex, newTileValue });
}

export const chessboardMakeMove = (tileFrom: TileIndex, tileTo: TileIndex) => {
  return typedAction('chessboard/makeMove', { tileFrom, tileTo });
}

export const createChessboard = () => {
  return typedAction('chessboard/create');
}

export type actionTypes = ReturnType<typeof updateChessboard | 
                                     typeof updateChessboardOneTile | 
                                     typeof createChessboard | 
                                     typeof chessboardMakeMove>;