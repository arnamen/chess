import {Reducer} from 'redux'

import { actionTypes, StateInterface } from './types';

const initialState: StateInterface = {
    movesLog: [],
}



const reducer: Reducer<StateInterface, actionTypes> = (state = initialState, action: actionTypes) => {
    
    switch (action.type) {

    case 'movesLog/add':
        return { ...state, movesLog: [...state.movesLog, action.payload.move]}
    case 'movesLog/remove':
        const movesLog = state.movesLog.slice();
        if(action.payload.moveIndex) movesLog.splice(action.payload.moveIndex, 1);
        return { ...state, movesLog }

    default:
        return state
    }
}

export default reducer;