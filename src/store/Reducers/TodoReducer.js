import {
  SET_LOADING,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SET_GROUP,
  SET_TAB,
  SET_SORT_BY,
} from '../ActionTypes';
import TodoData from '../_data';

let initialState = {
  loading: false,
  todoList: [...TodoData],
  group: 'none',
  tab: 0,
  order: 1,
  sortBy: 'created',
};

if (localStorage.getItem('todo')) {
  initialState = JSON.parse(localStorage.getItem('todo'));
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      localStorage.setItem(
        'todo',
        JSON.stringify({
          ...state,
          loading: true,
        })
      );
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_TODO: {
      localStorage.setItem(
        'todo',
        JSON.stringify({
          ...state,
          todoList: [...state.todoList, action.payload],
          loading: false,
        })
      );
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
        loading: false,
      };
    }
    case REMOVE_TODO: {
      let updatedTodoList = [...state.todoList];
      updatedTodoList = updatedTodoList.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem(
        'todo',
        JSON.stringify({
          ...state,
          todoList: updatedTodoList,
          loading: false,
        })
      );
      return {
        ...state,
        todoList: updatedTodoList,
        loading: false,
      };
    }
    case UPDATE_TODO: {
      let updatedTodoList = [...state.todoList];
      let newList = updatedTodoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      localStorage.setItem(
        'todo',
        JSON.stringify({
          ...state,
          todoList: newList,
          loading: false,
        })
      );
      return {
        ...state,
        todoList: newList,
        loading: false,
      };
    }
    case SET_GROUP: {
      localStorage.setItem(
        'todo',
        JSON.stringify({
          ...state,
          group: action.payload,
          loading: false,
        })
      );
      return {
        ...state,
        group: action.payload,
        loading: false,
      };
    }
    case SET_TAB: {
      localStorage.setItem(
        'todo',
        JSON.stringify({
          ...state,
          tab: action.payload,
          loading: false,
        })
      );
      return {
        ...state,
        tab: action.payload,
        loading: false,
      };
    }
    case SET_SORT_BY: {
      if (action.payload === state.sortBy) {
        localStorage.setItem(
          'todo',
          JSON.stringify({
            ...state,
            order: -1 * state.order,
            loading: false,
          })
        );
        return {
          ...state,
          order: -1 * state.order,
          loading: false,
        };
      } else {
        localStorage.setItem(
          'todo',
          JSON.stringify({
            ...state,
            order: 1,
            sortBy: action.payload,
            loading: false,
          })
        );
        return {
          ...state,
          order: 1,
          sortBy: action.payload,
          loading: false,
        };
      }
    }
    default: {
      return state;
    }
  }
};
