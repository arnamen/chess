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
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: 10,
    side: 'WHITE',
  },
  ROOK:{
    type: 'ROOK',
    points: 10,
    side: 'WHITE',
  },
  QUEEN:{
    type: 'QUEEN',
    points: 100,
    side: 'WHITE',
  },
  KING:{
    type: 'KING',
    points: 1000,
    side: 'WHITE',
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
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
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: -10,
    side: 'BLACK',
  },
  ROOK:{
    type: 'ROOK',
    points: -10,
    side: 'BLACK',
  },
  QUEEN:{
    type: 'QUEEN',
    points: -100,
    side: 'BLACK',
  },
  KING:{
    type: 'KING',
    points: -1000,
    side: 'BLACK',
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
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
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: 10,
    side: 'WHITE',
  },
  ROOK:{
    type: 'ROOK',
    points: 10,
    side: 'WHITE',
  },
  QUEEN:{
    type: 'QUEEN',
    points: 100,
    side: 'WHITE',
  },
  KING:{
    type: 'KING',
    points: 1000,
    side: 'WHITE',
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
  },
} as const;

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
  },
  KNIGHT:{
    type: 'KNIGHT',
    points: -10,
    side: 'BLACK',
  },
  ROOK:{
    type: 'ROOK',
    points: -10,
    side: 'BLACK',
  },
  QUEEN:{
    type: 'QUEEN',
    points: -100,
    side: 'BLACK',
  },
  KING:{
    type: 'KING',
    points: -1000,
    side: 'BLACK',
  },
  EMPTY:{
    type: 'EMPTY',
    points: 0,
    side: 'NONE',
  },
} as const;

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

export const updateChessboardOneTile = (tileIndex: number, newTileValue: ChessPieceType) => {
  return typedAction('chessboard/updateOneTile', { tileIndex, newTileValue });
}

export const createChessboard = () => {
  return typedAction('chessboard/create');
}

export type actionTypes = ReturnType<typeof updateChessboard | typeof updateChessboardOneTile | typeof createChessboard>;