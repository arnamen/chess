import cloneDeep from 'clone-deep'
import { Reducer } from 'redux'

import { actionTypes, StateInterface } from './types';

const initialState: StateInterface = {
    movesLog: [],
}

const updateMoveInLog = (state: StateInterface, action: actionTypes) => {
    let moves = cloneDeep(state.movesLog);
    if (action.type === 'movesLog/update') {
        if (action.payload.moveIndex < moves.length) {
            moves[action.payload.moveIndex] = action.payload.updatedMove;
        }
    }
    return { ...state, movesLog: moves }
}

const reducer: Reducer<StateInterface, actionTypes> = (state = initialState, action: actionTypes) => {

    switch (action.type) {

        case 'movesLog/add':
            return { ...state, movesLog: [...state.movesLog, action.payload.move] }
        case 'movesLog/remove':
            const movesLog = state.movesLog.slice();
            if (action.payload.moveIndex) movesLog.splice(action.payload.moveIndex, 1);
            return { ...state, movesLog }
        case 'movesLog/update':
            return updateMoveInLog(state, action);
        default:
            return state
    }
}

export default reducer;