// import React, { Component } from 'react';
import React, { Component, Fragment } from "react";
import User from './User.js';
import Login from './Login.js';
// import Home from './containers/Home.js'
import Routes from './HomeRoute.js';

// import Routes from "../routes/";
import './App.css'
import './Color.css'
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthenticated: false,
        userId: -1,
        username: ''
      };
    }

    userHasAuthenticated = (authenticated, userId, username) => {
      console.log(userId);
      console.log(username);
      console.log("----------")
      this.setState({ isAuthenticated: authenticated, userId : userId, username : username });
      console.log(this.state);
      console.log("---end of state---")
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    handleLogout = event => {
      this.userHasAuthenticated(false);
      this.props.history.push("/login");
    }

    // render() {
    //     const childProps = {
    //       isAuthenticated: this.state.isAuthenticated,
    //       userHasAuthenticated: this.userHasAuthenticated
    //     };
    //     return (
    //         <div className="App">
    //             <header className="App-header">
    //                 <h1 className="App-title">Date-a-base</h1>
    //             </header>
    //
    //             <p className="App-intro">{this.state.data}</p>
    //             <Login />
    //             <User myUserId={1}/>
    //         </div>
    //     );
    // }

    render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      myUserId: this.state.userId,
      username: this.state.username
    };
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" userId={this.state.userId}>Date-a-base</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : <Fragment>
                  <LinkContainer to="/register">
                    <NavItem>Register</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
            }
          </Nav>
        </Navbar.Collapse>
        </Navbar.Collapse>
        </Navbar>
        {/*<Home />*/}
        <Routes childProps={childProps} />
      </div>
    );
  }
}

// export default App;
export default withRouter(App);
