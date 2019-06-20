import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import "./Register.css";
import User from "./User";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: false,
      loginName: "",
      password: "",
      confirmPassword: "",
      username: "",
      birthday: "",
      horoscope: "",
      // userId: 0,
      // baseId: 0,
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.loginName.length > 0 &&
      this.state.password.length > 0 &&
      this.state.username.length > 0 &&
      this.state.birthday.length > 0 &&
      this.state.horoscope.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.userId.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try{
      this.userRegister();
    } catch (e) {
     alert(e.message);
   }

    this.setState({ isLoading: false });
  }

  // handleConfirmationSubmit = async event => {
  // event.preventDefault();
  //
  // this.setState({ isLoading: true });
  //
  //   try {
  //     await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
  //     await Auth.signIn(this.state.email, this.state.password);
  //
  //     this.props.userHasAuthenticated(true);
  //     this.props.history.push("/");
  //   } catch (e) {
  //     alert(e.message);
  //     this.setState({ isLoading: false });
  //   }
  // }

  userRegister = async () => {
    var userLoginName = this.state.loginName;
    var userPassword = this.state.password;

    const response = await fetch('/register', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // userId: 0,
        loginName: this.state.loginName,
        password: this.state.password,
        username: this.state.username,
        horoscope: this.state.horoscope,
        birthday: this.state.birthday
      })
    });

    if (response.status !== 200) {

      alert("registration failed");
    } else {
      console.log("user registered sucessfully");
      const response_json = await response.json();

      this.props.history.push("/login");

    }

    //return response_json;
  };

  renderQuestions() {
    return (
      <div className="Questions">
        <div className="lander">
          <h1>Display sorting hat questions here!</h1>
          <p>----</p>
        </div>
        {/*<User myUserId={1}/>*/}
      </div>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="loginName" bsSize="large">
          <label>Login Name</label>
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
        <FormGroup controlId="confirmPassword" bsSize="large">
          <label>Confirm Password</label>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="username" bsSize="large">
          <label>Username</label>
          <FormControl
            value={this.state.username}
            onChange={this.handleChange}
            type="username"
          />
        </FormGroup>
        <FormGroup controlId="birthday" bsSize="large">
          <label>Birthday(YYYY-MM-DD)</label>
          <FormControl
            value={this.state.birthday}
            onChange={this.handleChange}
            type="birthday"
          />
        </FormGroup>
        <FormGroup controlId="horoscope" bsSize="large">
          <label>Horoscope</label>
          <FormControl
            value={this.state.horoscope}
            onChange={this.handleChange}
            type="horoscope"
          />
        </FormGroup>
        <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Register
          </Button>
      </form>
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="userId" bsSize="large">
          <label>UserId</label>
          <FormControl
            autoFocus
            type="userId"
            value={this.state.userId}
            onChange={this.handleChange}
          />
          {/*<HelpBlock>Please answer all the following sorting hat questions.</HelpBlock>*/}
        </FormGroup>
        {/*<Button*/}
        {/*  block*/}
        {/*  bsSize="large"*/}
        {/*  disabled={!this.validateConfirmationForm()}*/}
        {/*  type="submit"*/}
        {/*  isLoading={this.state.isLoading}*/}
        {/*  text="Verify"*/}
        {/*  loadingText="Verifying…"*/}
        {/*/>*/}
        <Button
            block
            bsSize="large"
            disabled={!this.validateConfirmationForm()}
            type="submit"
          >
            Register
          </Button>
      </form>
    );
  }

  render() {
    return (
      <div className="Register">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderQuestions()}
      </div>
    );
  }
}

export default Register;