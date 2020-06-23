import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { setGroup } from "../../store/Actions/TodoAction";

const Header = ({ groupBy }) => {
  const { group } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const setGroupType = useCallback((group) => dispatch(setGroup(group)), [
    dispatch,
  ]);

  return (
    <>
      <FormControl variant="outlined">
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={group}
          onChange={(e) => setGroupType(e.target.value)}
        >
          {groupBy.map((group) => (
            <MenuItem value={group.value} key={group.value}>
              {group.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField id="outlined-basic" label="Search" variant="outlined" />
    </>
  );
};
export default Header;
