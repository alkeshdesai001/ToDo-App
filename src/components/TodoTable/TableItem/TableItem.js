import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import moment from 'moment';

import Modal from '../../../components/Modal/Modal';
import { removeTodo, updateTodo } from '../../../store/Actions/TodoAction';
import './TableItem.scss';

const TodoTable = ({ todo }) => {
  const [todoState, setTodoState] = useState({});

  useEffect(() => {
    setTodoState({ ...todo });
  }, [todo]);

  const dispatch = useDispatch();

  const completeTodoHandler = () => {
    let stateObj = { ...todoState, completed: !todoState.completed };
    updateTodoHandler(stateObj);
  };

  const updateTodoHandler = useCallback(
    (stateObj) => dispatch(updateTodo(stateObj)),
    [dispatch]
  );

  const removeTodoHandler = useCallback(
    () => dispatch(removeTodo(todoState.id)),
    [dispatch, todoState.id]
  );

  let style = todoState.completed
    ? { textDecoration: 'line-through' }
    : { textDecoration: 'none' };

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('readOnly');

  const priorityList = (value) => {
    switch (value) {
      case 'none':
        return 'None';
      case 'low':
        return 'Low';
      case 'medium':
        return 'Medium';
      case 'high':
        return 'High';
      default:
        return 'None';
    }
  };

  const readOnlyHandler = () => {
    setMode('readOnly');
    setOpen(true);
  };

  const editHandler = () => {
    setMode('edit');
    setOpen(true);
  };

  const deleteHandler = () => {
    setMode('delete');
    setOpen(true);
  };

  return (
    <div className='table tableData'>
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          data={todo}
          mode={mode}
          updateTodoHandler={updateTodoHandler}
          removeTodoHandler={removeTodoHandler}
        />
      )}
      <div className='summary' style={style} onClick={readOnlyHandler}>
        {todoState.summary}
      </div>
      <div className='priority' style={style} onClick={readOnlyHandler}>
        {priorityList(todoState.priority)}
      </div>
      <div className='created' style={style} onClick={readOnlyHandler}>
        {moment(todoState.created).format('YYYY-MM-DD')}
      </div>
      <div className='due' style={style} onClick={readOnlyHandler}>
        {moment(todoState.dueDate).format('YYYY-MM-DD')}
      </div>
      <div className='actions'>
        <Button
          variant='contained'
          size='small'
          color='primary'
          onClick={editHandler}
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
          onClick={deleteHandler}
        >
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default TodoTable;
