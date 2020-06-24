import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import Modal from '../Modal/Modal';
import { setGroup, addTodo, searchTodo } from '../../store/Actions/TodoAction';
import './Header.scss';

const Header = ({ groupBy }) => {
  const { group, filter } = useSelector((state) => state.todo);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const setGroupType = useCallback((group) => dispatch(setGroup(group)), [
    dispatch,
  ]);

  const setSearch = useCallback((filter) => dispatch(searchTodo(filter)), [
    dispatch,
  ]);

  const addTodoHandler = useCallback(
    (stateObj) => dispatch(addTodo(stateObj)),
    [dispatch]
  );

  return (
    <div className='header'>
      <FormControl variant='outlined'>
        <InputLabel htmlFor='demo-customized-select-native'>
          Group By
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={group}
          onChange={(e) => setGroupType(e.target.value)}
          style={{ minWidth: '10rem' }}
          label='Group By'
        >
          {groupBy.map((group) => (
            <MenuItem value={group.value} key={group.value}>
              {group.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id='outlined-basic'
        label='Search'
        variant='outlined'
        style={{ width: '70%' }}
        value={filter}
        onChange={(e) => setSearch(e.target.value)}
      />
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          data={null}
          mode='new'
          addTodoHandler={addTodoHandler}
        />
      )}
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={() => setOpen(true)}
        style={{ borderRadius: '50%' }}
      >
        <AddIcon />
      </Button>
    </div>
  );
};
export default Header;
