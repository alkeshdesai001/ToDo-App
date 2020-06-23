import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import Modal from '../Modal/Modal';
import { setGroup } from '../../store/Actions/TodoAction';
import './Header.scss';

const Header = ({ groupBy }) => {
  const { group } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const setGroupType = useCallback((group) => dispatch(setGroup(group)), [
    dispatch,
  ]);

  const [open, setOpen] = useState(false);

  return (
    <div className='header'>
      <FormControl variant='outlined'>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={group}
          onChange={(e) => setGroupType(e.target.value)}
          style={{ minWidth: '10rem' }}
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
      />
      {open && <Modal open={open} setOpen={setOpen} data={null} />}
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
