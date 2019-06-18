import React, {Component} from 'react';
import User from '../User.js';
//import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl} from "react-bootstrap";
// import "./Login.css";
// import logo from './logo.svg';
import './Home.css';
// import User from './User.js';


class Home extends Component {

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>test - Home Container</h1>
          <p>----</p>
        </div>
        <User myUserId={1}/>
      </div>
    );
  }
}


export default Home;