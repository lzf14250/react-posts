import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addPosts = (posts) => ({
    type: ActionTypes.ADD_POSTS,
    payload: posts
});

export const addPost = (post) => ({
    type: ActionTypes.ADD_POST,
    payload: post
});

export const removePost = (postId) => ({
    type: ActionTypes.REMOVE_POST,
    payload: postId
});

export const postsLoading = () => ({
    type: ActionTypes.POSTS_LOADING
});

export const postsFailed = (error) => ({
    type: ActionTypes.POSTS_FAILED,
    payload: error
});

export const fetchPosts = () => (dispatch) => {
    dispatch(postsLoading());

    fetch(baseUrl + 'posts', {
        method: 'GET',
        headers: {
            'Content-Types': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(posts => dispatch(addPosts(posts)))
    .catch(err => dispatch(postsFailed(err))) 
};

export const uploadPost = (userId, title, body) => (dispatch) => {
    var post = JSON.stringify({
        userId: userId,
        title: title,
        body: body
    });

    fetch(baseUrl + 'posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: post
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(post => {
        dispatch(addPost(post));
        alert('Succesfully Posted!');
    })
    .catch(err => alert('Your post cannot be uploaded, Error: '+ err.message)) 
}

export const deletePost = (postId) => (dispatch) => {
    fetch(baseUrl + 'posts/' + postId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(post => {
        dispatch(removePost(postId));
    })
    .catch(err => alert('Your post cannot be deleted, Error: '+ err.message))
}

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed = (error) => ({
    type: ActionTypes.USERS_FAILED,
    payload: error
});

export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading());

    fetch(baseUrl + 'users', {
        method: 'GET',
        headers: {
            'Content-Types': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(users => dispatch(addUsers(users)))
    .catch(err => dispatch(usersFailed(err))) 
};

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (error) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: error
});

export const fetchComments = () => (dispatch) => {

    fetch(baseUrl + 'comments', {
        method: 'GET',
        headers: {
            'Content-Types': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText);
            err.response = response;
            throw err;
        }
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err))) 
};