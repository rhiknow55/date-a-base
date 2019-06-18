import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
// import logo from './logo.svg';
// import './App.css';
import User from './User.js';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginName: "",
      password: ""
    };

  }

  validateForm() {
    return this.state.loginName.length > 0 && this.state.password.length > 0;
  }


  handleSubmit = event => {
    event.preventDefault();

    try{
      this.userLogin()
    } catch (e) {
     alert(e.message);
   }

  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  userLogin = async () => {
    var userLoginName = this.state.loginName;
    var userPassword = this.state.password;

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginName: userLoginName,
        password: userPassword,
      })
    });

    if (response.status !== 200) {
        //throw Error(body.message)
      if (response.status == 404) {
          alert("LoginName does not exist");
      }  else if (response.status == 400){
         alert("LoginName and password do not match");
      }
    } else {
      alert("Successfully logged in");
    }

    //return body;
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="loginName" bsSize="large">
            <label>LoginName</label>
            <FormControl
              autoFocus
              type="loginName"
              value={this.state.loginName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <label>Password</label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}


export default Login;