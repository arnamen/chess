import { combineReducers } from 'redux';
import actionReducer from './reducers/actionReducer';

export const rootReducer = combineReducers({
    synteticAction: actionReducer,
});
export type RootState = ReturnType<typeof rootReducer>;