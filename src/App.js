import React, { useState, useEffect } from 'react'
import {connectionSocket, disconnectSocket} from './Socket'
import './App.css';
import User from './api/User'
import { Switch, Route ,BrowserRouter } from 'react-router-dom';
import main from './components/page/main'
import welcome from './components/page/welcome'

function App() {
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={welcome}/>
      <Route path="/main" component={main}/>
    </Switch> 
  </BrowserRouter>
  );
}

export default App;
