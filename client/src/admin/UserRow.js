import React, {Component} from 'react';


class UserRow extends Component {

    render() {
        return <div>
            <p>{this.props.heart()} ID: {this.props.data.userId} &nbsp;&nbsp;  | &nbsp;&nbsp;  Username: {this.props.data.username} &nbsp;&nbsp;  | &nbsp;&nbsp;  Log: {this.props.data.log} </p>
        </div>
    }
}
export default UserRow;