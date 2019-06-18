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
      isLoading: false,
      loginName: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.loginName.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ newUser: "test" });

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  }

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
        <Button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
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