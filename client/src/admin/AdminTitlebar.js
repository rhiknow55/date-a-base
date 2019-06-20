import React, {Component} from 'react';


class AdminTitlebar extends Component {
  render() {
    return (
    <div>
        <h1>»-(¯`·.·´¯)->Date-a-base Admin Interface-(¯`·.·´¯)-«</h1>
        <h4>Thank you for keeping Date-a-base a safe place to date a base, {this.props.username}.</h4>
        <hr></hr>
        <br></br>
        </div>
        );
  }
}


export default AdminTitlebar;