import {Reducer} from 'redux'

import { actionTypes, StateInterface, SET_STATUS, RESET_STATUS } from './types';

const initialState: StateInterface = {
    actionStatus: true,
}



const reducer: Reducer<StateInterface> = (state = initialState, action: actionTypes) => {
    
    switch (action.type) {

    case SET_STATUS:
        return { ...state, actionStatus: action.payload.actionStatus}
    case RESET_STATUS:
        return { ...state, actionStatus: false}

    default:
        return state
    }
}

export default reducer;