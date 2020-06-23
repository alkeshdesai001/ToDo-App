import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import { removeTodo, updateTodo } from "../../../store/Actions/TodoAction";

const TodoTable = ({ todo }) => {
  const [todoState, setTodoState] = useState({ ...todo });

  const dispatch = useDispatch(todoState);

  const updateTodoHandler = useCallback(
    (stateObj) => dispatch(updateTodo(stateObj)),
    [dispatch]
  );
  const removeTodoHandler = useCallback(
    () => dispatch(removeTodo(todoState.id)),
    [dispatch, todoState.id]
  );

  const completeTodoHandler = () => {
    let stateObj = { ...todoState, completed: !todoState.completed };
    setTodoState(stateObj);
    updateTodoHandler(stateObj);
  };

  let style = todoState.completed
    ? { textDecoration: "line-through" }
    : { textDecoration: "none" };

  return (
    <div className="table tableData">
      <div className="summary" style={style}>
        {todoState.summary}
      </div>
      <div className="priority" style={style}>
        {todoState.priority}
      </div>
      <div className="created" style={style}>
        {todoState.createdAt}
      </div>
      <div className="due" style={style}>
        {todoState.dueDate}
      </div>
      <div className="actions">
        <button>Edit</button>
        {todoState.completed ? (
          <button onClick={completeTodoHandler}>Re-Open</button>
        ) : (
          <button onClick={completeTodoHandler}>Done</button>
        )}
        <button onClick={removeTodoHandler}>Delete</button>
      </div>
    </div>
  );
};

export default TodoTable;
