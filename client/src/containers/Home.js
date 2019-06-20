import React, {Component} from 'react';
import User from '../User.js';
import Login from '../Login.js';
//import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl} from "react-bootstrap";
// import "./Login.css";
// import logo from './logo.svg';
import './Home.css';
// import User from './User.js';


class Home extends Component {

  render() {
    if (this.props.isAuthenticated){
      console.log(this.props);
      return (
        <div className="Home">
          <div className="lander">
            <h1>test - Home Container</h1>
            <p>----</p>
          </div>
          <User myUserId={this.props.myUserId}/>
        </div>
      );
    } else {
      console.log("LOOK HERE")
      console.log(this.props);
      return <Login history={this.props.history} userHasAuthenticated = {this.props.userHasAuthenticated} />
    }
  }
}


export default Home;