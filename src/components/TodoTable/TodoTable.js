import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Transition, TransitionGroup } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

import { setSortBy } from '../../store/Actions/TodoAction';
import TableItem from './TableItem/TableItem';
import './TodoTable.scss';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const TodoTable = ({ openModal }) => {
  const { tab, group, todoList, order, sortBy } = useSelector(
    (state) => state.todo
  );

  const dispatch = useDispatch();

  const sortHandler = useCallback((heading) => dispatch(setSortBy(heading)), [
    dispatch,
  ]);

  const [tabTodo, setTabTodo] = useState([]);
  const [sortedTodo, setSortedTodo] = useState([]);
  const [groupedTodo, setGroupedTodo] = useState([]);

  const sortHeaderHandler = (heading) => {
    sortHandler(heading);
  };

  useEffect(() => {
    if (tab === 0) {
      setTabTodo([...todoList]);
    } else if (tab === 1) {
      setTabTodo(todoList.filter((todo) => !todo.completed));
    } else if (tab === 2) {
      setTabTodo(todoList.filter((todo) => todo.completed));
    }
  }, [tab, todoList]);

  useEffect(() => {
    const priority = (level) => {
      let lev;
      if (level === 'HIGH') lev = 3 * order;
      else if (level === 'MEDIUM') lev = 2 * order;
      else if (level === 'LOW') lev = 1 * order;
      else if (level === 'NONE') lev = 0 * order;
      return lev;
    };
    if (sortBy === 'priority') {
      let sortedList = tabTodo.sort((a, b) => {
        let textA = a.priority.toUpperCase();
        let textB = b.priority.toUpperCase();

        let levelA = priority(textA);
        let levelB = priority(textB);

        return levelA < levelB ? -1 : levelA > levelB ? 1 : 0;
      });
      setSortedTodo([...sortedList]);
    } else if (sortBy === 'created') {
      setSortedTodo([...tabTodo]);
    } else {
      let sortedList = tabTodo.sort((a, b) => {
        let textA = a.priority.toUpperCase();
        let textB = b.priority.toUpperCase();
        return textA - textB;
      });
      let decList = sortedList.reverse();
      setSortedTodo([...decList]);
    }
  }, [tabTodo, sortBy, order]);

  useEffect(() => {
    let groupObj = sortedTodo.reduce((r, todo) => {
      r[todo[group]] = [...(r[todo[group]] || []), todo];
      return r;
    }, {});
    setGroupedTodo({ ...groupObj });
  }, [sortedTodo, group]);

  let groupKeys = Object.keys(groupedTodo);
  let groupValues = Object.values(groupedTodo);

  return (
    <>
      <div className='table tableHeader'>
        <div className='summary'>
          Summary
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() => sortHeaderHandler('summary')}
          >
            <SortRoundedIcon />
          </Button>
        </div>
        <div className='priority'>
          Priority
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() => sortHeaderHandler('priority')}
          >
            <SortRoundedIcon />
          </Button>
        </div>
        <div className='created'>
          Created On
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() => sortHeaderHandler('created')}
          >
            <SortRoundedIcon />
          </Button>
        </div>
        <div className='due'>
          Due By
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={() => sortHeaderHandler('due')}
          >
            <SortRoundedIcon />
          </Button>
        </div>
        <div className='actions'> Actions </div>
      </div>
      <TransitionGroup>
        <Transition timeout={duration} in={true}>
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              {group === 'none' &&
                sortedTodo.map((todo) => (
                  <TableItem
                    todo={todo}
                    key={todo.id}
                    group={group}
                    openModal={openModal}
                  />
                ))}
              {group !== 'none' &&
                groupKeys.map((key, i) => (
                  <div key={key}>
                    <h4
                      style={{
                        textTransform: 'uppercase',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '1rem',
                        margin: '0.5rem 0 0 0',
                        fontWeight: 'bold',
                      }}
                    >
                      {key}
                    </h4>
                    {groupValues[i].map((todo) => (
                      <TableItem
                        todo={todo}
                        key={todo.id}
                        group={group}
                        openModal={openModal}
                      />
                    ))}
                  </div>
                ))}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </>
  );
};

export default TodoTable;
