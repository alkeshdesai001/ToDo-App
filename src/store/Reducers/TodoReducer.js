import {
  SET_LOADING,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SET_GROUP,
  SET_TAB,
  SET_SORT_BY,
  SEARCH_TODO,
} from '../ActionTypes';
import TodoData from '../_data';

let initialState = {
  loading: false,
  todoList: [...TodoData],
  group: 'none',
  tab: 0,
  order: 1,
  sortBy: 'createdAt',
  filter: '',
  filteredTodo: [],
};

if (localStorage.getItem('todo')) {
  initialState = {
    ...initialState,
    todoList: JSON.parse(localStorage.getItem('todo')).todoList,
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_TODO: {
      localStorage.setItem(
        'todo',
        JSON.stringify({
          todoList: [...state.todoList, action.payload],
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
          todoList: updatedTodoList,
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
          todoList: newList,
        })
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
        sortBy: action.payload,
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
    case SEARCH_TODO: {
      let filteredTodo = [];
      if (action.payload.trim() !== '') {
        filteredTodo = state.todoList.filter((todo) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return todo.summary.match(regex) || todo.description.match(regex);
        });
      }
      return {
        ...state,
        filter: action.payload,
        filteredTodo,
      };
    }
    default: {
      return state;
    }
  }
};
