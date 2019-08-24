import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Posts } from './posts';
import { Comments } from './comments';
import { Users } from './users';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(combineReducers({
        posts: Posts,
        comments: Comments,
        users: Users
    }),applyMiddleware(thunk, logger));
    
    return store;
}