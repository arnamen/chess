export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

export interface StateInterface {
    chessboard: number[][],
}

export const updateChessboard = (newChessboard: number[][]) => {
  return typedAction('chessboard/update', {chessboard: newChessboard});
}

export const updateChessboardOneTile = (tileIndex: number, newTileValue: number) => {
  return typedAction('chessboard/updateOneTile', {tileIndex, newTileValue});
}

export type actionTypes = ReturnType<typeof updateChessboard | typeof updateChessboardOneTile>;