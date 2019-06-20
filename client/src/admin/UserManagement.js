import React, {Component} from 'react';
import UserRow from '../admin/UserRow';


class UserManagement extends Component {
    heartToggle = false;

    heart = () => {
        this.heartToggle = !this.heartToggle;
        if (this.heartToggle){
            return '💙';
        } else {
            return '🖤';
        }
    }

    renderUsers = () =>
    {
        var rows = new Array();
        for (let i = 0; i < this.props.users.length; i++)
        {
            rows.push(<UserRow data = {this.props.users[i]} key={i} heart = {this.heart}/>);
        }

        return rows;
    }

    render() {
        console.log(this.props.users);
        return <div>
            <h4>List of all Date-a-base users</h4>
            {this.renderUsers()}
        </div>
    }
}
export default UserManagement;