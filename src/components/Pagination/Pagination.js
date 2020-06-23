import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './Pagination.scss';

const PaginationComp = (props) => {
  const {count, rowPerPage, page, setRowPerPage, setPage} = props;

  return (
    <div className='pagination'>
      <div>
        Rows per page:
        <Select
          labelId='demo-controlled-open-select-label'
          id='demo-controlled-open-select'
          value={rowPerPage}
          style={{minWidth: 50, textAlign: 'center'}}
          onChange={(e) => setRowPerPage(e.target.value)}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </div>
      <Pagination
        variant='outlined'
        shape='rounded'
        count={count}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </div>
  );
};
export default PaginationComp;
