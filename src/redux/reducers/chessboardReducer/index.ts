import {Reducer} from 'redux'

import { actionTypes, StateInterface, chessPieceType, WHITE, BLACK } from './types';

const initialState: StateInterface = {
    chessboard: [],
}

const chessboardCreate = (state: StateInterface, action: actionTypes) => {

    //create new chessboard filled with pieces (see ./types.ts for pieces info)
    //chessboard representing an array 8*8 (x*y) x - letter indexes (a,b,c...) y - number indexes (1,2,3...)
    //chessboard being filled from top to bottom
    const newChessboard:chessPieceType[][] = [];
    //black side
    newChessboard[0] = [BLACK.ROOK,BLACK.KNIGHT,BLACK.BISHOP,BLACK.QUEEN,BLACK.KING,BLACK.BISHOP,BLACK.KNIGHT,BLACK.ROOK];
    newChessboard[1] = [BLACK.PAWN,BLACK.PAWN,BLACK.PAWN,BLACK.PAWN,BLACK.PAWN,BLACK.PAWN,BLACK.PAWN,BLACK.PAWN];
    //white side
    newChessboard[6] = [WHITE.PAWN,WHITE.PAWN,WHITE.PAWN,WHITE.PAWN,WHITE.PAWN,WHITE.PAWN,WHITE.PAWN,WHITE.PAWN];
    newChessboard[7] = [WHITE.ROOK,WHITE.KNIGHT,WHITE.BISHOP,WHITE.QUEEN,WHITE.KING,WHITE.BISHOP,WHITE.KNIGHT,WHITE.ROOK];
    console.log(newChessboard)
    return {
        ...state, chessboard: newChessboard
    }
}

const reducer: Reducer<StateInterface, actionTypes> = (state = initialState, action: actionTypes) => {
    
    switch (action.type) {

    case 'chessboard/update':
        return { ...state, chessboard: action.payload.chessboard}
    case 'chessboard/updateOneTile':
        return { ...state }
        case 'chessboard/create':
            return chessboardCreate(state, action);
    default:
        return state
    }
}

export default reducer;