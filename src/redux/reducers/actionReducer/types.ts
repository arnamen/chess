export const SET_STATUS = 'SET_STATUS';
export const RESET_STATUS = 'RESET_STATUS';

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

export interface StateInterface {
    actionStatus: boolean,
}

export const actionSetStatus = (newStatus: boolean) => {
  return typedAction(SET_STATUS, {actionStatus: newStatus});
}

export const actionResetStatus = () => {
  return typedAction(RESET_STATUS);
}

export type actionTypes = ReturnType<typeof actionSetStatus | typeof actionResetStatus>;