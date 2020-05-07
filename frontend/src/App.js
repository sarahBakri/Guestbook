import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import Messages from './components/messages/messages';
// import createHistory from 'history/createBrowserHistory'
function App() {
  // history = createHistory()
  return (
    <BrowserRouter >
      <div className="App">
      
        
        <Route exact path='/' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/messages' component={Messages}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
