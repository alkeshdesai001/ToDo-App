import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import moment from 'moment';

import Modal from '../../../components/Modal/Modal';
import { removeTodo, updateTodo } from '../../../store/Actions/TodoAction';
import './TableItem.scss';

const TodoTable = ({ todo, openModal }) => {
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
    ? { textDecoration: 'line-through' }
    : { textDecoration: 'none' };

  const [open, setOpen] = useState(false);

  return (
    <div className='table tableData'>
      {open && <Modal open={open} setOpen={setOpen} data={todo} />}
      <div className='summary' style={style}>
        {todoState.summary}
      </div>
      <div className='priority' style={style}>
        {todoState.priority}
      </div>
      <div className='created' style={style}>
        {moment(todoState.dueDate).format('YYYY-MM-DD')}
      </div>
      <div className='due' style={style}>
        {moment(todoState.dueDate).format('YYYY-MM-DD')}
      </div>
      <div className='actions'>
        <Button
          variant='contained'
          size='small'
          color='primary'
          onClick={() => setOpen(true)}
        >
          <EditIcon />
        </Button>
        {todoState.completed ? (
          <Button
            variant='outlined'
            size='small'
            color='primary'
            style={{ background: 'teal', color: '#fff', margin: '0 0.5rem' }}
            onClick={completeTodoHandler}
          >
            Re-Open
          </Button>
        ) : (
          <Button
            variant='outlined'
            size='small'
            color='primary'
            style={{ background: 'green', color: '#fff', margin: '0 0.5rem' }}
            onClick={completeTodoHandler}
          >
            Done
          </Button>
        )}
        <Button
          variant='outlined'
          size='small'
          color='primary'
          style={{ background: 'red', color: '#fff', margin: '0 0.5rem' }}
          onClick={removeTodoHandler}
        >
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default TodoTable;
