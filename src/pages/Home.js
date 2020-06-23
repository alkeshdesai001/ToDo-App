import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Header from '../components/Header/Header';
import Tabs from '../components/Tabs/Tabs';
import TodoTable from '../components/TodoTable/TodoTable';
import { setTab } from '../store/Actions/TodoAction';
import './Home.scss';

const Home = () => {
  const { tab } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  const setTabType = useCallback((tab) => dispatch(setTab(tab)), [dispatch]);

  const tabs = ['all', 'pending', 'completed'];
  const groupBy = [
    { label: 'None', value: 'none' },
    { label: 'Created On', value: 'created' },
    { label: 'Pending On', value: 'pending' },
    { label: 'Priority', value: 'priority' },
  ];

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <h1 className='tableTitle'>ToDo App</h1>
        <Header groupBy={groupBy} />
        <div className='tabs'>
          <Tabs tabs={tabs} tab={tab} setTab={setTabType} />
        </div>
        <div className='border'>
          <TodoTable />
        </div>
      </Container>
    </>
  );
};

export default Home;
