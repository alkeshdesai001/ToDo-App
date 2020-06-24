import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

import Modal from '../UIElements/Modal';
import './Modal.scss';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant='filled' {...props} />;
// }

const ModalComp = ({
  open,
  setOpen,
  data,
  mode,
  updateTodoHandler,
  addTodoHandler,
  removeTodoHandler,
}) => {
  const [todoState, setTodoState] = useState({
    id: uuid(),
    summary: '',
    description: '',
    priority: 'none',
    createdAt: moment(Date.now()).format('YYYY-MM-DD-HH:MM-SS'),
    dueDate: moment(Date.now()).format('YYYY-MM-DD'),
    completed: false,
  });

  useEffect(() => {
    if (mode !== 'new') {
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
    if (
      todoState.summary.trim().length < 10 ||
      todoState.summary.trim().length > 140
    ) {
    } else if (mode === 'new') {
      addTodoHandler(todoState);
    } else if (mode === 'edit') {
      updateTodoHandler(todoState);
    } else if (mode === 'delete') {
      removeTodoHandler(todoState);
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
      {mode === 'delete' && (
        <h4 style={{ margin: '0 2rem 0 0' }}>
          Do you want to delete this task?
        </h4>
      )}
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={() => setOpen(false)}
        style={{ background: 'gray', color: '#fff' }}
      >
        Close
      </Button>
      {mode === 'edit' && (
        <Button
          variant='contained'
          size='small'
          color='primary'
          onClick={saveTodoHandler}
          style={{ margin: '0 1rem', background: 'green', color: '#fff' }}
        >
          Save
        </Button>
      )}
      {mode === 'delete' && (
        <Button
          variant='contained'
          size='small'
          color='primary'
          onClick={saveTodoHandler}
          style={{ margin: '0 1rem', background: 'red', color: '#fff' }}
        >
          Delete
        </Button>
      )}
    </>
  );

  // const [openNotification, setOpenNotification] = useState(false);

  // const handleClick = () => {
  //   setOpenNotification(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenNotification(false);
  // };

  return (
    <Modal
      header='Edit Task'
      open={open}
      setOpen={setOpen}
      footer={footer}
      footerClass='alignLeft'
      className='modalContent'
    >
      {/* <Snackbar
        open={openNotification}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success'>
          This is a success message!
        </Alert>
      </Snackbar> */}
      <div className='summaryInput'>
        <h4>Summary</h4>
        <input
          style={{ width: '100%' }}
          placeholder='Summary'
          name='summary'
          value={todoState.summary}
          onChange={inputChangeHandler}
          disabled={mode !== 'edit'}
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
          disabled={mode !== 'edit'}
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
              disabled={mode !== 'edit'}
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
              disabled={mode !== 'edit'}
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
};

export default ModalComp;
