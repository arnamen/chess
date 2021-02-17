import {Reducer} from 'redux'

import { actionTypes, StateInterface } from './types';

const initialState: StateInterface = {
    chessboard: [],
}



const reducer: Reducer<StateInterface, actionTypes> = (state = initialState, action: actionTypes) => {
    
    switch (action.type) {

    case 'chessboard/update':
        return { ...state, chessboard: action.payload.chessboard}
    case 'chessboard/updateOneTile':

        return { ...state }

    default:
        return state
    }
}

export default reducer;