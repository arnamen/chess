import {ChessPieceType} from '../chessboardReducer/types';

export type Point = {x: number, y: number}

export interface Move {
    gameStart: boolean,
    gameEnd: boolean,
    oldPos: Point,
    newPos: Point,
    chessboard: ChessPieceType[][],
    currentPlayer: 'WHITE' | 'BLACK'
}

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

export interface StateInterface {
    movesLog: Move[],
}



export const addMoveToLog = (move: Move) => {
  return typedAction('movesLog/add', {move});
}

export const RemoveMoveFromLog = (moveIndex?: number) => {
  return typedAction('movesLog/remove', {moveIndex});
}
export const updateMoveInLog = (moveIndex: number, updatedMove: Move) => {
  return typedAction('movesLog/update', {moveIndex, updatedMove});
}


export type actionTypes = ReturnType<typeof addMoveToLog | typeof RemoveMoveFromLog | typeof updateMoveInLog>;