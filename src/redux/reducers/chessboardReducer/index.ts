import { Reducer } from 'redux'
import cloneDeep from 'clone-deep';

import { actionTypes, StateInterface, ChessPieceType, WHITE, BLACK } from './types';

import createPiece from '../../../utils/pieces-create';

const initialState: StateInterface = {
    chessboard: null,
}

const chessboardCreate = (state: StateInterface, action: actionTypes) => {

    //create new chessboard filled with pieces (see ./types.ts for pieces info)
    //chessboard represents an array 8*8 (x*y) x - letter indexes (a,b,c...) y - number indexes (1,2,3...)
    //chessboard being filled from top to bottom
    const newChessboard: ChessPieceType[][] = [];
    //createPiece makes copie of specific piece prototype object and returns it
    //black side
    newChessboard[0] = [
        createPiece(BLACK.ROOK), 
        createPiece(BLACK.KNIGHT), 
        createPiece(BLACK.BISHOP), 
        createPiece(BLACK.QUEEN), 
        createPiece(BLACK.KING), 
        createPiece(BLACK.BISHOP), 
        createPiece(BLACK.KNIGHT), 
        createPiece(BLACK.ROOK)
    ];

    newChessboard[1] = [
        createPiece(BLACK.PAWN), 
        createPiece(BLACK.PAWN), 
        createPiece(BLACK.PAWN), 
        createPiece(BLACK.PAWN), 
        createPiece(BLACK.PAWN), 
        createPiece(BLACK.PAWN), 
        createPiece(BLACK.PAWN), 
        createPiece(BLACK.PAWN)
    ];

    //free tiles
    for (let y = 2; y < 6; y++) {
        newChessboard[y] = [        
        createPiece(BLACK.EMPTY), 
        createPiece(BLACK.EMPTY), 
        createPiece(BLACK.EMPTY), 
        createPiece(BLACK.EMPTY), 
        createPiece(BLACK.EMPTY), 
        createPiece(BLACK.EMPTY), 
        createPiece(BLACK.EMPTY), 
        createPiece(BLACK.EMPTY)];
    }
    //white side
    newChessboard[6] = [        
        createPiece(WHITE.PAWN), 
        createPiece(WHITE.PAWN), 
        createPiece(WHITE.PAWN), 
        createPiece(WHITE.PAWN), 
        createPiece(WHITE.PAWN), 
        createPiece(WHITE.PAWN), 
        createPiece(WHITE.PAWN), 
        createPiece(WHITE.PAWN)
    ];
    newChessboard[7] = [        
        createPiece(WHITE.ROOK), 
        createPiece(WHITE.KNIGHT), 
        createPiece(WHITE.BISHOP), 
        createPiece(WHITE.QUEEN), 
        createPiece(WHITE.KING), 
        createPiece(WHITE.BISHOP), 
        createPiece(WHITE.KNIGHT), 
        createPiece(WHITE.ROOK)];

    return {
        ...state, chessboard: newChessboard
    }
}

const chessboardMakeMove = (state: StateInterface, action: actionTypes) => {
    if(action.type === 'chessboard/makeMove' && state.chessboard) {
        const tileFrom = action.payload.tileFrom;
        const tileTo = action.payload.tileTo;
        if(state.chessboard[tileFrom.y][tileFrom.x].side === state.chessboard[tileTo.y][tileTo.x].side &&
             (state.chessboard[tileFrom.y][tileFrom.x].type === 'KING' || state.chessboard[tileFrom.y][tileFrom.x].type === 'ROOK') &&
             (state.chessboard[tileTo.y][tileTo.x].type === 'KING' || state.chessboard[tileTo.y][tileTo.x].type === 'ROOK') &&
             state.chessboard[tileFrom.y][tileFrom.x].type !== state.chessboard[tileTo.y][tileTo.x].type){
                return chessboardMakeCastling(state, action);
        }

        let chessboard = state.chessboard.slice();

        if(chessboard) {
            chessboard[tileTo.y][tileTo.x] = chessboard[tileFrom.y][tileFrom.x];
            if(chessboard[tileTo.y][tileTo.x].isFirstMove) chessboard[tileTo.y][tileTo.x].isFirstMove = false;

            chessboard[tileFrom.y][tileFrom.x] = chessboard[tileFrom.y][tileFrom.x].side === 'WHITE' ? WHITE.EMPTY : BLACK.EMPTY;

            return {...state, chessboard};
        }

    }

    return {...state}
}

const chessboardMakeCastling = (state: StateInterface, action: actionTypes) => {

    if(action.type === 'chessboard/makeMove' && state.chessboard){

    const tileFrom = action.payload.tileFrom;
    const tileTo = action.payload.tileTo;
    const king = state.chessboard[tileFrom.y][tileFrom.x].type === 'KING' ? tileFrom : tileTo;
    const rook = state.chessboard[tileFrom.y][tileFrom.x].type === 'ROOK' ? tileFrom : tileTo;
    //determine whether king to the left or to the right from rook
    const direction = Math.sign(king.x - rook.x); //1 - king on the right side, "-1" - king on the left side
    let chessboard = cloneDeep(state.chessboard);
        //make castling
        chessboard[king.y][king.x + direction*2] = cloneDeep(chessboard[king.y][king.x]);
        chessboard[king.y][king.x + direction*2].isFirstMove = false;
        chessboard[king.y][king.x] = WHITE.EMPTY;
        //
        chessboard[king.y][king.x + direction] = cloneDeep(chessboard[rook.y][rook.x]);
        chessboard[king.y][king.x + direction].isFirstMove = false;
        chessboard[rook.y][rook.x] = WHITE.EMPTY;

        return {...state, chessboard}

    }

    return {...state}
}

const reducer: Reducer<StateInterface, actionTypes> = (state = initialState, action: actionTypes) => {

    switch (action.type) {

        case 'chessboard/update':
            return { ...state, chessboard: action.payload.chessboard }
        case 'chessboard/updateOneTile':
            return { ...state }
        case 'chessboard/makeMove':
            return chessboardMakeMove(state, action);
        case 'chessboard/create':
            return chessboardCreate(state, action);
        default:
            return state
    }
}

export default reducer;