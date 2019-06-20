import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

 //more imports here
// ReactDOM.render(
//   <div>
//     <BrowserRouter>
//        <Switch>
//           <Route path='/login' component={Login} />
//           <Route path='/register' component={Register} />
//        </Switch>
//     </BrowserRouter>
//  </div>, document.querySelector('.container'));
