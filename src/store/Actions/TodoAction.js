import { SET_LOADING, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SET_GROUP, SET_TAB } from '../ActionTypes.js';

export const setLoading = () => ({ type: SET_LOADING });

export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload
});

export const removeTodo = (payload) => ({
    type: REMOVE_TODO,
    payload
});

export const updateTodo = (payload) => ({
    type: UPDATE_TODO,
    payload
});

export const setGroup = (payload) => ({
    type: SET_GROUP,
    payload
});

export const setTab = (payload) => ({
    type: SET_TAB,
    payload
});