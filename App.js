import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.js';
import WorldClock from './components/WorldClock.js';
import Alarm from './components/Alarm.js';
import Stopwatch from './components/Stopwatch.js';
import Timer from './components/Timer.js';


const {
  BrowserRouter,
  Route,
  Switch,
  Link
} = window.ReactRouterDOM;

function Main (){
  

  return (
<BrowserRouter>
  
  <Switch>
    <Route exact path='/world-clock'>
      <WorldClock/>
    </Route>
    <Route exact path='/'>
      <Alarm/>
    </Route>
    <Route exact path='/stopwatch'>
      <Stopwatch/>
    </Route>
    <Route exact path='*'>
      <Timer/>
    </Route>    
  </Switch>
  <Navbar/>
</BrowserRouter>
    
);
}
  
ReactDOM.render(
  <Main />,
  document.getElementById('react-app')
);
