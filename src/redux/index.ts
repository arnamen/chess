import { combineReducers } from 'redux';
import chessboardReducer from './reducers/chessboardReducer';
import movesLogReducer from './reducers/movesLogReducer';

export const rootReducer = combineReducers({
    chessboard: chessboardReducer,
    movesLog: movesLogReducer
});
export type RootState = ReturnType<typeof rootReducer>;