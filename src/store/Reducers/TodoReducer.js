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

const initialState = {
  loading: false,
  todoList: [...TodoData],
  group: 'none',
  groupData: {},
  tab: 0,
  order: 1,
  sortBy: 'created',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_TODO: {
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
      return {
        ...state,
        todoList: newList,
        loading: false,
      };
    }
    case SET_GROUP: {
      return {
        ...state,
        group: action.payload,
        groupData: state.todoList.reduce((r, todo) => {
          r[todo[action.payload]] = [...(r[todo[action.payload]] || []), todo];
          return r;
        }, {}),
        loading: false,
      };
    }
    case SET_TAB: {
      return {
        ...state,
        tab: action.payload,
        loading: false,
      };
    }
    case SET_SORT_BY: {
      if (action.payload === state.sortBy) {
        return {
          ...state,
          order: -1 * state.order,
          loading: false,
        };
      } else {
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
