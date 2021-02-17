export type Point = {x: number, y: number}

export interface Move {
    oldPos: Point,
    newPos: Point
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

export type actionTypes = ReturnType<typeof addMoveToLog | typeof RemoveMoveFromLog>;