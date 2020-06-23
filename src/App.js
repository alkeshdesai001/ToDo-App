import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';

const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Redirect to='/'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
