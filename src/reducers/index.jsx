import { combineReducers } from 'redux';
import todolist from './todos';
import playerState from './playerReducer';
import recommendMusicState from './recommendMusicReducer';

const reducer = combineReducers({
    todolist,
    playerState,
    recommendMusicState
});

export default reducer;