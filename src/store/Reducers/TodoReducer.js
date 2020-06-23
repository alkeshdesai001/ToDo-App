import {
  SET_LOADING,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SET_GROUP,
  SET_TAB,
} from '../ActionTypes';
import TodoData from '../_data';

const initialState = {
  loading: false,

  todoList: [...TodoData],
  group: 'none',
  groupData: {},
  tab: 0,
  tabData: [...TodoData],
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
      let data = [];
      if (action.payload === 0) {
        data = [...state.todoList];
      } else if (action.payload === 1) {
        data = state.todoList.filter((todo) => !todo.completed);
      } else if (action.payload === 2) {
        data = state.todoList.filter((todo) => todo.completed);
      }

      return {
        ...state,
        tab: action.payload,
        tabData: data,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
