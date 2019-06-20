import React, {Component} from 'react';
import Login from '../Login.js';
import AdminTitlebar from '../admin/AdminTitlebar.js';
import AdminBody from '../admin/AdminBody.js';


class Admin extends Component {
  render() {
    if (this.props.isAuthenticated && this.props.isAdmin){
      return (
        <div className="Admin">
            <AdminTitlebar username={this.props.username}/>
            <a href> </a>
            <AdminBody jwt={this.props.jwt} show="all options"/>
        </div>
      );
    } else {
      return <Login history={this.props.history} userHasAuthenticated = {this.props.userHasAuthenticated} />
    }
  }
}


export default Admin;