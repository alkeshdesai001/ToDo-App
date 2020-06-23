import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

import Modal from '../UIElements/Modal';
import './Modal.scss';

export default function TransitionsModal({
  open,
  setOpen,
  data,
  mode,
  updateTodoHandler,
  addTodoHandler,
}) {
  const [todoState, setTodoState] = useState({
    id: uuid(),
    summary: '',
    description: '',
    priority: 'none',
    createdAt: moment(Date.now()).format('YYYY-MM-DD'),
    dueDate: moment(Date.now()).format('YYYY-MM-DD'),
    completed: false,
  });

  useEffect(() => {
    if (mode === 'edit') {
      setTodoState(data);
    }
  }, [data, mode]);

  const inputChangeHandler = (e) => {
    setTodoState({
      ...todoState,
      [e.target.name]: e.target.value,
    });
  };

  const timeChangeHandler = (e) => {
    setTodoState({
      ...todoState,
      dueDate: moment(e.target.value).format('YYYY-MM-DD'),
    });
  };

  const saveTodoHandler = () => {
    if (mode === 'new') {
      addTodoHandler(todoState);
    } else if (mode === 'edit') {
      updateTodoHandler(todoState);
    }
    setOpen(false);
  };

  const priorityList = [
    { label: 'None', value: 'none' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  let footer = (
    <>
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={() => setOpen(false)}
        style={{ background: 'gray', color: '#fff' }}
      >
        Cancel
      </Button>
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={saveTodoHandler}
        style={{ margin: '0 1rem', background: 'green', color: '#fff' }}
      >
        Save
      </Button>
    </>
  );

  return (
    <Modal
      header='Edit Task'
      open={open}
      setOpen={setOpen}
      footer={footer}
      footerClass='alignLeft'
      className='modalContent'
    >
      <div className='summaryInput'>
        <h4>Summary</h4>
        <input
          style={{ width: '100%' }}
          placeholder='Summary'
          name='summary'
          value={todoState.summary}
          onChange={inputChangeHandler}
        />
      </div>
      <div className='description'>
        <h4>Description</h4>
        <TextareaAutosize
          placeholder='Description'
          aria-label='minimum height'
          rowsMin={10}
          style={{ width: '100%' }}
          name='description'
          value={todoState.description}
          onChange={inputChangeHandler}
        />
      </div>
      <div className='dateSelect'>
        <div>
          <h4>Due Date</h4>
          <form noValidate>
            <TextField
              id='date'
              type='date'
              InputLabelProps={{
                shrink: true,
              }}
              name='dueDate'
              value={moment(todoState.dueDate).format('YYYY-MM-DD')}
              onChange={timeChangeHandler}
            />
          </form>
        </div>
        <div>
          <h4>Priority</h4>
          <FormControl variant='outlined'>
            <Select
              id='demo-simple-select-outlined'
              style={{ minWidth: '10rem' }}
              name='priority'
              value={todoState.priority}
              onChange={inputChangeHandler}
            >
              {priorityList.map((priority) => (
                <MenuItem value={priority.value} key={priority.value}>
                  {priority.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </Modal>
  );
}
