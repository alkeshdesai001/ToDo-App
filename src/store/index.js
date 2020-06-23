import { createStore, combineReducers, compose } from 'redux';
import TodoReducer from './Reducers/TodoReducer';

const rootReducer = combineReducers({
    todo: TodoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers()
);

export default store;