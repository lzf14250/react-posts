import * as ActionTypes from './ActionTypes';

export const Posts = (state = {
    isLoading: false,
    posts: [],
    errMess: null
}, action) => {
    switch (action.type) {
        case ActionTypes.POSTS_LOADING:
            return {
                ...state, 
                isLoading: true, 
                posts: [], 
                errMess: null
            };

        case ActionTypes.ADD_POSTS:
            return {
                ...state, 
                isLoading: false, 
                posts: action.payload, 
                errMess: null
            };

        case ActionTypes.POSTS_FAILED:
            return {
                ...state, 
                isLoading: false, 
                posts: [], 
                errMess: action.payload
            };

        case ActionTypes.ADD_POST:
            return {...state, 
                isLoading: false, 
                posts: state.posts.concat(action.payload), 
                errMess: null
            };
        
        case ActionTypes.REMOVE_POST:
            var posts = state.posts;
            var index = posts.indexOf(posts.find(post => post.id === action.payload));
            posts.splice(index, 1);
            console.log('posts after splice index: ' + index + '  ' +JSON.stringify(posts));
            return {
                ...state,
                posts: posts
            };

        default:
            return state;
    }
}